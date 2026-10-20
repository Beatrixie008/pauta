const V="pauta-v2",SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put("index.html",cp));return res}).catch(()=>caches.match("index.html")));return}
  const ok=u.origin===location.origin||u.hostname==="www.gstatic.com"||u.hostname==="fonts.gstatic.com"||u.hostname==="fonts.googleapis.com"||u.hostname==="cdnjs.cloudflare.com";
  if(!ok)return;
  e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>h);return h||n}));
});
