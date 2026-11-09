const NAME='iron-meridian-0b55b15a20', SHELL=["./","index.html","manifest.webmanifest","fonts.css","vendor/three.min.js","vendor/GLTFLoader.js","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","fonts/BarlowSemiCondensed-400-normal.woff2","fonts/BarlowSemiCondensed-500-normal.woff2","fonts/BarlowSemiCondensed-600-normal.woff2","fonts/BarlowSemiCondensed-700-normal.woff2","fonts/IMFellEnglish-400-italic.woff2","fonts/IMFellEnglish-400-normal.woff2","fonts/IMFellEnglishSC-400-normal.woff2"];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(NAME).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('iron-meridian-')&&n!==NAME).map(n=>caches.delete(n)))).then(()=>self.clients.claim())); });
// saved copy first, so the game runs the same with or without a connection
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.open(NAME).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true}); if(hit) return hit;
    if(e.request.mode==='navigate'){ const page=await c.match('index.html'); if(page) return page; }
    return fetch(e.request);
  })); });
