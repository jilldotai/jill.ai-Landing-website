import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const validInterests = ['Founding Family', 'Partnership', 'Investor', 'Press', 'General'];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const submission = {
      name: typeof body.name === 'string' ? body.name.trim() : '',
      email: typeof body.email === 'string' ? body.email.trim() : '',
      interest: typeof body.interest === 'string' ? body.interest.trim() : '',
      organization: typeof body.organization === 'string' ? body.organization.trim() : '',
      message: typeof body.message === 'string' ? body.message.trim() : '',
      createdAt: new Date().toISOString(),
    };

    if (!submission.name || !submission.email || !submission.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    if (!submission.email.includes('@')) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    if (!validInterests.includes(submission.interest)) {
      submission.interest = 'General';
    }

    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'submissions.ndjson');
    await mkdir(dataDir, { recursive: true });
    await appendFile(filePath, `${JSON.stringify(submission)}\n`, 'utf8');

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to submit right now.' }, { status: 500 });
  }
}
