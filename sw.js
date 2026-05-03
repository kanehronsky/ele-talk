/* ═══════════════════════════════════════════════════════════
   ELE Talk — Service Worker
   Cache-first strategy: app works fully offline after first load.
   Bump CACHE_NAME version string whenever app files change.
═══════════════════════════════════════════════════════════ */
const CACHE_NAME = 'ele-talk-v4';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/icon-192.svg',
  '/icon-512.svg',
];

/* Install: pre-cache all app files */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // activate immediately without waiting for old SW
});

/* Activate: delete caches from previous versions */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control of all open tabs straight away
});

/* Fetch: serve from cache; fall back to network if not cached */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
