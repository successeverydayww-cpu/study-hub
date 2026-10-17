/* Sky World service worker: caches map tiles + app shell for offline play. Passes everything else through. */
var CACHE='skyworld-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(clients.claim())});
self.addEventListener('fetch',function(e){
 var u=e.request.url;
 var cacheable=(u.indexOf('tile.openstreetmap.org')>=0)||(u.indexOf('unpkg.com')>=0)||(u.indexOf('skyworld.html')>=0)||(u.indexOf('skyworld-sw.js')>=0);
 if(!cacheable)return; /* never touch other apps */
 e.respondWith(
  caches.open(CACHE).then(function(c){
   return c.match(e.request).then(function(m){
    if(m)return m;
    return fetch(e.request).then(function(r){try{c.put(e.request,r.clone())}catch(x){}return r}).catch(function(){return m});
   });
  })
 );
});
