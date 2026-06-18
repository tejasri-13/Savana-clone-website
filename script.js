/* =============================================
   PRODUCT DATA
   ============================================= */
const PRODUCTS = [
  {id:1,  name:'Floral Midi Dress',        cat:'dress',     emoji:'👗', price:1299, old:2499, badge:'sale', sizes:['XS','S','M','L','XL'], desc:'A stunning floral midi dress perfect for day-to-night wear. Lightweight fabric with a flattering A-line cut.'},
  {id:2,  name:'Satin Slip Dress',          cat:'dress',     emoji:'✨', price:1599, old:2999, badge:'new',  sizes:['XS','S','M','L'],     desc:'Luxurious satin slip dress in an elevated cut. Perfect for special occasions or styled casually.'},
  {id:3,  name:'Oversized Crop Hoodie',     cat:'top',       emoji:'👚', price:899,  old:1599, badge:'hot',  sizes:['XS','S','M','L','XL'], desc:'Soft cotton oversized hoodie cropped for a trendy fit. A wardrobe essential all year round.'},
  {id:4,  name:'Wide Leg Denim Jeans',      cat:'jeans',     emoji:'👖', price:1199, old:1999, badge:'new',  sizes:['24','26','28','30','32'], desc:'High-waisted wide leg jeans in premium stretch denim. The ultimate vintage-inspired silhouette.'},
  {id:5,  name:'Faux Leather Biker Jacket', cat:'jacket',    emoji:'🧥', price:2499, old:4999, badge:'sale', sizes:['XS','S','M','L'],     desc:'Classic biker jacket in soft faux leather. Timeless, edgy, and endlessly versatile.'},
  {id:6,  name:'Block Heel Mule',           cat:'shoes',     emoji:'👠', price:1499, old:2299, badge:'new',  sizes:['36','37','38','39','40'], desc:'Chic block heel mule with a square toe. Dress up or down for the perfect everyday heel.'},
  {id:7,  name:'Mini Crossbody Bag',        cat:'accessory', emoji:'👜', price:799,  old:1299, badge:'hot',  sizes:['One Size'],            desc:'Compact yet roomy mini crossbody bag with gold hardware. Your perfect going-out companion.'},
  {id:8,  name:'Ribbed Co-ord Set',         cat:'top',       emoji:'🧣', price:1099, old:1799, badge:'sale', sizes:['XS','S','M','L','XL'], desc:'Matching ribbed two-piece set in soft stretch fabric. Mix and match or wear together for a put-together look.'},
  {id:9,  name:'Wrap Maxi Dress',           cat:'dress',     emoji:'🌺', price:1399, old:2199, badge:'new',  sizes:['XS','S','M','L'],     desc:'Flowy wrap maxi dress with a deep V-neckline and vibrant print. Made for sunshine and good vibes.'},
  {id:10, name:'High Rise Mom Jeans',       cat:'jeans',     emoji:'👔', price:1099, old:1799, badge:'hot',  sizes:['24','26','28','30','32'], desc:'High-rise mom jeans with a relaxed tapered fit. Vintage-inspired and effortlessly cool.'},
  {id:11, name:'Puff Sleeve Blouse',        cat:'top',       emoji:'👘', price:899,  old:1499, badge:'new',  sizes:['XS','S','M','L','XL'], desc:'Romantic puff sleeve blouse in silky fabric. The perfect top to elevate any outfit instantly.'},
  {id:12, name:'Platform Chunky Sneakers',  cat:'shoes',     emoji:'👟', price:1999, old:3499, badge:'sale', sizes:['36','37','38','39','40'], desc:'Bold platform sneakers that add instant height and edge to any outfit. Comfort meets cool.'},
  {id:13, name:'Pearl Hoop Earrings',       cat:'accessory', emoji:'💎', price:399,  old:699,  badge:'hot',  sizes:['One Size'],            desc:'Dainty pearl hoop earrings that go with literally everything. The ultimate everyday accessory.'},
  {id:14, name:'Trench Coat',              cat:'jacket',    emoji:'🥼', price:3299, old:5999, badge:'new',  sizes:['XS','S','M','L','XL'], desc:'Classic double-breasted trench coat in water-resistant fabric. A forever piece for your wardrobe.'},
  {id:15, name:'Ruched Mini Dress',        cat:'dress',     emoji:'🎀', price:1199, old:1999, badge:'sale', sizes:['XS','S','M','L'],     desc:'Figure-flattering ruched mini dress with adjustable tie straps. Perfect for every occasion.'},
  {id:16, name:'Bucket Hat',              cat:'accessory', emoji:'🎩', price:499,  old:899,  badge:'hot',  sizes:['One Size'],            desc:'Trendy bucket hat in soft cotton canvas. The must-have accessory to complete your streetwear look.'},
];

let cart = [];
let displayedCount = 8;
let currentFilter  = 'all';

/* =============================================
   RENDER PRODUCTS
   ============================================= */
function getFilteredProducts(filter) {
  return filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === filter);
}

function renderProducts(filter = 'all', count = 8) {
  const grid = document.getElementById('productGrid');
  const items = getFilteredProducts(filter).slice(0, count);
  if (!items.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#999">No products found.</div>`;
    return;
  }
  grid.innerHTML = items.map(p => {
    const disc = Math.round((1 - p.price / p.old) * 100);
    return `
    <div class="product-card" id="pc-${p.id}">
      <div class="product-thumb" style="background:${thumbBg(p.cat)}" onclick="openModal(${p.id})">
        ${p.emoji}
        <span class="product-badge badge-${p.badge}">${badgeLabel(p.badge)}</span>
        <button class="wishlist-btn" onclick="event.stopPropagation();toggleWish(this)" title="Wishlist">♡</button>
      </div>
      <div class="product-body">
        <div class="product-cat">${catLabel(p.cat)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">₹${p.price.toLocaleString()}</span>
          <span class="product-old">₹${p.old.toLocaleString()}</span>
          <span class="product-disc">${disc}% off</span>
        </div>
        <div class="product-sizes">
          ${p.sizes.slice(0,4).map(s => `<div class="size-dot">${s}</div>`).join('')}
          ${p.sizes.length > 4 ? `<div class="size-dot" style="background:#f0f0f0">+${p.sizes.length-4}</div>` : ''}
        </div>
        <button class="btn-add-cart" onclick="addToCart(${p.id})">Add to Bag</button>
      </div>
    </div>`;
  }).join('');
}

function thumbBg(cat) {
  const map = {
    dress:'linear-gradient(135deg,#fce4ec,#f8bbd0)',
    top:'linear-gradient(135deg,#e8f5e9,#c8e6c9)',
    jeans:'linear-gradient(135deg,#e3f2fd,#bbdefb)',
    jacket:'linear-gradient(135deg,#fff8e1,#ffecb3)',
    shoes:'linear-gradient(135deg,#fbe9e7,#ffccbc)',
    accessory:'linear-gradient(135deg,#ede7f6,#d1c4e9)',
  };
  return map[cat] || '#f8f8f8';
}
function badgeLabel(b) { return b==='sale'?'SALE':b==='new'?'NEW':b==='hot'?'HOT 🔥':b.toUpperCase(); }
function catLabel(c) {
  return {dress:'Dresses',top:'Tops',jeans:'Jeans',jacket:'Jackets',shoes:'Shoes',accessory:'Accessories'}[c]||c;
}

/* =============================================
   FILTER
   ============================================= */
function filterByTab(cat, el) {
  currentFilter = cat;
  displayedCount = 8;
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProducts(cat, displayedCount);
}
function filterByTag(cat) {
  currentFilter = cat;
  displayedCount = 8;
  document.querySelectorAll('.ftab').forEach(b => {
    b.classList.toggle('active', b.textContent.toLowerCase().startsWith(catLabel(cat).slice(0,3).toLowerCase()));
  });
  renderProducts(cat, displayedCount);
  document.getElementById('new-in').scrollIntoView({ behavior: 'smooth' });
}
function filterProducts(query) {
  const q = query.toLowerCase();
  const grid = document.getElementById('productGrid');
  const items = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) || catLabel(p.cat).toLowerCase().includes(q)
  );
  if (!items.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#999">No results for "${query}"</div>`;
    return;
  }
  grid.innerHTML = items.map(p => {
    const disc = Math.round((1 - p.price / p.old) * 100);
    return `
    <div class="product-card">
      <div class="product-thumb" style="background:${thumbBg(p.cat)}" onclick="openModal(${p.id})">
        ${p.emoji}
        <span class="product-badge badge-${p.badge}">${badgeLabel(p.badge)}</span>
        <button class="wishlist-btn" onclick="event.stopPropagation();toggleWish(this)">♡</button>
      </div>
      <div class="product-body">
        <div class="product-cat">${catLabel(p.cat)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">₹${p.price.toLocaleString()}</span>
          <span class="product-old">₹${p.old.toLocaleString()}</span>
          <span class="product-disc">${disc}% off</span>
        </div>
        <button class="btn-add-cart" onclick="addToCart(${p.id})">Add to Bag</button>
      </div>
    </div>`;
  }).join('');
  document.getElementById('new-in').scrollIntoView({ behavior: 'smooth' });
}
function loadMore() {
  displayedCount += 4;
  renderProducts(currentFilter, displayedCount);
}

/* =============================================
   WISHLIST TOGGLE
   ============================================= */
function toggleWish(btn) {
  btn.classList.toggle('wishlisted');
  btn.textContent = btn.classList.contains('wishlisted') ? '♥' : '♡';
  showToast(btn.classList.contains('wishlisted') ? '❤️ Added to Wishlist' : '🤍 Removed from Wishlist');
}

/* =============================================
   QUICK VIEW MODAL
   ============================================= */
let selectedSize = '';
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  selectedSize = p.sizes[0];
  const disc = Math.round((1 - p.price / p.old) * 100);
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-thumb" style="background:${thumbBg(p.cat)}">${p.emoji}</div>
    <div class="modal-info">
      <div class="modal-cat">${catLabel(p.cat)}</div>
      <div class="modal-name">${p.name}</div>
      <div class="modal-price-row">
        <span class="modal-price">₹${p.price.toLocaleString()}</span>
        <span class="modal-old">₹${p.old.toLocaleString()}</span>
        <span class="modal-disc">${disc}% OFF</span>
      </div>
      <div class="modal-section-label">Select Size</div>
      <div class="modal-sizes">
        ${p.sizes.map((s,i) => `
          <button class="modal-size-btn ${i===0?'active':''}" onclick="pickSize(this,'${s}')">${s}</button>
        `).join('')}
      </div>
      <div class="modal-desc">${p.desc}</div>
      <button class="modal-add-btn" onclick="addToCartModal(${p.id})">Add to Bag →</button>
    </div>`;
  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function pickSize(btn, size) {
  document.querySelectorAll('.modal-size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = size;
}
function addToCartModal(id) {
  addToCart(id);
  closeModal();
}
function closeModal() {
  document.getElementById('modalBg').classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   CART
   ============================================= */
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...p, qty: 1 });
  }
  updateCart();
  showToast(`✅ ${p.name} added to bag!`);
}
function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}
function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCart();
}
function updateCart() {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count  = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartItemCount').textContent = count;
  document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString();

  const empty   = document.getElementById('cartEmpty');
  const wrap    = document.getElementById('cartItemsWrap');
  const footer  = document.getElementById('cartFooter');

  if (!cart.length) {
    empty.style.display = 'block';
    wrap.innerHTML = '';
    footer.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  footer.style.display = 'block';
  wrap.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="ci-thumb" style="background:${thumbBg(c.cat)}">${c.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${c.name}</div>
        <div class="ci-size">Size: ${c.sizes ? c.sizes[0] : 'M'}</div>
        <div class="ci-bottom">
          <span class="ci-price">₹${(c.price * c.qty).toLocaleString()}</span>
          <div class="ci-qty">
            <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty(${c.id},+1)">+</button>
          </div>
        </div>
        <div class="ci-remove" onclick="removeFromCart(${c.id})">Remove</div>
      </div>
    </div>`).join('');
}
function toggleCart() {
  const s = document.getElementById('cartSidebar');
  const o = document.getElementById('cartOverlay');
  const open = s.classList.toggle('open');
  o.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function checkout() {
  if (!cart.length) { showToast('❗ Your bag is empty!'); return; }
  showToast('🎉 Order placed! Thank you for shopping with Savana.');
  cart = [];
  updateCart();
  toggleCart();
}

/* =============================================
   SEARCH
   ============================================= */
function toggleSearch() {
  const w = document.getElementById('searchWrap');
  const open = w.classList.toggle('open');
  if (open) document.getElementById('searchInput').focus();
  else { document.getElementById('searchInput').value = ''; renderProducts(currentFilter, displayedCount); }
}

/* =============================================
   MOBILE MENU
   ============================================= */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('menuOverlay').classList.toggle('open');
}

/* =============================================
   NEWSLETTER
   ============================================= */
function subscribeNL() {
  const val = document.getElementById('nlEmail').value.trim();
  if (!val || !val.includes('@')) { showToast('⚠️ Enter a valid email address'); return; }
  document.getElementById('nlSuccess').classList.remove('hidden');
  document.getElementById('nlEmail').value = '';
  showToast('🎉 Welcome to the #SavanaSquad!');
}

/* =============================================
   TOAST
   ============================================= */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* =============================================
   BACK TO TOP
   ============================================= */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backTop');
  btn.classList.toggle('show', window.scrollY > 500);
  const nb = document.getElementById('navbar');
  nb.style.boxShadow = window.scrollY > 60 ? '0 2px 20px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)';
});

/* =============================================
   INIT
   ============================================= */
renderProducts('all', 8);
