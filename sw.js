const CACHE="vig-v2.1";
const FILES=["./","./index.html","./manifest.webmanifest"];

self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(FILES))
  );
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys
          .filter(key=>key!==CACHE)
          .map(key=>caches.delete(key))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;

  if(e.request.mode==="navigate"){
    e.respondWith(
      fetch(e.request)
        .then(response=>{
          const copy=response.clone();
          caches.open(CACHE).then(cache=>
            cache.put("./index.html",copy)
          );
          return response;
        })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached=>
      cached ||
      fetch(e.request).then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(cache=>
          cache.put(e.request,copy)
        );
        return response;
      })
    )
  );
});
