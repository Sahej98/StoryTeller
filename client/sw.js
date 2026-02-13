
const CACHE_NAME = 'storyteller-cache-v4';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/src/index.jsx'
];

self.addEventListener('install', (event) => {
    // Force this service worker to become the active service worker,
    // bypassing the waiting state.
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Strategy: Stale-while-revalidate for images/audio (Cloudinary or local)
    // This dramatically reduces bandwidth for repeated plays
    if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/audio/') || url.hostname.includes('cloudinary')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        // Only cache valid responses. 
                        // IMPORTANT: cache.put() throws on status 206 (Partial Content).
                        // Also ensure we only cache GET requests.
                        if (
                            networkResponse.ok &&
                            networkResponse.status === 200 &&
                            event.request.method === 'GET'
                        ) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        // If offline and no cache, returns undefined (handled by browser error)
                    });

                    // Return cached response immediately if available, otherwise wait for network
                    return cachedResponse || fetchPromise;
                });
            })
        );
    } else {
        // Standard cache first for app shell
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});
