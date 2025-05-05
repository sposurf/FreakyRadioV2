// /public/service-worker.js
self.addEventListener('install', event => {
  // skipWaiting per attivazione immediata
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // takeover
  event.waitUntil(self.clients.claim());
});

// (opzionale) cache offline
const CACHE_NAME = 'radio-pwa-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logo.png'
];

self.addEventListener('fetch', event => {
  // fallback cache-first per le risorse
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});