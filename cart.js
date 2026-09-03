/* 비회원 장바구니: 제품 ID와 수량만 localStorage에 저장합니다. */
(function () {
  "use strict";
  const KEY = "seolbaek_cart_v1";
  const MAX_QTY = 99;

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(value)) return [];
      return value.map((item) => ({ id: String(item.id || ""), qty: Math.min(MAX_QTY, Math.max(1, Number(item.qty) || 1)) }))
        .filter((item) => item.id);
    } catch (_) { return []; }
  }
  function write(items) {
    const clean = items.filter((item) => item && item.id && item.qty > 0).map((item) => ({ id: String(item.id), qty: Math.min(MAX_QTY, Math.max(1, Number(item.qty) || 1)) }));
    try { localStorage.setItem(KEY, JSON.stringify(clean)); } catch (_) { /* 저장할 수 없는 환경에서도 화면은 계속 작동합니다. */ }
    updateBadges(clean);
    window.dispatchEvent(new CustomEvent("seolbaek:cart", { detail: { items: clean } }));
    return clean;
  }
  function total(items = read()) { return items.reduce((sum, item) => sum + item.qty, 0); }
  function add(id) {
    const items = read();
    const found = items.find((item) => item.id === String(id));
    if (found) found.qty = Math.min(MAX_QTY, found.qty + 1);
    else items.push({ id: String(id), qty: 1 });
    return write(items);
  }
  function update(id, qty) {
    const items = read();
    const found = items.find((item) => item.id === String(id));
    if (found) found.qty = Math.min(MAX_QTY, Math.max(1, Number(qty) || 1));
    return write(items);
  }
  function remove(id) { return write(read().filter((item) => item.id !== String(id))); }
  function clear() { return write([]); }

  function updateBadges(items = read()) {
    const count = total(items);
    document.querySelectorAll("[data-cart-count]").forEach((node) => { node.textContent = count > 0 ? "(" + count + ")" : ""; });
    document.querySelectorAll("[data-cart-link]").forEach((link) => {
      let countNode = link.querySelector("[data-cart-count]");
      if (!countNode) { countNode = document.createElement("span"); countNode.dataset.cartCount = ""; link.appendChild(countNode); }
      countNode.textContent = count > 0 ? "(" + count + ")" : "";
      const text = link.querySelector("[data-i18n='cart.label']");
      const displayLabel = document.documentElement.lang === "en" ? "BAG" : "장바구니";
      if (text) text.textContent = displayLabel;
      link.setAttribute("aria-label", displayLabel);
    });
  }

  function feedback(button) {
    let note = button.parentElement.querySelector("[data-cart-feedback]");
    if (!note) { note = document.createElement("span"); note.dataset.cartFeedback = ""; note.className = "cart-feedback"; button.parentElement.appendChild(note); }
    note.textContent = document.documentElement.lang === "en" ? "Added to cart." : "장바구니에 담았습니다.";
    window.setTimeout(() => { note.textContent = ""; }, 2200);
  }

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-cart-add]");
    if (addButton) { add(addButton.dataset.cartAdd); feedback(addButton); return; }
    const action = event.target.closest("[data-cart-action]");
    if (!action) return;
    const id = action.dataset.cartId;
    const item = read().find((entry) => entry.id === id);
    if (!item) return;
    if (action.dataset.cartAction === "increase") update(id, item.qty + 1);
    if (action.dataset.cartAction === "decrease") update(id, item.qty - 1);
    if (action.dataset.cartAction === "remove") remove(id);
  });
  window.addEventListener("storage", (event) => { if (event.key === KEY) { updateBadges(); window.dispatchEvent(new CustomEvent("seolbaek:cart")); } });
  window.addEventListener("seolbaek:language", () => updateBadges());
  // 장바구니 링크는 각 헤더의 nav-menu에 정적으로 포함되어 있습니다.
  updateBadges();
  window.SeolbaekCart = { KEY, read, write, add, update, remove, clear, total, updateBadges };
  if (document.body.classList.contains("cart-page")) {
    const root = document.getElementById("cartContent");
    const esc = (value) => window.ProductCatalog.escapeHtml(value == null ? "" : String(value));
    const renderCart = (products) => { const raw = Array.isArray(products) ? products : []; const originals = new Map(raw.map((p) => [String(p.id), p])); const presets = window.SeolbaekProductPresets ? window.SeolbaekProductPresets.apply(raw) : raw; const source = presets.map((p) => ({ ...p, price: originals.get(String(p.id))?.price || p.price || "" })); const map = new Map(source.map((p) => [String(p.id), p])); const original = read(); const valid = original.filter((item) => map.has(item.id)); if (valid.length !== original.length) write(valid); if (!valid.length) { root.innerHTML = '<div class="cart-empty"><p>아직 담긴 제품이 없습니다.</p><a class="cart-browse-link" href="products.html">제품 둘러보기 →</a></div>'; return; } const rows = valid.map((item) => { const p = map.get(item.id); const image = p.images && p.images[0] ? window.ProductCatalog.safeImageUrl(p.images[0]) : ""; const visual = image ? '<img src="' + esc(image) + '" alt="' + esc(p.name) + '" loading="lazy">' : '<div class="cart-image-placeholder">PRODUCT IMAGE<br>TO BE PROVIDED</div>'; return '<article class="cart-row"><a class="cart-visual" href="product.html?id=' + encodeURIComponent(p.id) + '">' + visual + '</a><div class="cart-row-info"><p class="look-meta">' + esc(/accessor|jewelry|장신구|액세서리/i.test([p.label, p.category, ...(p.keywords || [])].join(" ")) ? "장신구" : "의상") + '</p><h2>' + esc(p.name) + '</h2><p class="cart-price">' + (Number(p.price) > 0 ? Number(p.price).toLocaleString("ko-KR") + "원" : "가격 준비 중") + '</p><div class="cart-quantity"><button type="button" data-cart-action="decrease" data-cart-id="' + esc(p.id) + '">−</button><strong>' + item.qty + '</strong><button type="button" data-cart-action="increase" data-cart-id="' + esc(p.id) + '">＋</button></div><button class="cart-remove" type="button" data-cart-action="remove" data-cart-id="' + esc(p.id) + '">삭제</button></div></article>'; }).join(""); const prices = valid.map((item) => Number(map.get(item.id).price)); const hasTotal = prices.every((price) => Number.isFinite(price) && price > 0); const totalPrice = prices.reduce((sum, price, index) => sum + price * valid[index].qty, 0); root.innerHTML = '<div class="cart-list">' + rows + '</div><div class="cart-tools"><a class="btn ghost" href="products.html">제품 더 둘러보기</a><button class="btn ghost" type="button" data-cart-clear>장바구니 전체 비우기</button></div>' + (hasTotal ? '<p class="cart-total">총 금액 <strong>' + totalPrice.toLocaleString("ko-KR") + '원</strong></p>' : ""); };
    const loadCart = () => window.ProductCatalog.loadVisibleProducts().then(renderCart).catch(() => { root.innerHTML = '<p class="cart-error">제품 정보를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>'; });
    document.addEventListener("click", (event) => { if (event.target.closest("[data-cart-clear]")) { clear(); loadCart(); } }); window.addEventListener("seolbaek:cart", loadCart); loadCart();
  }
})();
