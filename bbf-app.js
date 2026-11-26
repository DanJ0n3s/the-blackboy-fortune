/* bbf-app.js: Account menu, Reviews list, My reviews form. Loaded on account, reviews and faq pages. */
(function () {
  var WA = '2348113264642';                       // Blackboy Fortune WhatsApp number
  var page = document.body.dataset.page;
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Reviews (what other customers said): edit reviews-data.js to add one ---------- */
  function reviewsHTML() {
    var list = window.REVIEWS || [];
    if (!list.length) return '<p class="sheet-empty">No reviews here yet. Bought something? Share yours in My reviews.</p>';
    return list.map(function (r) {
      return '<div class="review-card"><b>' + esc(r.name) + '</b><small>' + esc(r.item) + '</small><p>' + esc(r.text) + '</p></div>';
    }).join('');
  }

  /* ---------- My reviews form: opens WhatsApp with the review ready to send ---------- */
  function reviewForm(pid, ci) {
    var opts = '';
    (window.PRODUCTS || []).forEach(function (p) {
      p.colors.forEach(function (c, i) {
        opts += '<option value="' + p.id + ':' + i + '"' + (p.id === pid && i === +ci ? ' selected' : '') + '>' + p.name + ', ' + c.name + '</option>';
      });
    });
    openSheet('My reviews',
      '<form class="rform" id="rform" novalidate><label>Full name (first and last)<input id="rv-name" autocomplete="name" placeholder="Ada Okafor"></label>' +
      '<label>What are you reviewing?<select id="rv-item">' + opts + '</select></label>' +
      '<label>Your review<textarea id="rv-text" rows="4" placeholder="How does it fit and feel?"></textarea></label>' +
      '<p class="rv-err" id="rv-err" role="alert"></p><button class="btn" type="submit">Share review</button></form>');
    document.getElementById('rform').onsubmit = function (e) {
      e.preventDefault();
      var name = document.getElementById('rv-name').value.trim().replace(/\s+/g, ' ');
      var text = document.getElementById('rv-text').value.trim();
      var err = document.getElementById('rv-err');
      if (name.split(' ').length < 2) { err.textContent = 'Please enter your first and last name.'; return; }
      if (!text) { err.textContent = 'Write a few words about the piece.'; return; }
      var sel = document.getElementById('rv-item');
      var msg = '⭐ *REVIEW — BLACKBOY FORTUNE* ⭐\n\n*Name:* ' + name + '\n*Item:* ' + sel.options[sel.selectedIndex].text + '\n*Review:* ' + text;
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank'); // they only press send
    };
  }

  /* ---------- Reviews page ---------- */
  var rl = document.getElementById('reviews-list');
  if (rl) rl.innerHTML = reviewsHTML();

  /* ---------- Account menu: one menu page for website and app ---------- */
  var menu = document.getElementById('account-menu');
  if (!menu) return;
  function row(id, label, hint) { return '<button class="arow" data-a="' + id + '" type="button"><span>' + label + '</span><small>' + hint + '</small><i aria-hidden="true">›</i></button>'; }
  menu.innerHTML =
    '<h2 class="ahead">My account</h2>' +
    row('orders', 'My orders', 'Saved on this device') + row('favourites', 'Favourites', 'Saved on this device') +
    row('reviews', 'Reviews', 'What customers say') + row('my-reviews', 'My reviews', 'Share yours on WhatsApp') +
    '<h2 class="ahead">Settings</h2>' + row('appearance', 'Appearance', '') + row('currency', 'Preferred currency', '') +
    '<h2 class="ahead">Data</h2>' + row('clear', 'Clear data/cache', 'Removes favourites, orders and settings');

  function hints() { // show the current choices next to the settings rows
    var th = { device: 'Match my device', light: 'Light', dark: 'Dark' }[BBF.get('theme', 'device')];
    var cur = BBF.get('cur', 'NGN'), nm = (BBF.currencies.filter(function (c) { return c[0] === cur; })[0] || [cur, cur])[1];
    menu.querySelector('[data-a=appearance] small').textContent = th;
    menu.querySelector('[data-a=currency] small').textContent = nm + ' (' + cur + ')';
  }
  hints();

  function open(a, arg) {
    if (a === 'orders') showOrders();
    if (a === 'reviews') openSheet('Reviews', reviewsHTML());
    if (a === 'my-reviews') reviewForm(arg && arg[0], arg && arg[1]);
    if (a === 'favourites') {
      var f = favs(), ps = (window.PRODUCTS || []).filter(function (p) { return f.indexOf(p.id) > -1; });
      openSheet('Favourites', ps.length ? ps.map(function (p) {
        return '<a class="fav-row" href="shop.html#p-' + p.id + '"><img src="' + p.colors[0].img + '" alt=""><span>' + p.name + '</span><b>' + BBF.price(p.price) + '</b></a>';
      }).join('') : '<p class="sheet-empty">No favourites yet. Tap the heart on a piece in the shop.</p>');
    }
    if (a === 'appearance') {
      var cur = BBF.get('theme', 'device');
      openSheet('Appearance', [['device', 'Match my device'], ['light', 'Light'], ['dark', 'Dark']].map(function (o) {
        return '<button class="opt' + (o[0] === cur ? ' sel' : '') + '" data-th="' + o[0] + '">' + o[1] + '</button>';
      }).join(''));
    }
    if (a === 'currency') {
      var c0 = BBF.get('cur', 'NGN');
      openSheet('Preferred currency', BBF.currencies.map(function (c) {
        return '<button class="opt' + (c[0] === c0 ? ' sel' : '') + '" data-cur="' + c[0] + '">' + c[1] + ' (' + c[0] + ')</button>';
      }).join(''));
    }
    if (a === 'clear') openSheet('Clear data/cache', '<p>This removes your favourites, order history, cart and settings from this device. You will see the welcome screen again.</p><button class="btn" id="do-clear" type="button">Clear everything</button>');
  }
  menu.addEventListener('click', function (e) { var b = e.target.closest('[data-a]'); if (b) open(b.dataset.a); });
  document.getElementById('sheet').addEventListener('click', function (e) {
    var t = e.target.closest('[data-th],[data-cur],#do-clear'); if (!t) return;
    if (t.dataset.th) { BBF.setTheme(t.dataset.th); open('appearance'); }
    if (t.dataset.cur) { BBF.setCurrency(t.dataset.cur); open('currency'); }
    if (t.id === 'do-clear') {                       // wipe everything the site saved, then reload
      Object.keys(localStorage).filter(function (k) { return /^bbf/.test(k); }).forEach(function (k) { localStorage.removeItem(k); });
      location.href = 'index.html';
    }
    hints();
  });

  var h = location.hash.slice(1).split(':');         // e.g. #my-reviews:cap:1 comes from "Share a review" on a product
  if (h[0]) open(h[0], h.slice(1));
})();
