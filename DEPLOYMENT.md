# TripMate — Free Deployment Guide

## Recommended: Vercel + PWA

TripMate is a React/Vite web application. You can deploy the existing project without rebuilding it as a native Android application.

### 1. Upload to GitHub

Create a new GitHub repository, for example:

`tripmate`

Upload the contents of this folder. Do **not** upload:

- `node_modules/`
- `dist/`
- `.env` files containing secrets

### 2. Deploy on Vercel

In Vercel:

1. Sign in with GitHub.
2. Choose **Add New → Project**.
3. Import the `tripmate` repository.
4. Confirm:
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**.

No API key is required by the deployment configuration itself.

### 3. Test PWA installation

Open the HTTPS Vercel URL on Android Chrome.

The browser should offer an install option when the PWA criteria are met. The application includes:

- `public/manifest.json`
- `public/sw.js`
- `public/icons/icon-192.png`
- `public/icons/icon-512.png`
- service-worker registration in `src/pwa.js`
- an in-app Install App button when the browser exposes `beforeinstallprompt`

### 4. Updating the app

Push changes to GitHub. Vercel automatically creates a new deployment.

The service worker uses versioned caching and `no-cache` response headers for `/sw.js` so the worker can update.

## Notes

The app stores profile, checklist and saved-trip data in browser `localStorage`. That is device/browser-specific and is not a shared cloud account system.

External map/routing services can impose their own usage limits and terms. The project should not be represented as providing live hotel, fuel, weather, toll or booking data unless the relevant production data sources are connected.
