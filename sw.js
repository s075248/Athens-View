/* Athens View Maldives – service worker
   Keeps the site usable on a weak island connection:
   · own pages / scripts / styles: try the network first, fall back to the saved copy
   · photos, fonts and icon font from other sites: saved after first view, then served instantly
   Bump VERSION whenever you change the PRECACHE list. */
var VERSION = 'av-v1';
var PAGES = 'av-pages-' + VERSION, MEDIA = 'av-media-' + VERSION, MEDIA_MAX = 150;
var PRECACHE = [
  'index.html', 'rooms.html', 'excursions.html', 'dining.html', 'location.html', 'booking.html', 'contact.html', 'privacy.html', '404.html',
  'assets/css/tailwind.css', 'assets/css/site.css',
  'assets/js/data.js', 'assets/js/app.js', 'assets/js/extras.js', 'assets/js/booking.js', 'assets/js/contact-links.js', 'assets/js/i18n.js',
  'assets/img/logo.svg', 'assets/img/icon-192.png', 'manifest.webmanifest'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(PAGES).then(function (c) {
    return Promise.all(PRECACHE.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== PAGES && k !== MEDIA; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function trim(cache) {
  return cache.keys().then(function (keys) { if (keys.length > MEDIA_MAX) return cache.delete(keys[0]).then(function () { return trim(cache); }); });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(PAGES).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        return hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error());
      });
    }));
    return;
  }

  /* other sites: only photos, fonts and stylesheets (not maps or iframes) */
  if (req.destination === 'image' || req.destination === 'font' || req.destination === 'style') {
    e.respondWith(caches.open(MEDIA).then(function (cache) {
      return cache.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && (res.ok || res.type === 'opaque')) { cache.put(req, res.clone()).then(function () { return trim(cache); }); }
          return res;
        });
      });
    }));
  }
});
