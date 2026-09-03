// 모바일 메뉴를 열고 닫습니다.
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "메뉴 열기");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menu.classList.contains("open")) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  });
}

// 화면 안으로 들어온 문장을 한 겹씩 천천히 보여줍니다.
window.SeolbaekReveal = function setupReveal() {
  const items = document.querySelectorAll(".reveal-on-scroll:not([data-reveal-ready])");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

  items.forEach((item) => {
    item.dataset.revealReady = "true";
    observer.observe(item);
  });
};

window.SeolbaekReveal();

// 공개 페이지의 공통 언어와 UI 문구입니다. 운영 제품 데이터는 번역하거나 변경하지 않습니다.
const SEOLBAEK_TRANSLATIONS = {
  en: {
    "nav.home": "Home", "nav.collection": "Products", "nav.about": "About Seolbaek", "nav.journal": "Journal", "nav.contact": "Contact",
    "intro.open": "Open the fabric layer and view products", "intro.main": "Today, placed upon Seolbaek's palette", "intro.slogan": "Quiet as snow, vivid as today.",
    "category.clothing": "Clothing", "category.accessories": "Accessories", "category.rental": "Rental", "category.story": "Our Story",
    "category.clothingBody": "Hanbok made to layer naturally over the clothes of today.", "category.accessoriesBody": "Official images and product information will be added when ready.", "category.rentalBody": "Please ask us about schedules and rental conditions.",
    "home.collectionTitle": "The clothes speak first —<br>2026 Collection", "home.collectionBody": "Light passing through organza, weightless pleats and draping. Meet the first four looks of Seolbaek.", "home.viewCollection": "View full collection",
    "home.categoryTitle": "Choose how to wear", "home.originTitle": "A memory of white clothes,<br>a new canvas", "home.originBody": "The identity of the people in white meets the blank canvas where every creation begins. Seolbaek started at this crossing.", "home.readStory": "Read our story",
    "home.craftTitle": "Rough alleys,<br>gentle hands", "home.craftBody": "Old surfaces of Jungchon-dong, the low sheen of needles and sewing machines, and light fabric resting above. We focus on the process and traces of the hands we worked with.", "home.viewCraft": "View the making story",
    "home.inquiryTitle": "Purchase and rental,<br>guided with care.", "home.inquiryButton": "Write an inquiry",
    "placeholder.craft": "Studio and artisan photo placeholder", "placeholder.instagram": "The official Instagram address and images will be linked here when available.", "footer.pending": "Business information and official contact details will be added after confirmation.",
    "catalog.pending": "Product name and images awaiting admin update", "catalog.imagePending": "PRODUCT IMAGE<br>TO BE PROVIDED", "catalog.loadError": "We could not load the collection.",
    "collection.kicker": "A first season focused on clothes and fabric", "collection.body": "Meet four looks through light passing across sheer fabric, weightless pleats and layering.", "collection.note": "Actual 2026 product photos will be replaced once provided. Price, composition, stock and rental terms appear only when entered by the brand manager.", "filter.all": "All",
    "about.hero": "Hanbok is not clothing held still.", "about.heroNote": "From a preserved object<br>to clothing alive in the present.", "about.breatheTitle": "Hanbok drawn<br>naturally from your wardrobe.", "about.breatheBody": "It does not wait for a special day. Layered over shirts and denim, it creates a new gesture in an ordinary day.", "about.layerTitle": "The moment tradition<br>and the present overlap.", "about.layerBody": "Rather than reproducing the past, we let it change as it meets the senses of now. For Seolbaek, tradition remains a moving material.",
    "about.nameTitle": "Where two meanings<br>of white meet", "about.whitePeople": "The people in white", "about.whitePeopleBody": "A memory of white clothing that carries Korean identity.", "about.canvas": "A white canvas", "about.canvasBody": "The open space where every creation and today's colors begin.", "about.softTitle": "The Soft Bite", "about.softBody1": "The rough surfaces of old Jungchon-dong alleys, the metal sense of needles and sewing machines, and soft fabric settling above them.", "about.softBody2": "Rather than claim an unconfirmed future of collaboration, we record the process made together now and the artisan's touch.", "about.philosophy": "Not preservation, but breath<br><span>Korea living again inside the clothes.</span>", "about.viewSeason": "Meet Season 01",
    "contact.title": "Contact", "contact.subtitle": "Leave the details needed for a purchase or rental inquiry.", "contact.guideTitle": "Online sending is being prepared.", "contact.guideBody": "This form does not send data to a server. The button only copies your inquiry; it will be connected to the official channel once provided.", "contact.pending": "Awaiting brand manager input", "contact.notSent": "This form is not currently submitted. Please read the notice before entering personal information.",
    "form.name": "Name", "form.contact": "Contact", "form.type": "Inquiry type", "form.product": "Preferred product", "form.size": "Preferred size", "form.date": "Rental date", "form.message": "Message", "form.select": "Please select", "form.buyClothing": "Purchase clothing", "form.buyAccessories": "Purchase accessories", "form.rentClothing": "Rent clothing", "form.other": "Other inquiry", "form.productPlaceholder": "Product name or LOOK number", "form.sizePlaceholder": "Enter only a confirmed size",
    "journal.title": "Journal", "journal.subtitle": "Notes on clothing, fabric and the work of Seolbaek.", "product.back": "← Back to collection",
    "contact.copy": "Copy inquiry", "contact.copied": "Your inquiry was copied. It has not been sent.", "contact.copyFailed": "Copy failed. Please select and copy the text manually."
  }
};

function currentLanguage() {
  return document.documentElement.lang === "en" ? "en" : "ko";
}

function translate(key, fallback) {
  return SEOLBAEK_TRANSLATIONS[currentLanguage()]?.[key] || fallback;
}

function applyLanguage(language) {
  const nextLanguage = language === "en" ? "en" : "ko";
  document.documentElement.lang = nextLanguage;
  localStorage.setItem("seolbaek-language", nextLanguage);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (!element.dataset.i18nKo) element.dataset.i18nKo = element.innerHTML;
    element.innerHTML = nextLanguage === "en"
      ? (SEOLBAEK_TRANSLATIONS.en[element.dataset.i18n] || element.dataset.i18nKo)
      : element.dataset.i18nKo;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    if (!element.dataset.i18nPlaceholderKo) element.dataset.i18nPlaceholderKo = element.getAttribute("placeholder") || "";
    element.setAttribute("placeholder", nextLanguage === "en"
      ? (SEOLBAEK_TRANSLATIONS.en[element.dataset.i18nPlaceholder] || element.dataset.i18nPlaceholderKo)
      : element.dataset.i18nPlaceholderKo);
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === nextLanguage));
  });
  window.dispatchEvent(new CustomEvent("seolbaek:language", { detail: { language: nextLanguage } }));
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});
applyLanguage(localStorage.getItem("seolbaek-language") || "ko");

// 실제 2026 제품 사진이 확인되기 전에는 기존 샘플을 노출하지 않습니다.
// 사진 반영이 끝나면 아래 값을 true로 바꾸면 관리자 images 필드가 자동으로 표시됩니다.
const PRODUCT_PHOTOS_READY = false;
const COMMERCE_READY = false;

// 실제 운영 JSON은 관리자가 수정하므로 공개 화면에서만 임시 제품 프리셋을 입힙니다.
const SEOLBAEK_PRODUCT_PRESETS = [
  { id: "look-01", label: "PURCHASE · CLOTHING", name: "조각보 원피스", summary: "위빙 처리와 살랑거리는 원단", category: "clothing", keywords: ["소재: 오간자", "원단 디테일: 위빙 처리와 살랑거리는 원단", "사이즈: 44/55 방향", "구매·대여: 구매" ] },
  { id: "look-02", label: "PURCHASE · CLOTHING", name: "능소화 원피스", summary: "둥글게 자른 원단에 주름을 잡아 만든 꽃잎 디테일", category: "clothing", keywords: ["소재: 준비 중", "원단 디테일: 둥근 컷과 주름 꽃잎", "사이즈: 44/55 방향", "구매·대여: 구매" ] },
  { id: "look-03", label: "PURCHASE · CLOTHING", name: "윤슬 투피스", summary: "유등천 물결이 흐르는 듯한 표현", category: "clothing", keywords: ["소재: 준비 중", "원단 디테일: 유등천 물결 표현", "사이즈: 44/55 방향", "구매·대여: 구매" ] },
  { id: "seolbaek-bamboo", label: "RENTAL · CLOTHING", name: "대나무 두루마기", summary: "옆쪽 연두색 디테일", category: "rental", keywords: ["소재: 준비 중", "원단 디테일: 옆쪽 연두색 디테일", "사이즈: 코르셋 또는 지퍼 조절", "구매·대여: 대여" ], published: true, featured: true }
];

function applyProductPresets(products) {
  const source = Array.isArray(products) ? products : [];
  return SEOLBAEK_PRODUCT_PRESETS.map((preset) => {
    const original = source.find((item) => item.id === preset.id) || {};
    return { ...original, ...preset, images: [], sections: original.sections || [], price: "", buyLink: "", buyNotice: "" };
  });
}
window.SeolbaekProductPresets = { apply: applyProductPresets };

function placeholderMarkup(index, compact, product) {
  const number = String(index + 1).padStart(2, "0");
  const name = product?.name || "LOOK " + number;
  const summary = product?.summary || translate("catalog.pending", "제품명·상세 정보 관리자 입력 대기");
  const label = product?.label || "SEASON 01 / 2026";
  return '<article class="lookbook-card is-placeholder reveal-on-scroll">' +
    '<div class="lookbook-image"><span class="look-index">LOOK ' + number + '</span><div class="placeholder-lines" aria-hidden="true"><i></i><i></i><i></i></div><p>' +
    translate("catalog.imagePending", "제품 이미지<br>교체 예정") + '</p></div>' +
    '<div class="lookbook-copy"><p class="look-meta">' + label + '</p><h3>' + name + '</h3><p>' + summary + '</p>' +
    (product ? '<a class="line-link" href="product.html?id=' + encodeURIComponent(product.id) + '">상세 보기 <b aria-hidden="true">↗</b></a>' : '') +
    (compact ? '' : '<div class="detail-placeholder-row"><span>FABRIC</span><span>DETAIL</span><span>NATURE</span></div>') + '</div></article>';
}

function productCardMarkup(product, index) {
  const escape = window.ProductCatalog.escapeHtml;
  const image = PRODUCT_PHOTOS_READY && window.ProductCatalog.safeImageUrl(product.images && product.images[0]);
  const imageMarkup = image
    ? '<img src="' + escape(image) + '" alt="' + escape(product.name || "") + '" loading="lazy" onerror="this.remove()">'
    : '<div class="placeholder-lines" aria-hidden="true"><i></i><i></i><i></i></div><p>' + translate("catalog.imagePending", "제품 이미지<br>교체 예정") + '</p>';
  return '<a class="lookbook-card reveal-on-scroll" href="product.html?id=' + encodeURIComponent(product.id) + '">' +
    '<div class="lookbook-image">' + imageMarkup + '<span class="look-index">LOOK ' + String(index + 1).padStart(2, "0") + '</span></div>' +
    '<div class="lookbook-copy"><p class="look-meta">' + escape(product.label || product.category || "SEASON 01") + '</p><h3>' + escape(product.name || "LOOK") + '</h3><p>' + escape(product.summary || translate("catalog.pending", "상세 정보 관리자 입력 대기")) + '</p>' +
    '<div class="detail-placeholder-row"><span>FABRIC</span><span>DETAIL</span><span>NATURE</span></div></div></a>';
}

window.SeolbaekUI = {
  photosReady: PRODUCT_PHOTOS_READY,
  commerceReady: COMMERCE_READY,
  translate,
  renderProductSlots(products, slotCount, options = {}) {
    // 홈은 실제 시즌 사진이 준비될 때까지 네 개의 교체 슬롯을 명확히 보여줍니다.
    const items = Array.isArray(products) ? products.slice(0, slotCount) : [];
    return Array.from({ length: slotCount }, (_, index) => items[index] && PRODUCT_PHOTOS_READY ? productCardMarkup(items[index], index) : placeholderMarkup(index, options.compact, items[index])).join("");
  },
  renderCatalog(products) {
    if (!PRODUCT_PHOTOS_READY) return (Array.isArray(products) ? products : []).map((product, index) => placeholderMarkup(index, false, product)).join("") || placeholderMarkup(0, false);
    return (Array.isArray(products) ? products : []).map(productCardMarkup).join("") || placeholderMarkup(0, false);
  },
  catalogMessage(type) {
    return '<p class="catalog-empty">' + (type === "loadError" ? translate("catalog.loadError", "컬렉션을 불러오지 못했습니다.") : translate("catalog.pending", "제품 정보를 준비하고 있습니다.")) + '</p>';
  }
};

// 첫 화면 오간자 레이어: 포인터에는 아주 작게 반응하고 클릭·키보드로 열립니다.
const intro = document.querySelector("[data-organza-intro]");
const introButton = document.querySelector("[data-organza-open]");
if (intro && introButton) {
  function openIntro() {
    intro.classList.add("is-open");
    introButton.setAttribute("aria-expanded", "true");
    window.location.href = "products.html";
  }
  introButton.addEventListener("click", openIntro);
}

// 홈은 브랜드 소개 뒤에 중촌동 제작 이야기가 오도록 유지하고 보조 인스타그램 영역은 숨깁니다.
if (document.body.classList.contains("home-page")) {
  document.querySelector(".instagram-section")?.setAttribute("hidden", "");
}

// 문의 폼은 백엔드가 없어 전송하지 않고, 사용자가 작성한 내용을 복사만 합니다.
const inquiryForm = document.getElementById("inquiryForm");
if (inquiryForm) {
  const requestedProduct = new URLSearchParams(location.search).get("product");
  const productField = inquiryForm.elements.namedItem("희망 제품");
  if (requestedProduct && productField) productField.value = requestedProduct;
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const summary = Array.from(data.entries()).map(([key, value]) => key + ": " + value).join("\n");
    const status = document.getElementById("inquiryStatus");
    try {
      await navigator.clipboard.writeText(summary);
      status.textContent = translate("contact.copied", "문의 내용이 복사되었습니다. 실제 전송은 되지 않았습니다.");
    } catch (_) {
      status.textContent = translate("contact.copyFailed", "복사하지 못했습니다. 입력 내용을 직접 선택해 복사해 주세요.");
    }
    status.focus();
  });
}
