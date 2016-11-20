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

self.onfetch = (e) => {
  const cached = caches.match(e.request)
  const fallback = caches.match('offline.html')

  const fetched = fetch(`${e.request.url}?${Date.now()}`)
  const fetchedCopy = fetched.then(_ => _.clone())

  // Race for fullfilled one with fallback
  e.respondWith(
    Promise.race([fetched.catch(_ => cached), cached])
      .then(resp => resp || fetched)
      .catch(_ => fallback)
  )

  // Cache First with fallback
  try {
    e.respondWith(
      cached
        .then(res => res || fetch(e.request))
        .catch(_ => fallback)
    )
  } catch (e) {
    console.log(e);
  }

  // revalidate
  e.waitUntil(
    Promise.all([fetchedCopy, caches.open('runtime')])
      .then(([resp, cache]) => resp.ok && cache.put(e.request, resp))
      .catch(_ => {/* swallow */})
  )
}
