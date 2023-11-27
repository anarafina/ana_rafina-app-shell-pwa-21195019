var cacheName = 'appshell-v2';  // Ubah versi cache jika ada perubahan file yang di-cache
var filesToCache = [
  // ... (file yang di-cache)
];
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      }).catch(function(error) {
        console.error('Error adding files to cache:', error);
        console.log('Failed files:', filesToCache);
      })
    );
    self.skipWaiting();
  });
  
  self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
  });
  
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        // Coba mencari respons dari cache terlebih dahulu
        if (response) {
          return response;
        }
  
        // Jika tidak ada respons di cache, lakukan fetch dari server
        return fetch(e.request).then(function(fetchResponse) {
          // Periksa jika respons dari server valid
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }
  
          // Salin respons ke dalam cache dan kemudian kembalikan respons
          var responseToCache = fetchResponse.clone();
  
          caches.open(cacheName).then(function(cache) {
            cache.put(e.request, responseToCache);
          });
  
          return fetchResponse;
        }).catch(function() {
          // Jika fetch gagal (misalnya, karena offline), kembalikan respons offline mode
          return new Response('Offline Mode');
        });
      })
    );
  });