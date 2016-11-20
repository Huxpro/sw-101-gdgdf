/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * service worker scripting
 * ========================================================== */

self.onfetch = (e) => {
  e.respondWith(new Response('Hello SW!'))
}
