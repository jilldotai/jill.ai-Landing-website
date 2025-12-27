# Jill.ai | Technical Architecture & Deployment Guide

This document provides the complete roadmap for running Jill.ai as a high-performance web application in your local IDE, on Google Chrome, or hosted on GitHub/Vercel.

## 1. Project Overview
Jill.ai is built using **React 18**, **GSAP 3** (Motion), and **Lenis** (Smooth Scroll). It utilizes a "No-Build" architecture via an `importmap` in the `index.html`, but for professional development, a **Vite** environment is recommended to handle JSX and TypeScript compilation.

---

## 2. Local Development Setup (Recommended)

To run this in your IDE (VS Code, Cursor, etc.) and view it in Google Chrome:

### Step 1: Initialize Project
Create a new folder and initialize it:
```bash
mkdir jill-ai && cd jill-ai
npm init -y
```

### Step 2: Install Dependencies
While the current code uses ESM imports, installing types and the local dev server (Vite) ensures better IDE performance:
```bash
npm install -D vite typescript @types/react @types/react-dom
npm install gsap @studio-freight/lenis react react-dom
```

### Step 3: File Structure
Ensure your root directory matches this:
- `index.html` (The entry point)
- `index.tsx` (The React mounter)
- `App.tsx` (The main application)
- `components/` (All your .tsx components)
- `metadata.json`

### Step 4: Running the App
Run the Vite development server:
```bash
npx vite
```
Open the provided URL (usually `http://localhost:5173`) in **Google Chrome**.

---

## 3. Deployment Guide

### Option A: GitHub Pages (Free)
1. Push your code to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, set Source to **GitHub Actions**.
4. Use the "Static HTML" or "Vite" template provided by GitHub.

### Option B: Vercel / Netlify (Recommended for React)
1. Connect your GitHub repository to Vercel.com.
2. It will automatically detect Vite.
3. Click **Deploy**.

---

## 4. Solving the "No Scroll" Issue
If you install the app and still cannot scroll with the mouse wheel, check these three common "High-Performance" traps:

1. **Event Hijacking**: If an element has `position: fixed` and `pointer-events: auto`, even if it's invisible (opacity: 0), it will "catch" the wheel event. Ensure the `MenuOverlay` is set to `display: none` when closed.
2. **CSS Overflows**: Never set `overflow: hidden` on the `body` or `html` tags manually when using Lenis. Lenis adds its own classes (`.lenis-stopped`) to handle this.
3. **Z-Index Clipping**: If the `GlowingCursor` (z-9999) or `Navbar` (z-50) is covering the screen incorrectly, they can block the scroll. We have applied `pointer-events: none` to the Navbar container to prevent this.

## 5. IDE Performance Tips
- **VS Code Extensions**: Install "ESLint", "Prettier", and "Tailwind CSS IntelliSense".
- **Chrome DevTools**: Use the **Performance** tab to check for frame drops. If you see red bars, reduce the `particleCount` in `GlowingCursor.tsx`.

---

## 6. Support & Scaling
- **Images**: For production, move images from Unsplash URLs to a local `public/assets/` folder.
- **Videos**: Use a CDN (like Cloudinary or Vercel Blob) for the scroll-video sections to ensure low-latency scrubbing.