self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=='sunshine-v2').map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(
  fetch(e.request).then(r=>{
   if(e.request.url.indexOf('sunshine')>=0){const c=r.clone();caches.open('sunshine-v2').then(x=>x.put(e.request,c))}
   return r;
  }).catch(()=>caches.match(e.request))
 );
});