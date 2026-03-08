'use client';

import { FormEvent, useState } from 'react';
import { m } from 'motion/react';
import { Reveal } from '@/components/site-motion';

const initialState = {
  name: '',
  email: '',
  interest: 'Founding Family',
  organization: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(result.error ?? 'Submission failed.');
        return;
      }

      setStatus('success');
      setFormData(initialState);
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  }

  return (
    <Reveal delay={0.18}>
      <m.form
        onSubmit={handleSubmit}
        whileHover={{ y: -6 }}
        className="grid gap-5 rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-3">
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-paper/50">Name</span>
            <input
              required
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
              className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-paper outline-none transition focus:border-gold/60"
              placeholder="Your full name"
            />
          </label>

          <label className="grid gap-3">
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-paper/50">Email</span>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
              className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-paper outline-none transition focus:border-gold/60"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-3">
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-paper/50">Interest</span>
            <select
              value={formData.interest}
              onChange={(event) => setFormData((current) => ({ ...current, interest: event.target.value }))}
              className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-paper outline-none transition focus:border-gold/60"
            >
              <option>Founding Family</option>
              <option>Partnership</option>
              <option>Investor</option>
              <option>Press</option>
              <option>General</option>
            </select>
          </label>

          <label className="grid gap-3">
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-paper/50">Organization</span>
            <input
              value={formData.organization}
              onChange={(event) => setFormData((current) => ({ ...current, organization: event.target.value }))}
              className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-paper outline-none transition focus:border-gold/60"
              placeholder="Family, school, company, fund"
            />
          </label>
        </div>

        <label className="grid gap-3">
          <span className="text-[0.68rem] uppercase tracking-[0.3em] text-paper/50">Message</span>
          <textarea
            required
            rows={6}
            value={formData.message}
            onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
            className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-paper outline-none transition focus:border-gold/60"
            placeholder="Tell Jill.ai why you want to join, partner, or learn more."
          />
        </label>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <m.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-full bg-paper px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-ink transition hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading' ? 'Submitting' : 'Register interest'}
          </m.button>

          <div className="text-sm text-paper/65">
            {status === 'success' && <p>Your message was received.</p>}
            {status === 'error' && <p>{errorMessage}</p>}
            {status === 'idle' && <p>Responses are stored directly by the site.</p>}
          </div>
        </div>
      </m.form>
    </Reveal>
  );
}
