/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * service worker scripting
 * ========================================================== */


self.oninstall = (e) => {
  e.waitUntil(
    caches.open('installation')
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
  // Chrome would disk-cache any response with no "cache-control",
  // which broke the assumption that we would fetch index.html failed
  // and fallback to cache
  // So we have to do forced cache-busting with date-stamp query.
  const fetched = fetch(`${e.request.url}?${Date.now()}`)
  const cached = caches.match(e.request)
  const sorry = caches.match('offline.html')

  e.respondWith(
    fetched.catch(_ => cached).then(res => res || sorry)
  )
}
