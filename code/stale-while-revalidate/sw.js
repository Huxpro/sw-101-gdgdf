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
        './',
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

function cacheFirst(e, cached, fetched, fallback){
  e.respondWith(
    cached.then(res => res || fetched).catch(_ => fallback)
  )
}

function fastest(e, cached, fetched, fallback){
  e.respondWith(
    Promise.race([fetched.catch(_ => cached), cached])
      .then(resp => resp || fetched)
      .catch(_ => fallback)
  )
}

self.onfetch = (e) => {
  const cached = caches.match(e.request)
  const fallback = caches.match('offline.html')

  const fetched = fetch(`${e.request.url}?${Date.now()}`)
  const fetchedCopy = fetched.then(_ => _.clone())

  // Cache First with fallback
  //cacheFirst(e, cached, fetched, fallback)

  // or a better one: fastest, let network and cache race
  fastest(e, cached, fetched, fallback)

  // revalidate part
  e.waitUntil(
    Promise.all([fetchedCopy, caches.open('runtime')])
      .then(([resp, cache]) => resp.ok && cache.put(e.request, resp))
      .catch(_ => {/* swallow */})
  )
}
