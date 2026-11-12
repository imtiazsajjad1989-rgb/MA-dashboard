const C='ma-dash-v2';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
var u=new URL(e.request.url);var key=(u.origin===location.origin)?(u.origin+u.pathname):e.request.url;
e.respondWith(fetch(e.request,{cache:'no-cache'}).then(function(r){var c=r.clone();caches.open(C).then(function(ch){ch.put(key,c);});return r;})
.catch(function(){return caches.match(key).then(function(m){return m||caches.match('./index.html');});}));});
