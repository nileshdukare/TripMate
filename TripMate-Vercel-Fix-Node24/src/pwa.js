let deferredInstallPrompt = null;
const listeners = new Set();

export function registerPWA() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
        console.warn('TripMate service worker registration failed:', error);
      });
    });
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    listeners.forEach((listener) => listener(true));
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    listeners.forEach((listener) => listener(false));
  });
}

export function subscribeToInstallPrompt(listener) {
  listeners.add(listener);
  listener(Boolean(deferredInstallPrompt));
  return () => listeners.delete(listener);
}

export function canInstallPWA() {
  return Boolean(deferredInstallPrompt);
}

export async function installPWA() {
  if (!deferredInstallPrompt) return false;

  const promptEvent = deferredInstallPrompt;
  deferredInstallPrompt = null;
  listeners.forEach((listener) => listener(false));

  await promptEvent.prompt();
  const choice = await promptEvent.userChoice;
  return choice?.outcome === 'accepted';
}
