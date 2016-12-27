/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * service worker scripting
 * ========================================================== */

self.oninstall = (e) => {
  e.waitUntil(
    caches.open('static')
      .then(cache => cache.add('./'))
  )
}


self.onfetch = (e) => {
  const fetched = fetch(e.request)
  const cached = caches.match(e.request)    
  e.respondWith(
    fetched.catch(_ => cached)
  )
}
