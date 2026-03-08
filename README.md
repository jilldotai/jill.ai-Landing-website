# Jill.ai Landing Website (Next.js)

This project is a Next.js App Router landing experience for Jill.ai with cinematic, scroll-driven sections.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Troubleshooting: `next` binary unavailable

If you see:

- `sh: 1: next: not found`
- `next binary is unavailable`
- install failures due to registry/proxy policy

use this recovery sequence:

```bash
# 1) Reset proxy env/config (if your environment should use direct npm)
unset npm_config_http_proxy npm_config_https_proxy HTTP_PROXY HTTPS_PROXY http_proxy https_proxy
npm config delete proxy
npm config delete https-proxy
npm config set registry https://registry.npmjs.org/

# 2) Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# 3) Verify Next is installed
npx next --version
npm run build
```

If your organization requires a private registry, set that instead of npmjs:

```bash
npm config set registry https://<internal-registry>/
npm login --registry=https://<internal-registry>/
```

## Notes

- Static assets are served from `/public/assets` and referenced as `/assets/...`.
- Client-side API usage in `SupportAgent` reads `NEXT_PUBLIC_API_KEY` (with fallback).
