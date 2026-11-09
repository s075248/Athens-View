/* ==========================================================================
   Athens View Maldives – extra features
   Packages · reviews · full-screen photo viewer · climate chart · saved trips ·
   installable/offline app · optional booked-dates feed.
   Loaded after app.js (needs window.AV and AV.util).
   ========================================================================== */
(function () {
  'use strict';
  var AV = window.AV, C = AV.config, U = AV.util;
  var $ = U.$, $$ = U.$$, esc = U.esc, money = U.money;

  /* ---------------------------- packages ---------------------------- */
  function packagePrice(pk, s) {
    var room = U.byId(AV.rooms, pk.room), g = Math.min(8, pk.guests), rooms = Math.ceil(g / room.maxGuests);
    var co = U.iso(U.addDays(U.fromIso(s.checkin), pk.nights));
    var base = U.stayCost(room, s.checkin, co).total * rooms;
    pk.excursions.forEach(function (id) { base += U.byId(AV.excursions, id).price * g; });
    var tr = { none: 0, arrival: 1, departure: 1, both: 2 }[pk.transfer] || 0;
    base += C.transferPrice * g * tr;
    return { guests: g, list: base, now: Math.round(base * (100 - pk.discount) / 100) };
  }

  function mountPackages() {
    $$('[data-packages]').forEach(function (box) {
      var s = U.getSearch(), list = AV.packages || [];
      if (!list.length) { box.classList.add('hidden'); return; }
      box.innerHTML = list.map(function (pk) {
        var room = U.byId(AV.rooms, pk.room), p = packagePrice(pk, s);
        var href = 'booking.html?' + U.qs({ pkg: pk.id, checkin: s.checkin, guests: p.guests });
        var items = [pk.nights + ' nights · ' + room.name]
          .concat(pk.excursions.map(function (id) { return U.byId(AV.excursions, id).name; }))
          .concat(pk.transfer === 'both' ? ['Round-trip speedboat transfer'] : pk.transfer === 'none' ? [] : ['Speedboat transfer (one way)']);
        return '<article class="av-pkg">' +
          '<span class="av-pkg-save">Save ' + pk.discount + '%</span>' +
          '<span class="av-pkg-ico material-symbols-outlined">' + esc(pk.icon || 'redeem') + '</span>' +
          '<h3>' + esc(pk.name) + '</h3><p class="av-pkg-tag">' + esc(pk.tagline || '') + '</p>' +
          '<ul>' + items.map(function (t) { return '<li><span class="material-symbols-outlined">check_circle</span>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<div class="av-pkg-price"><span class="av-pkg-was">' + money(p.list) + '</span> <b>' + money(p.now) + '</b><small>for ' + p.guests + ' guests · from ' + esc(U.prettyDate(s.checkin)) + '</small></div>' +
          '<a class="av-pkg-cta" data-pkg-link href="' + href + '">Choose this package</a></article>';
      }).join('');
    });
  }

  /* ---------------------------- reviews ---------------------------- */
  function stars(n) {
    var h = ''; for (var i = 0; i < 5; i++) h += '<span class="material-symbols-outlined ' + (i < n ? 'icon-fill' : '') + '">star</span>';
    return '<div class="av-stars" aria-label="' + n + ' out of 5 stars">' + h + '</div>';
  }
  function mountReviews() {
    $$('[data-reviews]').forEach(function (box) {
      var list = AV.reviews || [], links = C.reviewLinks || {};
      if (!list.length) { box.classList.add('hidden'); return; }
      var btns = [['google', 'Google'], ['tripadvisor', 'TripAdvisor'], ['booking', 'Booking.com']].filter(function (b) { return links[b[0]]; })
        .map(function (b) { return '<a class="av-rev-link" target="_blank" rel="noopener" href="' + esc(links[b[0]]) + '">Read more on ' + b[1] + '<span class="material-symbols-outlined">north_east</span></a>'; }).join('');
      box.innerHTML = '<div class="av-reviews">' + list.map(function (r) {
        var src = r.source ? (r.url ? '<a target="_blank" rel="noopener" href="' + esc(r.url) + '">via ' + esc(r.source) + '</a>' : '<span>via ' + esc(r.source) + '</span>') : '';
        return '<figure class="av-review"><span class="av-rev-q material-symbols-outlined">format_quote</span>' + stars(r.stars || 5) +
          '<blockquote>“' + esc(r.text) + '”</blockquote><figcaption><b>' + esc(r.name) + '</b>' + (r.country ? '<span>• ' + esc(r.country) + '</span>' : '') + src + '</figcaption></figure>';
      }).join('') + '</div>' + (btns ? '<div class="av-rev-links">' + btns + '</div>' : '');
    });
  }

  /* ---------------------------- photo viewer ---------------------------- */
  var lb, lbImgs = [], lbI = 0, lbReturn = null, lbX = null;
  function lbBuild() {
    if (lb) return;
    lb = document.createElement('div'); lb.className = 'av-lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = '<button type="button" class="av-lb-x" data-lb="close" aria-label="Close"><span class="material-symbols-outlined">close</span></button>' +
      '<button type="button" class="av-lb-n av-lb-prev" data-lb="prev" aria-label="Previous photo"><span class="material-symbols-outlined">chevron_left</span></button>' +
      '<img alt=""/><button type="button" class="av-lb-n av-lb-next" data-lb="next" aria-label="Next photo"><span class="material-symbols-outlined">chevron_right</span></button><div class="av-lb-c"></div>';
    document.body.appendChild(lb);
    lb.addEventListener('click', function (e) { var b = e.target.closest('[data-lb]'); if (b) { lbGo(b.dataset.lb); } else if (e.target === lb) lbClose(); });
    lb.addEventListener('touchstart', function (e) { lbX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (lbX == null) return; var dx = e.changedTouches[0].clientX - lbX; lbX = null; if (Math.abs(dx) > 45) lbGo(dx < 0 ? 'next' : 'prev'); }, { passive: true });
    window.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') { e.stopImmediatePropagation(); lbClose(); }
      else if (e.key === 'ArrowRight') lbGo('next'); else if (e.key === 'ArrowLeft') lbGo('prev');
    }, true);
  }
  function lbShow() {
    var img = $('img', lb); img.src = lbImgs[lbI]; img.alt = 'Photo ' + (lbI + 1) + ' of ' + lbImgs.length;
    $('.av-lb-c', lb).textContent = (lbI + 1) + ' / ' + lbImgs.length;
    lb.classList.toggle('single', lbImgs.length < 2);
  }
  function lbGo(dir) {
    if (dir === 'close') return lbClose();
    if (lbImgs.length < 2) return;
    lbI = (lbI + (dir === 'next' ? 1 : -1) + lbImgs.length) % lbImgs.length; lbShow();
  }
  function lbClose() { lb.classList.remove('open'); document.body.style.overflow = $('.av-modal.open') ? 'hidden' : ''; if (lbReturn && lbReturn.focus) lbReturn.focus(); }
  function lbOpen(images, start) {
    lbBuild(); lbImgs = images.slice(); lbI = Math.max(0, Math.min(start || 0, lbImgs.length - 1)); lbReturn = document.activeElement;
    lbShow(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; $('.av-lb-x', lb).focus();
  }
  U.openLightbox = lbOpen;
  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('img[data-lightbox]'); if (!img) return;
    var set = AV.lightboxSet && AV.lightboxSet.length ? AV.lightboxSet : [img.src], i = set.indexOf(img.getAttribute('src'));
    lbOpen(set, i < 0 ? 0 : i);
  });

  /* ---------------------------- climate / best time ---------------------------- */
  function mountWeather() {
    $$('[data-weather]').forEach(function (box) {
      var w = AV.weather || []; if (!w.length) return;
      var max = Math.max.apply(null, w.map(function (m) { return m.rain; })), now = new Date().getMonth();
      box.innerHTML = '<ol class="av-wx" aria-label="Average rainfall and temperatures by month">' + w.map(function (m, i) {
        return '<li class="av-wx-m ' + (m.season === 'dry' ? 'dry' : 'green') + (i === now ? ' now' : '') + '">' +
          '<span class="av-wx-rain">' + m.rain + '<small>mm</small></span>' +
          '<span class="av-wx-barwrap"><span class="av-wx-bar" style="height:' + Math.max(6, Math.round(m.rain / max * 100)) + '%"></span></span>' +
          '<b>' + esc(m.m) + '</b><span class="av-wx-t">' + m.air + '°</span><span class="av-wx-s">' + m.sea + '°</span></li>';
      }).join('') + '</ol>' +
        '<p class="av-wx-key"><span><i class="dry"></i>Dry season</span><span><i class="green"></i>Green season</span><span>Air °C · Sea °C · Rain per month (mm)</span></p>';
    });
  }

  /* ---------------------------- trips saved on this device ---------------------------- */
  function mountTrips() {
    $$('[data-my-trips]').forEach(function (box) {
      var all = []; try { all = JSON.parse(localStorage.getItem('av_bookings') || '[]'); } catch (e) {}
      if (!all.length) { box.classList.add('hidden'); return; }
      var out = $('[data-trips-list]', box);
      out.innerHTML = all.slice(0, 3).map(function (b) {
        var room = U.byId(AV.rooms, b.room);
        return '<li><b>' + esc(b.ref) + '</b><span>' + esc(U.prettyDate(b.checkin)) + ' → ' + esc(U.prettyDate(b.checkout)) + ' · ' + esc(room ? room.name : b.room) + ' · ' + b.guests + ' guest' + (b.guests > 1 ? 's' : '') + '</span></li>';
      }).join('');
      box.classList.remove('hidden');
    });
  }

  /* ---------------------------- install + offline ---------------------------- */
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    var f = $('footer .max-w-7xl'); if (!f || $('[data-install]')) return;
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-install', ''); b.className = 'av-install';
    b.innerHTML = '<span class="material-symbols-outlined">install_mobile</span>Install the Athens View app';
    b.addEventListener('click', function () { if (!deferred) return; deferred.prompt(); deferred.userChoice.then(function () { deferred = null; b.remove(); }); });
    f.appendChild(b);
  });
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
  function offlineBadge() {
    var el = $('#av-offline'); if (!el) { el = document.createElement('div'); el.id = 'av-offline'; el.setAttribute('role', 'status'); el.textContent = 'You are offline – showing saved pages'; document.body.appendChild(el); }
    el.classList.toggle('show', !navigator.onLine);
  }
  window.addEventListener('online', offlineBadge); window.addEventListener('offline', offlineBadge);

  /* ---------------------------- optional booked-dates feed ---------------------------- */
  function loadFeed() {
    if (!C.bookedFeed) return;
    fetch(C.bookedFeed, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (o) {
      U.setBookedExtra(o); U.mountRooms(); document.dispatchEvent(new Event('av:booked'));
    }).catch(function () {});
  }

  document.addEventListener('DOMContentLoaded', function () {
    mountPackages(); mountReviews(); mountWeather(); mountTrips(); loadFeed(); if (!navigator.onLine) offlineBadge();
  });
})();
