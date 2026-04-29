const CACHE_NAME = 'crickerr-v6'; // CHANGE THIS VERSION NUMBER EVERY TIME YOU UPDATE YOUR APP ON GITHUB (e.g., v2, v3)
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './my-logo.png',
  './icon-512.png'
  // Add other HTML files here if you want them to work offline too, e.g.:
  // './single_match.html',
  // './manage_teams.html'
];

// 1. Install Event - Caches the assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Activate Event - DELETES OLD CACHES (This is the new part you needed!)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // If the cache name doesn't match the current version, delete it
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Fetch Event - Serves from cache, falls back to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

// 4. Listen for messages from the client to trigger immediate update
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
