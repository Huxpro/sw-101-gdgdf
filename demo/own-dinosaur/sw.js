/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * service worker scripting
 * ========================================================== */


self.oninstall = (e) => {
  e.waitUntil(
    caches.open('precache')
      .then( cache => cache.addAll([
        './offline.html',
        './own-dinosaur.jpg'
      ]))
      .then(self.skipWaiting())
  )
}

self.onactivate = (e) => {
  console.log('SW activated');
  //e.waitUntil(clients.claim())
}

self.onfetch = (e) => {
  e.respondWith(
    fetch(e.request).catch(_ => caches.match('offline.html'))
  )
}
