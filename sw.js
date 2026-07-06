/* ========================================
   DOI SUPPORT PORTAL — SERVICE WORKER
   ======================================== */

const CACHE_NAME = 'doi-portal-v13';

/* --- Core application shell --- */
const CORE_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './manifest.json',
  './assets/images/logo-doi.png',
  './assets/images/icons/icon-192.png',
  './assets/images/icons/icon-512.png',
  './assets/images/icons/cat-estabilizacion.png',
  './assets/images/icons/cat-silla.png',
  './assets/images/icons/cat-banarse.png',
  './assets/images/icons/cat-caminar.png',
  './assets/images/icons/cat-mesas.png',
  './camera-guide-module/camera-visor.html',
  './camera-guide-module/animacion-abductor.gif',
  './camera-guide-module/animacion-cunas-cabeza.gif',
];

/* --- Product media & documentation --- */
const PRODUCT_ASSETS = [
  './assets/images/products/estabilizacion/S200/main.png',
  './assets/images/products/estabilizacion/S200/secondary.png',
  './assets/images/products/estabilizacion/S300/main.png',
  './assets/images/products/estabilizacion/S300/secondary.png',
  './assets/images/products/estabilizacion/P600/main.png',
  './assets/images/products/estabilizacion/P600/secondary.png',
  './assets/images/products/estabilizacion/P700/main.png',
  './assets/images/products/estabilizacion/P700/secondary.png',
  './assets/images/products/estabilizacion/P300/main.png',
  './assets/images/products/estabilizacion/P300/secondary.png',
  './docs/S200/sitting-guia-tecnica-S200.pdf',
  './docs/S200/Manual-S200.pdf',
];

/* --- Patterns for cache-first routing --- */
const CACHE_FIRST_PATTERNS = [
  /\/assets\/images\//,
  /\/assets\/docs\//,
  /\/docs\//,
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/,
];

/* ========================================
   INSTALL: Cache core + product assets
   ======================================== */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      /* Core assets are critical — fail install if missing */
      await cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('SW: Error cacheando recursos principales:', err);
      });

      /* Product assets are best-effort — don't block install */
      for (const asset of PRODUCT_ASSETS) {
        try {
          await cache.add(asset);
          console.log('SW: Cacheado:', asset);
        } catch (_) {
          console.log('SW: Recurso pendiente (se cacheará al acceder):', asset);
        }
      }
    })
  );
  self.skipWaiting();
});

/* ========================================
   ACTIVATE: Clean old caches
   ======================================== */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('SW: Eliminando caché anterior:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

/* ========================================
   FETCH: Routing by resource type
   ======================================== */
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  /* Cache-first for static assets, images, docs, and fonts */
  if (CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(request.url))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  /* Network-first for HTML and dynamic app resources */
  if (request.url.startsWith(self.location.origin)) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
});

/* ========================================
   STRATEGIES
   ======================================== */

async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('SW [cache-first]: Sirviendo desde caché:', request.url);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      console.log('SW [cache-first]: Cacheado desde red:', request.url);
    }
    return networkResponse;
  } catch (_) {
    console.warn('SW [cache-first]: Sin conexión, recurso no disponible:', request.url);
    return new Response('', { status: 503, statusText: 'Sin conexión' });
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (_) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('SW [network-first]: Sirviendo desde caché (sin conexión):', request.url);
      return cachedResponse;
    }

    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('./index.html');
    }
    return new Response('Sin conexión', { status: 503, statusText: 'Sin conexión' });
  }
}
