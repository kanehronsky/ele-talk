/* ═══════════════════════════════════════════════════════════
   ELE Talk — Service Worker

   Caching strategy:
   - Top-level navigations + HTML documents: network-first, with a
     cache fallback when offline. Ensures Netlify deploys reach
     users on their next online visit instead of being masked by
     a stale cached index.html.
   - /symbols/* (Mulberry SVGs): cache-first, network-fill on miss.
     Symbols are large + immutable per filename — no benefit to
     re-fetching once we have one cached.
   - Everything else (manifest, icons): cache-first. These rarely
     change and benefit from offline speed.

   Bump CACHE_NAME whenever you change non-HTML cached assets
   (icons, manifest) so old versions get purged. HTML updates
   propagate automatically via network-first.
═══════════════════════════════════════════════════════════ */
const CACHE_NAME = 'ele-talk-v12';

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

/* Fetch: route by request type.
   - /symbols/*       → cache-first, network-fill on miss (large
                        immutable SVG set; built up over time)
   - HTML / navigate  → network-first with cache fallback (so deploys
                        reach users; offline still works)
   - everything else  → cache-first (icons, manifest) */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.pathname.startsWith('/symbols/')) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(networkFirst(req));
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});

/* Network-first: try the network, update the cache on success,
   fall back to the cached copy if the network is unreachable. */
async function networkFirst(req) {
  try {
    const response = await fetch(req);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(req);
    if (cached) return cached;
    throw err;
  }
}
