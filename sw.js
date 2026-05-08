/* ═══════════════════════════════════════════════════════════
   ELE Talk — Service Worker
   Cache-first strategy: app works fully offline after first load.
   Bump CACHE_NAME version string whenever app files change.
═══════════════════════════════════════════════════════════ */
const CACHE_NAME = 'ele-talk-v5';

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

/* Fetch: cache-first for app shell, cache-on-fetch for /symbols/.
   The symbols folder holds the bundled Mulberry SVGs; they aren't
   pre-cached because the list is large and growing — instead each
   symbol is fetched once over the network and cached for offline
   use thereafter. After the first load with all surfaces touched,
   the entire symbol set is offline-available. */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/symbols/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
