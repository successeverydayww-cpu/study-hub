self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(
  fetch(e.request).then(r=>{
   if(e.request.url.indexOf('skylife')>=0){const c=r.clone();caches.open('skylife-v1').then(x=>x.put(e.request,c))}
   return r;
  }).catch(()=>caches.match(e.request))
 );
});