const CACHE_NAME = 'pwa-cache-v0';

const FILES_TO_CACHE = [
    'https://djm-test-dev.github.io/pwa/index.html',
    'https://djm-test-dev.github.io/pwa/manifest.json',
    'https://djm-test-dev.github.io/pwa/icon.png',
    'https://djm-test-dev.github.io/pwa/icon-large.png'
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




