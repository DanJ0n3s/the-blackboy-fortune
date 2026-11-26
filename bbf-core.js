/* bbf-core.js: theme (light/dark/device), currency conversion, first-visit welcome panel.
   Loaded in <head> on every page so the right theme is set before anything paints. */
(function () {
  var D = document.documentElement;

  // Small storage helpers. try/catch because private browsing can block storage.
  function get(k, d) { try { var v = localStorage.getItem('bbf:' + k); return v === null ? d : v; } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem('bbf:' + k, v); } catch (e) {} }

  // ---------- Theme: 'device' | 'light' | 'dark' ----------
  var mq = window.matchMedia('(prefers-color-scheme: light)');
  function applyTheme() {
    var t = get('theme', 'device');
    D.setAttribute('data-theme', t === 'device' ? (mq.matches ? 'light' : 'dark') : t); // CSS reads this attribute
  }
  applyTheme();
  if (mq.addEventListener) mq.addEventListener('change', applyTheme); // follow the phone if set to device

  // ---------- Currency: always listed A to Z by full name, naira is the default ----------
  var CUR = [['AED', 'UAE Dirham'], ['CAD', 'Canadian Dollar'], ['EUR', 'Euro'], ['GBP', 'British Pound'], ['GHS', 'Ghanaian Cedi'],
             ['KES', 'Kenyan Shilling'], ['NGN', 'Nigerian Naira'], ['USD', 'US Dollar'], ['ZAR', 'South African Rand']]
    .sort(function (a, b) { return a[1].localeCompare(b[1]); });

  var rates = null; // rates are "1 naira = x of that currency"
  try { rates = JSON.parse(get('rates', 'null')); } catch (e) {}
  var listeners = [];
  function fire() { listeners.forEach(function (f) { f(); }); }

  // Fetch fresh rates. If it fails we keep the last saved rates, or show naira if there are none.
  fetch('https://open.er-api.com/v6/latest/NGN').then(function (r) { return r.json(); }).then(function (j) {
    if (j && j.rates) { rates = j.rates; put('rates', JSON.stringify(j.rates)); fire(); }
  }).catch(function () {});

  // price(35000) returns e.g. "₦35,000" or "$23.10" depending on the chosen currency.
  function price(naira) {
    var code = get('cur', 'NGN');
    var r = code === 'NGN' ? 1 : rates && rates[code];
    if (!r) { code = 'NGN'; r = 1; } // no rate available yet: fall back to naira
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: code,
      maximumFractionDigits: (code === 'NGN' || code === 'KES') ? 0 : 2 }).format(naira * r);
  }

  window.BBF = {
    get: get, put: put, price: price, currencies: CUR,
    setTheme: function (t) { put('theme', t); applyTheme(); },
    setCurrency: function (c) { put('cur', c); fire(); },
    on: function (f) { listeners.push(f); } // pages call BBF.on(redrawPrices) to refresh prices
  };

  // ---------- Header height, so the hero can fill exactly one screen ----------
  function measure() {
    var h = document.querySelector('header');
    if (h) D.style.setProperty('--hdr', h.offsetHeight + 'px');
  }

  // ---------- First-visit welcome panel ----------
  function welcome() {
    if (get('welcomed', '')) return; // only ever shown once per device
    var opts = CUR.map(function (c) { return '<option value="' + c[0] + '">' + c[1] + ' (' + c[0] + ')</option>'; }).join('');
    var wrap = document.createElement('div');
    wrap.className = 'bbf-welcome';
    wrap.innerHTML =
      '<div class="bbf-sheet" role="dialog" aria-label="Welcome">' +
      '<h2>Welcome to Blackboy Fortune</h2>' +
      '<p>Start with these settings? You can change them any time in Account.</p>' +
      '<label>Currency<select id="w-cur">' + opts + '</select></label>' +
      '<label>Appearance<select id="w-th"><option value="device">Match my device</option>' +
      '<option value="light">Light</option><option value="dark">Dark</option></select></label>' +
      '<button class="btn" id="w-go" type="button">Continue</button></div>';
    document.body.appendChild(wrap);
    var cur = wrap.querySelector('#w-cur'), th = wrap.querySelector('#w-th');
    cur.value = get('cur', 'NGN'); th.value = get('theme', 'device');
    cur.onchange = function () { BBF.setCurrency(cur.value); }; // changes apply live behind the panel
    th.onchange = function () { BBF.setTheme(th.value); };
    wrap.querySelector('#w-go').onclick = function () {
      put('welcomed', '1'); wrap.classList.remove('show');
      setTimeout(function () { wrap.remove(); }, 400); // wait for the slide-down to finish
    };
    requestAnimationFrame(function () { requestAnimationFrame(function () { wrap.classList.add('show'); }); });
  }

  // Skeleton of the page while it loads, faded out once everything has loaded
  function skeleton() {
    var sk = document.createElement('div'); sk.className = 'sk-page'; sk.setAttribute('aria-hidden', 'true');
    sk.innerHTML = '<div class="sk-block w60"></div><div class="sk-block big"></div><div class="sk-block"></div><div class="sk-block w60"></div><div class="sk-block"></div>';
    document.body.appendChild(sk);
    var done = function () { sk.classList.add('done'); setTimeout(function () { sk.remove(); }, 400); };
    if (document.readyState === 'complete') done(); else window.addEventListener('load', done);
    setTimeout(done, 4000); // never leave it up longer than 4 seconds
  }
  document.addEventListener('DOMContentLoaded', function () { skeleton(); measure(); welcome(); });
  window.addEventListener('resize', measure);
})();
