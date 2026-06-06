const PREFIX='bar-voyage-';
const CACHE=PREFIX+'v17';
const CORE=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./favicon-32.png"];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(CORE);}).catch(function(){}));});
self.addEventListener('activate',function(e){e.waitUntil((async function(){var ks=await caches.keys();await Promise.all(ks.filter(function(k){return k.indexOf(PREFIX)===0&&k!==CACHE;}).map(function(k){return caches.delete(k);}));await self.clients.claim();})());});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;e.respondWith((async function(){
  var hit=await caches.match(r,{ignoreSearch:true});if(hit)return hit;
  try{var resp=await fetch(r);if(resp&&resp.ok&&resp.type==='basic'){var c=await caches.open(CACHE);c.put(r,resp.clone());}return resp;}
  catch(err){var fb=await caches.match('./index.html');return fb||Response.error();}
})());});
