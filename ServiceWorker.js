const cacheName = "Point Arrow-AirWars-1.0";
const contentToCache = [
    "Build/b3f41ccb6c0aaa02373328d94dfd2ed6.loader.js",
    "Build/05f1e20ae864b80766ff8ec7912160c0.framework.js.unityweb",
    "Build/7435a1d3a04f0b69b71abfcb045e1041.data.unityweb",
    "Build/6d6a7f62bca05e83bbf61538e9f75531.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
