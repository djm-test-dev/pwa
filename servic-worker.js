const CACHE_NAME = 'pwa-cache-v0';

const FILES_TO_CACHE = [
    '/PWA/index.html',
    '/PWA/manifest.json',
    '/PWA/icon.png',
    '/PWA/icon-large.png'
];

// Instalacija
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Aktivacija
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            )
        )
    );
});

// Fetch handler
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});


