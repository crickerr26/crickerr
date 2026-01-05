const CACHE_NAME = 'crickerr-v1';
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

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});