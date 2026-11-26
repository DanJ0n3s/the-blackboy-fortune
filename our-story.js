
/* ================= DATA ================= */
const WA_NUMBER = '2348113264642';
const EMAIL = 'blackboyfortune@gmail.com';

const PRODUCTS = window.PRODUCTS; // comes from products.js

const ICONS = {
  cap:'<path d="M30 74 C30 38 90 38 90 74 Z"/><path d="M88 73 L114 81 Q116 89 104 86 L88 80 Z"/><rect x="25" y="74" width="70" height="9" rx="4.5"/><circle cx="60" cy="42" r="3.5" fill="rgba(0,0,0,.35)" stroke="none"/>',
  tee:'<path d="M42 20 L20 30 L11 53 L30 61 L34 49 L34 101 L86 101 L86 49 L90 61 L109 53 L100 30 L78 20 C71 31 49 31 42 20 Z"/>',
  tracksuit:'<path d="M42 18 L21 28 L13 57 L29 63 L34 50 L34 102 L86 102 L86 50 L91 63 L107 57 L99 28 L78 18 L60 36 L42 18 Z"/><rect x="58.6" y="36" width="2.8" height="66" rx="1.4" fill="rgba(0,0,0,.35)" stroke="none"/>',
  sweater:'<path d="M40 24 L18 34 L10 64 L28 70 L33 55 L33 102 L87 102 L87 55 L92 70 L110 64 L102 34 L80 24 C73 33 47 33 40 24 Z"/>',
  sweaterCollar:'<path d="M40 22 L18 32 L10 62 L28 68 L33 53 L33 102 L87 102 L87 53 L92 68 L110 62 L102 32 L80 22 L60 36 L40 22 Z"/><path d="M42 20 L50 16 L60 28 L70 16 L78 20 L60 42 Z"/>',
  sleeveless:'<path d="M44 16 L33 24 L37 40 L27 50 L27 102 L93 102 L93 50 L83 40 L87 24 L76 16 C70 29 50 29 44 16 Z"/>'
};

/* ================= HELPERS ================= */
function isLight(hex){
  const h = hex.replace('#','');
  const r=parseInt(h.slice(0,2),16), g=parseInt(h.slice(2,4),16), b=parseInt(h.slice(4,6),16);
  return (0.299*r + 0.587*g + 0.114*b) > 150;
}
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2600);
}
function productSVGold(p, ci){
  const c = p.colors[ci]; const uid = p.id + '-' + ci;
  let defs = '', fill = c.hex || '#777';
  if(c.gradient){
    fill = 'url(#g' + uid + ')';
    defs = '<defs><linearGradient id="g' + uid + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + c.gradient[0] + '"/><stop offset="1" stop-color="' + c.gradient[1] + '"/></linearGradient></defs>';
  }
  const base = c.gradient ? c.gradient[0] : c.hex;
  const lc = isLight(base) ? '#161616' : '#f5f5f5';
  let logo = '';
  if(p.icon === 'tee') logo = '<text x="60" y="66" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="6.2" letter-spacing="0.8" fill="'+lc+'" stroke="none">BLACKBOY FORTUNE</text>';
  if(p.icon === 'cap') logo = '<text x="60" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="9" letter-spacing="1" fill="'+lc+'" stroke="none">BBF</text>';
  if(p.icon === 'tracksuit') logo = '<text x="47" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="5" fill="'+lc+'" stroke="none">BBF</text>';
  if(p.icon === 'sleeveless') logo = '<text x="60" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="6.5" fill="'+lc+'" stroke="none">BBF</text>';
  if(p.icon === 'sweater' || p.icon === 'sweaterCollar') logo = '<text x="60" y="74" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="5.5" letter-spacing="0.6" fill="'+lc+'" stroke="none">BLACKBOY FORTUNE</text>';
  return '<svg viewBox="0 0 120 120">' + defs +
    '<g fill="' + fill + '" stroke="rgba(0,0,0,.4)" stroke-width="1.5" stroke-linejoin="round">' + ICONS[p.icon] + '</g>' + logo + '</svg>';
}

const PHOTOS = {
  'caps':'caps-flatlay.jpg', 'tracksuits':'tracksuit.jpg', 'printed-tees':'two-friends-tree.jpg',
  'plain-tees':'plain-tee.jpg', 'collar-sweaters':'collar-sweater.jpg', 'nocollar-sweaters':'group-studio.jpg', 'sleeveless':'street-bridge.jpg'
};
const VIDEOS = {};
function productSVG(p, ci){
  return '<img src="' + p.colors[ci].img + '" alt="' + p.name + '" loading="lazy">';
}

/* ================= NAV (multi-page) ================= */
function highlightNav(){
  const current = document.body.dataset.page || 'home';
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === current));
}
document.querySelectorAll('.mlink, .msub').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
}));

document.getElementById('hamburger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
document.getElementById('stories-toggle').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('stories-item').classList.toggle('open');
});
document.addEventListener('click', e => {
  if(!e.target.closest('#stories-item')) document.getElementById('stories-item').classList.remove('open');
});

/* ================= MARQUEE ================= */
if(document.getElementById('marquee')){
  const phrases = ['BlackBoy Fortune','Luxury for the People','Freedom in Every Stitch','Born in Lagos','Comfort for the Struggle','Be Your Own Person'];
  const half = phrases.map((p,i) => '<span class="' + (i%2 ? 'hl' : '') + '">' + p + ' </span>').join('');
  document.getElementById('marquee').innerHTML = half + half;
}

/* ================= SHOP ================= */
/* Favourites are kept on this device only. */
function favs(){ try{ return JSON.parse(localStorage.getItem('bbf_fav') || '[]'); }catch(e){ return []; } }
function toggleFav(id){
  const f = favs(), i = f.indexOf(id);
  if(i < 0) f.push(id); else f.splice(i, 1);          // add if missing, remove if there
  try{ localStorage.setItem('bbf_fav', JSON.stringify(f)); }catch(e){}
  return i < 0;                                       // true = now a favourite
}
function productCardHTML(p){
  // Tracksuit pictures show front and back together, so the labels sit above the picture, never on the clothes
  const fb = p.frontBack ? '<div class="fb"><span>Front</span><span>Back</span></div>' : '';
  const sizes = p.sizes.length > 1
    ? '<div class="sizes" role="group" aria-label="Size">' + p.sizes.map(s => '<button class="size" data-s="' + s + '">' + s + '</button>').join('') + '</div>'
    : '<div class="one-size">One size</div>';
  return '<article class="product-card" id="p-' + p.id + '" data-pid="' + p.id + '" data-ci="0" data-size="' + (p.sizes.length === 1 ? p.sizes[0] : '') + '">' + fb +
    '<div class="product-visual"><img src="' + p.colors[0].img + '" alt="' + p.name + '" loading="lazy">' +
      (p.colors.length > 1 ? '<button class="arrow prev" aria-label="Previous colour">‹</button><button class="arrow next" aria-label="Next colour">›</button>' : '') +
      '<button class="heart' + (favs().includes(p.id) ? ' on' : '') + '" aria-label="Favourite">♥</button></div>' +
    '<div class="product-info"><h3>' + p.name + '</h3>' +
      '<div class="price" data-naira="' + p.price + '">' + BBF.price(p.price) + '</div>' +
      '<div class="swatches">' + p.colors.map((c, i) => '<button class="swatch' + (i === 0 ? ' sel' : '') + '" data-i="' + i + '" title="' + c.name + '" aria-label="' + c.name + '" style="background:' + c.hex + '"></button>').join('') + '</div>' +
      '<div class="color-name">Colour: <span class="cn">' + p.colors[0].name + '</span></div>' + sizes +
      '<p class="ptime"><b>Ready in ' + p.time + '.</b> ' + PRE_ORDER_NOTE + '</p>' +
      '<div class="card-row"><div class="qty-step"><button class="q-minus" aria-label="Decrease">−</button><input class="q-input" type="number" min="1" max="99" value="1"><button class="q-plus" aria-label="Increase">+</button></div>' +
      '<button class="btn add-btn">Add to Cart</button></div>' +
      '<a class="review-link" href="account.html#my-reviews:' + p.id + ':0">Share a review</a>' +
    '</div></article>';
}
/* Show colour number i: loops round, swaps the picture, updates swatch, name and review link */
function setColour(card, i){
  const p = PRODUCTS.find(x => x.id === card.dataset.pid), n = p.colors.length;
  i = (i + n) % n;
  card.dataset.ci = i;
  const img = card.querySelector('.product-visual img');
  img.classList.add('swap');                                       // quick fade out
  setTimeout(() => { img.src = p.colors[i].img; img.classList.remove('swap'); }, 160);
  card.querySelectorAll('.swatch').forEach((s, k) => s.classList.toggle('sel', k === i));
  card.querySelector('.cn').textContent = p.colors[i].name;
  card.querySelector('.review-link').href = 'account.html#my-reviews:' + p.id + ':' + i;
}
function renderProducts(filter){
  const grid = document.getElementById('shop-grid');
  if(!grid) return;
  grid.innerHTML = '<div class="sk-card"></div>'.repeat(6);          // skeleton cards while loading
  setTimeout(() => {
    grid.innerHTML = PRODUCTS.filter(p => filter === 'all' || p.cat === filter).map(productCardHTML).join('');
    const h = location.hash.match(/^#p-(.+)$/);                      // arriving from Favourites
    if(h && document.getElementById('p-' + h[1])) document.getElementById('p-' + h[1]).scrollIntoView({behavior:'smooth', block:'center'});
  }, 220);
}
if(document.getElementById('shop-grid')){
  renderProducts('all');
  document.querySelectorAll('.filter-chip').forEach(ch => ch.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('on'));
    ch.classList.add('on');
    renderProducts(ch.dataset.filter);
  }));
  const grid = document.getElementById('shop-grid');
  let tx = null;
  grid.addEventListener('touchstart', e => { tx = e.target.closest('.product-visual') ? e.touches[0].clientX : null; }, {passive:true});
  grid.addEventListener('touchend', e => {                           // swipe the picture to see the next colour
    if(tx === null) return;
    const dx = e.changedTouches[0].clientX - tx, card = e.target.closest('.product-card');
    if(card && Math.abs(dx) > 40) setColour(card, +card.dataset.ci + (dx < 0 ? 1 : -1));
    tx = null;
  });
  grid.addEventListener('click', e => {
    const card = e.target.closest('.product-card'); if(!card) return;
    const p = PRODUCTS.find(x => x.id === card.dataset.pid), t = e.target;
    if(t.classList.contains('swatch')) setColour(card, +t.dataset.i);
    if(t.classList.contains('next')) setColour(card, +card.dataset.ci + 1);
    if(t.classList.contains('prev')) setColour(card, +card.dataset.ci - 1);
    if(t.classList.contains('size')){
      card.dataset.size = t.dataset.s;
      card.querySelectorAll('.size').forEach(s => s.classList.toggle('sel', s === t));
      card.classList.remove('need');
    }
    if(t.classList.contains('heart')) t.classList.toggle('on', toggleFav(p.id));
    if(t.classList.contains('q-plus')){ const inp = card.querySelector('.q-input'); inp.value = Math.min(99, +inp.value + 1); }
    if(t.classList.contains('q-minus')){ const inp = card.querySelector('.q-input'); inp.value = Math.max(1, +inp.value - 1); }
    if(t.closest('.add-btn')){
      if(!card.dataset.size){ card.classList.add('need'); toast('Pick a size first'); return; }   // size is required
      addToCart(p.id, +card.dataset.ci, Math.max(1, parseInt(card.querySelector('.q-input').value) || 1), card.dataset.size);
    }
  });
  /* Currency dropdown on the shop page (same A to Z list as Account settings) */
  const cs = document.getElementById('shop-cur');
  if(cs){
    cs.innerHTML = BBF.currencies.map(c => '<option value="' + c[0] + '">' + c[1] + ' (' + c[0] + ')</option>').join('');
    cs.value = BBF.get('cur', 'NGN');
    cs.onchange = () => BBF.setCurrency(cs.value);
  }
}
/* Whenever the currency or live rates change, refresh every price and the cart */
BBF.on(() => {
  document.querySelectorAll('.price').forEach(el => el.textContent = BBF.price(+el.dataset.naira));
  const cs = document.getElementById('shop-cur'); if(cs) cs.value = BBF.get('cur', 'NGN');
  renderCart();
});
/* Text added to the WhatsApp order: naira total, currency note, production-time note */
function orderNote(){
  const naira = cart.reduce((s, i) => s + i.qty * ((PRODUCTS.find(x => x.id === i.pid) || {price:0}).price), 0);
  return '\n\n*Total in naira:* ' + new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN', maximumFractionDigits:0}).format(naira) +
    '\n(Prices on the site were shown in ' + BBF.get('cur', 'NGN') + '. The final price is confirmed in naira.)' +
    '\n' + PRE_ORDER_NOTE;
}

/* Featured on home */
if(document.getElementById('home-featured')){
  document.getElementById('home-featured').innerHTML = ['cap','tracksuit','tee'].map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    return '<a class="feat-card" href="shop.html"><div class="product-visual">' + productSVG(p,0) + '</div>' +
      '<div class="feat-info"><h3>' + p.name + '</h3><span>' + p.colors.length + ' colourways</span></div></a>';
  }).join('');
}

/* ================= CART ================= */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('bbf_cart') || '[]'); } catch(e){ cart = []; }
function saveCart(){ localStorage.setItem('bbf_cart', JSON.stringify(cart)); }

function addToCart(pid, ci, qty, size){
  const p = PRODUCTS.find(x => x.id === pid);
  const c = p.colors[ci];
  size = size || (p.sizes.length === 1 ? p.sizes[0] : '');
  const key = pid + '||' + c.name + '||' + size;
  const ex = cart.find(it => it.key === key);
  if(ex) ex.qty = Math.min(99, ex.qty + qty);
  else cart.push({ key, pid, name:p.name, color:c.name, size, qty });
  saveCart(); renderCart();
  toast('✓ ' + p.name + ' (' + c.name + (size ? ', ' + size : '') + ') added to cart');
}
function renderCart(){
  const count = cart.reduce((s,i) => s + i.qty, 0);
  document.getElementById('drawer-total').textContent = count;
  document.getElementById('drawer-count').textContent = count ? '(' + count + ')' : '';
  const badge = document.getElementById('cart-count');
  badge.textContent = count;
  badge.style.display = count ? 'grid' : 'none';
  const tb = document.getElementById('tab-badge'); if(tb) tb.textContent = count || '';
  const wrap = document.getElementById('drawer-items');
  if(!cart.length){
    wrap.innerHTML = '<div class="cart-empty"><div class="ce-icon"></div><p>Your cart is empty —<br>the streets are waiting.</p><a href="shop.html" class="btn" onclick="closeDrawer()">Start Shopping</a></div>';
    return;
  }
  wrap.innerHTML = cart.map((it, idx) => {
    const p = PRODUCTS.find(x => x.id === it.pid);
    const c = p.colors.find(c => c.name === it.color);
    const bg = c.gradient ? 'linear-gradient(135deg,' + c.gradient[0] + ',' + c.gradient[1] + ')' : c.hex;
    return '<div class="cart-item">' +
      '<span class="ci-dot" style="background:' + bg + '"></span>' +
      '<div class="ci-info"><strong>' + it.name + '</strong><span class="ci-color">' + it.color + '</span>' +
        '<div class="qty-step sm"><button data-act="minus" data-idx="' + idx + '">−</button><span>' + it.qty + '</span><button data-act="plus" data-idx="' + idx + '">+</button></div>' +
      '</div>' +
      '<button class="ci-remove" data-act="remove" data-idx="' + idx + '" aria-label="Remove">✕</button></div>';
  }).join('');
}
document.getElementById('drawer-items').addEventListener('click', e => {
  const b = e.target.closest('button[data-act]'); if(!b) return;
  const it = cart[+b.dataset.idx]; if(!it) return;
  if(b.dataset.act === 'plus') it.qty = Math.min(99, it.qty + 1);
  if(b.dataset.act === 'minus') it.qty = Math.max(1, it.qty - 1);
  if(b.dataset.act === 'remove'){ cart.splice(+b.dataset.idx, 1); toast('Removed from cart'); }
  saveCart(); renderCart();
});

/* Drawer open/close */
function openDrawer(){ document.body.classList.add('drawer-open'); }
function closeDrawer(){ document.body.classList.remove('drawer-open'); }
document.getElementById('cart-open').addEventListener('click', openDrawer);
document.getElementById('cart-close').addEventListener('click', closeDrawer);
document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);

/* Order & Enquiry via WhatsApp, with auto-clear on return */
function cartLines(){
  return cart.map((it,i) => {
    const p = PRODUCTS.find(x => x.id === it.pid) || {time:''};
    return (i+1) + '. ' + it.name + ' — Colour: ' + it.color + (it.size ? ' — Size: ' + it.size : '') + ' — Qty: ' + it.qty + ' — Ready in ' + p.time;
  }).join('\n');
}
function clearCart(showToast){
  cart = [];
  saveCart();
  renderCart();
  if(showToast) toast('Cart cleared');
}
function markPendingClear(){
  try{ localStorage.setItem('bbf_pending_clear','1'); }catch(e){}
}
document.getElementById('order-btn').addEventListener('click', () => {
  if(!cart.length) return toast('Your cart is empty — add some pieces first ');
  const total = cart.reduce((s,i) => s + i.qty, 0);
  const msg = '🛒 *NEW ORDER — BLACKBOY FORTUNE* 🛒\n\n' + cartLines() +
    '\n\n*Total items:* ' + total + orderNote() + '\n\nHello BlackBoy Fortune! Please confirm the total price for this order. Thank you! 🙏';
  saveOrder();
  markPendingClear();
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
});
document.getElementById('enquiry-btn').addEventListener('click', () => {
  if(!cart.length) return toast('Your cart is empty — add some pieces first ');
  const msg = '❓ *ENQUIRY — BLACKBOY FORTUNE* ❓\n\nHello BlackBoy Fortune! I have an enquiry about these items in my cart:\n\n' +
    cartLines() + '\n\nPlease get back to me. Thank you!';
  markPendingClear();
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
});
document.getElementById('clear-btn').addEventListener('click', () => {
  if(!cart.length) return toast('Your cart is already empty');
  if(confirm('Clear everything in your cart?')) clearCart(true);
});
/* If they've come back from WhatsApp after ordering/enquiring, wipe the cart */
(function autoClearOnReturn(){
  try{
    if(localStorage.getItem('bbf_pending_clear') === '1'){
      localStorage.removeItem('bbf_pending_clear');
      clearCart(false);
    }
  }catch(e){}
})();
document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'visible'){
    try{
      if(localStorage.getItem('bbf_pending_clear') === '1'){
        localStorage.removeItem('bbf_pending_clear');
        clearCart(true);
      }
    }catch(e){}
  }
});

/* Blog expand/collapse */
document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const post = btn.closest('.blog-post');
    const open = post.classList.toggle('open');
    btn.textContent = open ? 'Show less −' : 'Read full story';
  });
});

/* Story page: rotate through video bits as a full-bleed background */
(function storyBgRotator(){
  const el = document.getElementById('story-bg-video');
  if(!el) return;
  const bits = ['assets/video/bg-bit-1.mp4','assets/video/bg-bit-2.mp4','assets/video/bg-bit-3.mp4','assets/video/bg-bit-4.mp4'];
  let i = 0;
  function playNext(){
    el.src = bits[i % bits.length];
    i++;
    el.load();
    el.play().catch(()=>{});
  }
  el.addEventListener('ended', playNext);
  playNext();
})();

/* ================= APP LAYER (installable app) ================= */
/* 1. Register the service worker (offline mode) and warn when a new version is ready */
if('serviceWorker' in navigator && location.protocol.indexOf('http') === 0){      // only works on a real web address
  window.addEventListener('load', () => {                                          // wait until the page has loaded
    navigator.serviceWorker.register('sw.js').then(reg => {                        // start sw.js
      reg.addEventListener('updatefound', () => {                                  // a changed sw.js was found
        const w = reg.installing;                                                  // the new worker being set up
        if(w) w.addEventListener('statechange', () => {                            // watch its progress
          if(w.state === 'installed' && navigator.serviceWorker.controller) toast('New version ready. Close and reopen the app to update.');
        });
      });
    }).catch(() => {});                                                            // never break the site if it fails
  });
}

/* 2. Highlight the current tab */
const TAB_BY_PAGE = { 'home':'home', 'shop':'shop', 'who-we-are':'stories', 'our-story':'stories', 'blog':'stories', 'reviews':'stories', 'faq':'stories', 'account':'account' };
document.querySelectorAll('#tabbar [data-tab]').forEach(t =>                       // each tab that has a data-tab label
  t.classList.toggle('on', t.dataset.tab === TAB_BY_PAGE[document.body.dataset.page || 'home']));  // mark the one matching this page

/* 3. Bottom sheet used by the Orders and Stories tabs */
const sheetEl = document.getElementById('sheet');
function openSheet(title, html){
  document.getElementById('sheet-title').textContent = title;                      // heading
  document.getElementById('sheet-body').innerHTML = html;                          // content
  sheetEl.classList.add('open'); sheetEl.setAttribute('aria-hidden','false');      // slide it up
}
function closeSheet(){ sheetEl.classList.remove('open'); sheetEl.setAttribute('aria-hidden','true'); }
document.getElementById('sheet-close').addEventListener('click', closeSheet);      // X button
sheetEl.addEventListener('click', e => { if(e.target === sheetEl) closeSheet(); }); // tap outside the card
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeSheet(); }); // Esc key

/* 4. Order history (kept on this phone only) */
function loadOrders(){ try{ return JSON.parse(localStorage.getItem('bbf_orders') || '[]'); }catch(e){ return []; } }
function saveOrder(){                                                              // called when the customer taps Order
  if(!cart.length) return;                                                         // nothing to save
  const list = loadOrders();
  list.unshift({ id: Date.now(), items: cart.map(i => ({ pid:i.pid, name:i.name, color:i.color, size:i.size, qty:i.qty })) });  // newest first
  try{ localStorage.setItem('bbf_orders', JSON.stringify(list.slice(0, 20))); }catch(e){}  // keep the latest 20
}
function showOrders(){
  const list = loadOrders();
  if(!list.length){ openSheet('My orders', '<p class="sheet-empty">No orders yet. Pieces you order on WhatsApp will show here so you can reorder them.</p>'); return; }
  openSheet('My orders', list.map(o =>
    '<div class="order-card"><small>' + new Date(o.id).toLocaleDateString(undefined, {day:'numeric', month:'short', year:'numeric'}) + '</small><ul>' +
    o.items.map(i => '<li>' + i.qty + ' x ' + i.name + ' (' + i.color + (i.size ? ', ' + i.size : '') + ')</li>').join('') +
    '</ul><button class="btn-ghost" data-reorder="' + o.id + '">Order again</button></div>'
  ).join('') + '<button class="btn-ghost" id="clear-orders" style="margin-top:16px">Clear history</button>');
}
sheetEl.addEventListener('click', e => {
  const r = e.target.closest('[data-reorder]');
  if(r){                                                                           // "Order again" tapped
    const o = loadOrders().find(x => String(x.id) === r.dataset.reorder); if(!o) return;
    o.items.forEach(i => {
      const p = PRODUCTS.find(x => x.id === i.pid); if(!p) return;                 // skip pieces that no longer exist
      const ci = Math.max(0, p.colors.findIndex(c => c.name === i.color));         // find the colour again
      addToCart(i.pid, ci, i.qty, i.size);                                                 // put it back in the cart
    });
    closeSheet(); openDrawer();                                                    // show the cart
  }
  if(e.target.id === 'clear-orders' && confirm('Clear your order history?')){ localStorage.removeItem('bbf_orders'); showOrders(); }
});

/* 5. Tab bar buttons */
document.getElementById('tab-cart').addEventListener('click', openDrawer);
document.getElementById('tab-stories').addEventListener('click', () => openSheet('Stories',
  '<a class="sheet-link" href="who-we-are.html">Who We Are</a><a class="sheet-link" href="our-story.html">Our Story</a>' +
  '<a class="sheet-link" href="blog.html">Blog</a><a class="sheet-link" href="reviews.html">Reviews</a><a class="sheet-link" href="faq.html">Delivery and FAQ</a>'));

/* 6. "Install the app" bar */
let installEvt = null;
const isStandalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;  // already installed?
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const installBar = document.getElementById('install-bar');
function installDismissed(){ try{ return localStorage.getItem('bbf_install_dismissed') === '1'; }catch(e){ return false; } }
function showInstall(text, canInstall){
  if(isStandalone || installDismissed()) return;                                   // don't nag
  document.getElementById('install-text').textContent = text;
  document.getElementById('install-btn').style.display = canInstall ? '' : 'none'; // iPhone has no install button
  installBar.hidden = false;
}
window.addEventListener('beforeinstallprompt', e => {                              // Chrome/Android says "installable"
  e.preventDefault(); installEvt = e;                                              // hold the prompt until the customer taps Install
  showInstall('Install the BlackBoy Fortune app', true);
});
if(isIOS && !isStandalone) showInstall('To install: tap Share, then Add to Home Screen.', false);
document.getElementById('install-btn').addEventListener('click', async () => {
  if(!installEvt) return;
  installEvt.prompt(); await installEvt.userChoice;                                // show the phone's install dialog
  installEvt = null; installBar.hidden = true;
});
document.getElementById('install-x').addEventListener('click', () => {
  try{ localStorage.setItem('bbf_install_dismissed','1'); }catch(e){}              // remember "no thanks"
  installBar.hidden = true;
});
window.addEventListener('appinstalled', () => { installBar.hidden = true; });

/* Init */
renderCart();
highlightNav();
