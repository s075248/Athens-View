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
  function mountPackages() {
    $$('[data-packages]').forEach(function (box) {
      var list = AV.packages || [];
      if (!list.length) { box.classList.add('hidden'); return; }
      box.innerHTML = list.map(function (pk) {
        var room = U.byId(AV.rooms, pk.room);
        var items = [pk.nights + ' nights · ' + room.name]
          .concat(pk.excursions.map(function (id) { return U.byId(AV.excursions, id).name; }))
          .concat(pk.transfer === 'both' ? ['Round-trip speedboat transfer'] : pk.transfer === 'none' ? [] : ['Speedboat transfer (one way)']);
        var msg = 'Hello Athens View! I would like to get the "' + pk.name + '" package (' + pk.nights + ' nights, ' + room.name + ').\nTravel dates: \nNumber of guests: ';
        return '<article class="av-pkg">' +
          '<span class="av-pkg-ico material-symbols-outlined">' + esc(pk.icon || 'redeem') + '</span>' +
          '<h3>' + esc(pk.name) + '</h3><p class="av-pkg-tag">' + esc(pk.tagline || '') + '</p>' +
          '<ul>' + items.map(function (t) { return '<li><span class="material-symbols-outlined">check_circle</span>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<div class="av-pkg-actions"><a class="av-pkg-cta" data-pkg-link target="_blank" rel="noopener" href="' + U.wa(msg) + '">Contact us for this package</a>' +
          '<a class="av-pkg-alt" href="mailto:' + esc(C.email) + '?subject=' + encodeURIComponent('Package enquiry: ' + pk.name) + '&body=' + encodeURIComponent(msg) + '">or email us</a></div></article>';
      }).join('');
    });
    $$('[data-pkg-steps]').forEach(function (box) {
      var steps = [['checklist', 'Choose', 'Pick the package that fits your trip.'], ['chat', 'Message us', 'Tell us your dates and guests on WhatsApp or email.'],
        ['event_available', 'We confirm', 'We check availability and confirm the details.'], ['payments', 'You pay', 'We send the payment options to secure your booking.'], ['directions_boat', 'You arrive', 'We meet you at the jetty and welcome you to Guraidhoo.']];
      box.innerHTML = '<h3 class="av-steps-h">How to get a package</h3><ol class="av-steps">' + steps.map(function (st, i) {
        return '<li><span class="av-step-n">' + (i + 1) + '</span><span class="material-symbols-outlined">' + st[0] + '</span><b>' + st[1] + '</b><span>' + st[2] + '</span></li>'; }).join('') + '</ol>';
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
      box.innerHTML = '<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Guest reviews</span><h2 class="av-h2">What our guests say</h2><div class="av-reviews">' + list.map(function (r) {
        var src = r.source ? (r.url ? '<a target="_blank" rel="noopener" href="' + esc(r.url) + '">via ' + esc(r.source) + '</a>' : '<span>via ' + esc(r.source) + '</span>') : '';
        return '<figure class="av-review"><span class="av-rev-q material-symbols-outlined">format_quote</span>' + stars(r.stars || 5) +
          '<blockquote>“' + esc(r.text) + '”</blockquote><figcaption><b>' + esc(r.name) + '</b>' + (r.country ? '<span>• ' + esc(r.country) + '</span>' : '') + src + '</figcaption></figure>';
      }).join('') + '</div>' + (btns ? '<div class="av-rev-links">' + btns + '</div>' : '');
    });
  }

  /* ---------------------------- real rating (only when set in data.js) ---------------------------- */
  function mountRating() {
    var r = C.googleRating, n = C.googleReviews, url = (C.reviewLinks || {}).google;
    $$('[data-rating]').forEach(function (el) {
      if (!r) { el.classList.add('hidden'); return; }
      var txt = '★ ' + r + ' on Google' + (n ? ' · ' + n + ' reviews' : '');
      el.innerHTML = url ? '<a target="_blank" rel="noopener" href="' + esc(url) + '">' + esc(txt) + '</a>' : esc(txt);
      el.classList.remove('hidden');
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

  function mountOfferConditions() {
    $$('[data-offer-terms]').forEach(function (ul) {
      var S = AV.signup; if (!S) return;
      ul.innerHTML = S.terms.concat(['Valid until ' + U.prettyDate(S.expires) + '.']).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    });
  }

  /* ---------------------------- sign-up offer pop-up ---------------------------- */
  var su = null, suTimer = null, suOpen = false;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e2) {} } return null; }
  function offerLive() { var S = AV.signup; return !!(S && S.enabled && (!S.expires || U.iso(new Date()) <= S.expires)); }
  function suClose() {
    if (!su) return; su.classList.remove('open'); suOpen = false; document.body.style.overflow = $('.av-modal.open') ? 'hidden' : '';
    if (su._ret && su._ret.focus) su._ret.focus();
  }
  function suShow() {
    if (suOpen || store('av_signup')) return;
    if ($('.av-modal.open') || $('.av-lb.open')) { suTimer = setTimeout(suShow, 8000); return; }
    var S = AV.signup; suOpen = true; store('av_signup', 'shown'); U.track('signup-shown');
    su = document.createElement('div'); su.className = 'av-su open'; su.setAttribute('role', 'dialog'); su.setAttribute('aria-modal', 'true'); su.setAttribute('aria-labelledby', 'av-su-t');
    su._ret = document.activeElement;
    su.innerHTML = '<div class="av-su-card"><button type="button" class="av-su-x" data-su-close aria-label="Close">×</button>' +
      '<div data-su-form><span class="av-su-badge">Welcome offer</span>' +
      '<h2 id="av-su-t">' + S.percent + '% off your first direct stay</h2>' +
      '<p>Leave your email or WhatsApp number and we’ll show you your code straight away. Valid until ' + esc(U.prettyDate(S.expires)) + '.</p>' +
      '<form novalidate><label class="av-su-l" for="av-su-c">Email or phone / WhatsApp</label><input id="av-su-c" name="contact" autocomplete="email" placeholder="you@example.com or +44 7…" required/>' +
      '<label class="av-su-consent"><input type="checkbox" name="consent" required/><span>I agree that Athens View may contact me by email, SMS or WhatsApp with this offer, booking reminders and occasional updates. I can unsubscribe at any time. <a href="privacy.html">Privacy Policy</a></span></label>' +
      '<p class="av-su-err" role="alert"></p><button type="submit" class="av-su-btn">Get my code</button></form>' +
      '<details class="av-su-terms"><summary>Offer terms</summary><ul>' + S.terms.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></details></div>' +
      '<div data-su-done class="hidden"><span class="av-su-badge">You’re in</span><h2>Your code</h2><p class="av-su-code" data-su-code></p><p data-su-msg></p>' +
      '<p><a class="av-su-btn" href="booking.html">Plan my stay</a></p><button type="button" class="av-su-later" data-su-close>Close</button></div></div>';
    document.body.appendChild(su); document.body.style.overflow = 'hidden';
    su.addEventListener('click', function (e) { if (e.target === su || e.target.closest('[data-su-close]')) suClose(); });
    su.addEventListener('keydown', function (e) { if (e.key === 'Escape') suClose(); });
    $('form', su).addEventListener('submit', function (e) { e.preventDefault(); suSubmit($('form', su)); });
    setTimeout(function () { var i = $('#av-su-c', su); if (i) i.focus(); }, 60);
  }
  function suSubmit(f) {
    var S = AV.signup, v = f.elements.contact.value.trim(), err = $('.av-su-err', f), isMail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), isTel = v.replace(/\D/g, '').length >= 7 && !/[a-z@]/i.test(v);
    if (!isMail && !isTel) { err.textContent = 'Please enter a valid email address or phone number.'; f.elements.contact.focus(); return; }
    if (!f.elements.consent.checked) { err.textContent = 'Please tick the box to agree to be contacted.'; return; }
    err.textContent = '';
    var lead = { type: 'signup', contact: v, kind: isMail ? 'email' : 'phone', consent: true, code: S.code, offer: S.percent + '% first direct stay', expires: S.expires, page: location.pathname.split('/').pop() || 'index.html', lang: AV.lang || 'en', at: new Date().toISOString() };
    if (C.demoMode) { try { var L = JSON.parse(localStorage.getItem('av_leads') || '[]'); L.unshift(lead); localStorage.setItem('av_leads', JSON.stringify(L.slice(0, 50))); } catch (er) {} }
    store('av_signup', 'done'); store('av_code', S.code); U.track('signup-submitted');
    var btn = $('.av-su-btn', f); btn.disabled = true;
    function done(ok) {
      $('[data-su-form]', su).classList.add('hidden'); $('[data-su-done]', su).classList.remove('hidden');
      if (C.demoMode && !C.formEndpoint) ok = true;
      $('[data-su-code]', su).textContent = S.code;
      $('[data-su-msg]', su).textContent = ok ? 'Thank you! We’ve saved your details and will send a welcome message soon. Quote this code when you book – valid until ' + U.prettyDate(S.expires) + '.' : 'Quote this code when you book – valid until ' + U.prettyDate(S.expires) + '.';
      if (!ok && !C.formEndpoint && !C.demoMode) window.open('mailto:' + C.email + '?subject=' + encodeURIComponent('Welcome offer – please send me updates') + '&body=' + encodeURIComponent('Hello Athens View, please send me the welcome offer (' + S.code + ') and keep me updated.\nContact: ' + v + '\nI agree to be contacted by email / SMS / WhatsApp.'), '_self');
    }
    if (C.formEndpoint) U.postJson(lead).then(done); else done(false);
  }
  function initSignup() {
    var page = document.body.dataset.page;
    if (!offerLive() || ['booking', 'contact', 'privacy', '404'].indexOf(page) > -1 || store('av_signup')) return;
    suTimer = setTimeout(suShow, (AV.signup.delaySeconds || 25) * 1000);
    document.addEventListener('mouseout', function (e) { if (!e.relatedTarget && e.clientY <= 0 && !suOpen && !store('av_signup')) { clearTimeout(suTimer); suShow(); } });
  }
  /* show the code again on request, e.g. <a data-show-offer> */
  U.offerLive = offerLive;

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
    mountPackages(); mountReviews(); mountRating(); mountOfferConditions(); mountWeather(); initSignup(); mountTrips(); loadFeed(); if (!navigator.onLine) offlineBadge();
  });
})();
