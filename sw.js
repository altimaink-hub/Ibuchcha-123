self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.open('ik-v1').then(function(c) {
      return c.match(e.request).then(function(r) {
        return r || fetch(e.request).then(function(res) {
          c.put(e.request, res.clone());
          return res;
        });
      });
    })
  );
});
