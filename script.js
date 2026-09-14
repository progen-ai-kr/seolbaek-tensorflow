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
    "nav.home": "Home", "nav.collection": "Products", "nav.about": "About Seolbaek", "nav.journal": "Journal", "nav.portfolio": "PORTFOLIO", "nav.contact": "Contact", "cart.label": "CART", "cart.title": "Cart",
    "intro.open": "Open the fabric to view products", "intro.collectionButton": "View collection", "intro.main": "Modern life on Seolbaek's palette", "intro.slogan": "Quiet as snow, vivid as today.",
    "category.clothing": "Clothing", "category.accessories": "Accessories", "category.rental": "Rental", "category.story": "Our Story", "category.purchase": "Purchase", "category.purchaseBody": "Choose clothing and accessories.",
    "category.clothingBody": "Hanbok made to layer naturally over the clothes of today.", "category.accessoriesBody": "Official images and product information will be added when ready.", "category.rentalBody": "Please ask us about schedules and rental conditions.",
    "home.collectionTitle": "Seolbaek’s<br>First Collection", "home.collectionBody": "The 2026 series woven from five seasonal colors", "home.viewCollection": "View full collection",
    "home.categoryTitle": "Choose how to wear", "home.originTitle": "A memory of white clothes,<br>a new canvas", "home.originBody": "The identity of the people in white meets the blank canvas where every creation begins. Seolbaek started at this crossing.", "home.readStory": "Read our story",
    "home.craftTitle": "Rough alleys,<br>gentle hands", "home.craftBody": "Old surfaces of Jungchon-dong, the low sheen of needles and sewing machines, and light fabric resting above.", "home.viewCraft": "View the making story",
    "home.inquiryTitle": "Purchase and rental,<br>guided for you.", "home.inquiryButton": "Write an inquiry",
    "placeholder.craft": "Studio and artisan photo placeholder", "placeholder.instagram": "The official Instagram address and images will be linked here when available.", "footer.pending": "Business information and official contact details will be added after confirmation.",
    "catalog.pending": "Product name and images awaiting admin update", "catalog.imagePending": "PRODUCT IMAGE<br>TO BE PROVIDED", "catalog.loadError": "We could not load the collection.",
    "collection.kicker": "A first season focused on clothes and fabric", "collection.body": "Meet four looks through light passing across sheer fabric, weightless pleats and layering.", "collection.note": "Actual 2026 product photos will be replaced once provided. Price, composition, stock and rental terms appear only when entered by the brand manager.", "filter.all": "All",
    "about.hero": "Hanbok is not clothing held still.", "about.heroNote": "From a preserved object<br>to clothing alive in the present.", "about.breatheTitle": "Hanbok drawn<br>naturally from your wardrobe.", "about.breatheBody": "It does not wait for a special day. Layered over shirts and denim, it creates a new gesture in an ordinary day.", "about.layerTitle": "The moment tradition<br>and the present overlap.", "about.layerBody": "Rather than reproducing the past, we let it change as it meets the senses of now. For Seolbaek, tradition remains a moving material.",
    "about.beginningTitle": "Seolbaek's beginning", "about.beginningBody1": "We began by imagining the everyday act of taking hanbok from the wardrobe and layering it with today's clothes.", "about.beginningBody2": "We propose hanbok as clothing for living today, rather than as an object preserved in the past.", "about.value1Title": "Beauty beyond boundaries", "about.value1Body": "We break down the boundary between tradition and modernity to make clothes for everyday life, beyond ceremonial dress for special occasions.", "about.value2Title": "Korean beauty, in today's language", "about.value2Body": "We translate Korea's visual heritage into contemporary design and make it live again as clothing for today.", "about.value3Title": "The spirit of Jungchon", "about.value3Body": "We bring together the tailoring skills of Jungchon artisans and the beauty Seolbaek discovers in the neighborhood.", "about.whiteConnection": "Where the memory of white clothes meets creative space: <span>白</span>", "about.beautyTitle": "Korean beauty<br>in today's clothes", "about.beautyBody1": "We translate Korea's visual heritage—bojagi patchwork, the spreading wash of ink painting, and embroidered motifs of flowers and bamboo—into the language of contemporary dress.", "about.beautyBody2": "Rather than reproduce tradition, we remake it as beauty that can be worn naturally in everyday life.", "about.paletteTitle": "Seolbaek's five colors", "about.pitchBrand": "Seolbaek (&#x96EA;&#x767D;) returns hanbok to the clothes of today. Rather than preserving tradition, we let it live naturally in everyday life.", "about.pitchExperience": "Touch the fabric, wear it on the skin, and walk through Jungchon's light and wind. Seolbaek is a brand remembered through the senses.", "about.pitchWhy": "Jungchon's Soft Bite - the moment soft fabric is refined in rough, living alleys. That is why Seolbaek belongs in Jungchon.", "about.pitchSignoff": "Modern life<br />on Seolbaek's palette", "about.pitchMeta": "&#x96EA;&#x767D; &middot; Democratizing Hanbok &middot; DEMOCRATIZING HANBOK &middot; 2026",  "about.paletteNote": "Seolbaek and Deep Blue interpret Yudeungcheon's shimmer and the spreading wash of ink-and-color painting through draping. Ink and Chun Willow Green continue into bamboo-inspired durumagi and pleats.", "about.palette1": "The quiet ground where every story begins.", "about.palette2": "The color of Jungchon brick houses and the form of trumpet flowers.", "about.palette3": "A color that shapes Jungchon's landscape with vermilion.", "about.palette4": "The depth of a durumagi inspired by bamboo.", "about.palette5": "Bojagi patchwork, an organza paneled skirt, and the light of shimmering water.", "about.softAesthetic": "Seolbaek's aesthetic", "about.softHeading": "The Soft Bite", "about.softCallout": "The moment rough, living things are gently refined—that is how Seolbaek connects with Jungchon.", "about.experience1Title": "Meet it by hand", "about.experience1Body": "Before dressing, meet the fabric's sensation with your fingertips.", "about.experience2Title": "Experience it on skin", "about.experience2Body": "Try it on and feel how it rests on the body.", "about.experience3Title": "Remember it in light and wind", "about.experience3Body": "Walk through Jungchon's light and wind, carrying Seolbaek's sensation with you.", "about.lightTitle": "Light glimpsed<br>through the fabric", "about.lightBody": "Seolbaek's ‘볕뉘’ is a brief light slipping through a gap in the fabric. Like a moment neither fully open nor closed, organza holds light, layers softly and changes expression as it moves.",
    "about.nameTitle": "Where two meanings<br>of white meet", "about.whitePeople": "The people in white", "about.whitePeopleBody": "A memory of white clothing that carries Korean identity.", "about.canvas": "A white canvas", "about.canvasBody": "The open space where every creation and today's colors begin.", "about.softTitle": "The Soft Bite", "about.softBody1": "The rough surfaces of old Jungchon-dong alleys, the metal sense of needles and sewing machines, and soft fabric settling above them.", "about.softBody2": "We record moments where rough alleys and soft fabric, local hands and new sensibilities live together.", "about.philosophy": "Not preservation, but breath<br><span>Korea living again inside the clothes.</span>", "about.viewSeason": "SEOLBAEK COLLECTION",
    "contact.title": "Contact", "contact.subtitle": "Leave the details needed for a purchase or rental inquiry.", "contact.guideTitle": "Online sending is being prepared.", "contact.guideBody": "This form does not send data to a server. The button only copies your inquiry; it will be connected to the official channel once provided.", "contact.pending": "Awaiting brand manager input", "contact.notSent": "This form is not currently submitted. Please read the notice before entering personal information.",
    "form.name": "Name", "form.contact": "Contact", "form.type": "Inquiry type", "form.product": "Preferred product", "form.size": "Preferred size", "form.date": "Rental date", "form.message": "Message", "form.select": "Please select", "form.buyClothing": "Purchase clothing", "form.buyAccessories": "Purchase accessories", "form.rentClothing": "Rent clothing", "form.other": "Other inquiry", "form.productPlaceholder": "Product name or LOOK number", "form.sizePlaceholder": "Enter only a confirmed size",
    "journal.title": "Portfolio", "journal.subtitle": "Notes on clothing, fabric and the work of Seolbaek.", "product.back": "← Back to collection",
    "contact.copy": "Copy inquiry", "contact.copied": "Your inquiry was copied. It has not been sent.", "contact.copyFailed": "Copy failed. Please select and copy the text manually.", "product.detail": "View details"
  }
};

function currentLanguage() {
  return document.documentElement.lang === "en" ? "en" : "ko";
}

function translate(key, fallback) {
  return SEOLBAEK_TRANSLATIONS[currentLanguage()]?.[key] || fallback;
}

// About 페이지에 남아 있는 짧은 표기와 캡션도 영어 전환에 포함합니다.
const ABOUT_STATIC_EN = {
  "설백(雪白)은 한복을 지금의 옷으로 되돌리는 브랜드다. 전통을 보존하는 것이 아닌, 오늘의 삶 안에서 자연스럽게 존재하게 한다.": "Seolbaek (雪白) returns hanbok to the clothes of today. Rather than preserving tradition, we let it live naturally in everyday life.",
  "손끝으로 원단을 만지고, 피부로 입고, 중촌동 골목의 빛과 바람 속을 걷는다. 설백은 감각으로 기억되는 브랜드다.": "Touch the fabric, wear it on the skin, and walk through Jungchon's light and wind. Seolbaek is a brand remembered through the senses.",
  "중촌동의 ‘부드러운 쇠 맛’ — 거칠고 살아있는 골목에서 부드러운 원단이 다듬어지는 그 순간. 그것이 설백이 중촌동에 있어야 하는 이유다.": "Jungchon's Soft Bite—the moment soft fabric is refined in rough, living alleys. That is why Seolbaek belongs in Jungchon.",
  "설백의 팔레트 위에": "Modern life on Seolbaek's palette", "현대의 우리를 담다": "", "한복의 대중화": "Democratizing Hanbok",
  "설백(雪白)은 한복을 지금의 옷으로 되돌리는 브랜드다. 전통을 보존하는 것이 아닌, 오늘의 삶 안에서 자연스럽게 존재하게 한다.": "Seolbaek (雪白) returns hanbok to the clothes of today. Rather than preserving tradition, we let it live naturally in everyday life.",
  "손끝으로 원단을 만지고, 피부로 입고, 중촌동 골목의 빛과 바람 속을 걷는다. 설백은 감각으로 기억되는 브랜드다.": "Touch the fabric, wear it on the skin, and walk through the light and wind of Jungchon. Seolbaek is a brand remembered through the senses.",
  "중촌동의 ‘부드러운 쇠 맛’ — 거칠고 살아있는 골목에서 부드러운 원단이 다듬어지는 그 순간. 그것이 설백이 중촌동에 있어야 하는 이유다.": "Jungchon's Soft Bite—the moment soft fabric is refined in rough, living alleys. That is why Seolbaek belongs in Jungchon.",
  "설백의 팔레트 위에": "Modern life on Seolbaek's palette", "현대의 우리를 담다": "", "한복의 대중화": "Democratizing Hanbok",
  "설백": "Seolbaek", "주홍": "Vermilion", "유록": "Willow Green", "먹색": "Ink", "청현": "Deep Blue",
  "설백·청현은 유등천의 윤슬과 수묵 담채화의 번짐을 드레이핑으로 풀어냅니다. 먹·춘유록은 대나무에서 영감받은 두루마기와 플리츠로 이어집니다.": "Seolbaek and Deep Blue interpret Yudeungcheon’s shimmer and the spreading wash of ink-and-color painting through draping. Ink and Chun Willow Green continue into bamboo-inspired durumagi and pleats.",
  "백의 민족": "The people in white", "흰색 위의 시작": "A beginning on white",
  "설백의 미학": "Seolbaek's aesthetic", "거칠음": "Roughness", "부드러움": "Softness",
  "날것의 골목": "Raw alleys", "바늘의 쇠맛": "The bite of needles", "미싱의 소리": "The sound of sewing machines",
  "원단의 감촉": "The feel of fabric", "빛을 담는 오간자": "Organza that holds light", "몸에 흐르는 실루엣": "A silhouette flowing on the body",
  "단아하되 고루하지 않은": "Quietly elegant, never dated", "감각적이되 과하지 않은": "Sensory, never excessive", "친근하되 가볍지 않은": "Warmly approachable, never light",
  "옷장에서 자연스럽게 꺼내는 한복.": "Hanbok drawn naturally from your wardrobe.", "전통과 현대가": "Tradition and the present",
  "한 겹씩 포개지는 순간.": "The moment they overlap, layer by layer.", "볕뉘": "A glimpse of light",
  "설백의 다섯 색": "Seolbaek's five colors", "흰옷의 기억": "Memory of white clothes", "창작의 여백": "Creative space",
  "백의민족": "The people in white", "중촌동의 영혼을 담다": "The spirit of Jungchon"
};

function translateAboutStatic(language) {
  if (!document.body.classList.contains("about-page")) return;
  document.querySelectorAll(".about-page main, .about-page footer").forEach((root) => {
    root.querySelectorAll("h1,h2,h3,p,span,dt,dd,figcaption").forEach((el) => {
      // 정식 번역 키가 있는 요소는 applyLanguage 결과를 그대로 유지합니다.
      if (el.dataset.i18n) return;
      if (!el.dataset.aboutKo) el.dataset.aboutKo = el.innerHTML;
      if (language === "en") {
        let html = el.dataset.aboutKo;
        Object.entries(ABOUT_STATIC_EN).forEach(([ko, en]) => { html = html.split(ko).join(en); });
        el.innerHTML = html;
      } else el.innerHTML = el.dataset.aboutKo;
    });
  });
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
  translateAboutStatic(nextLanguage);
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
  { id: "look-01", label: "PURCHASE · CLOTHING", name: "위빙 갈래 원피스", nameEn: "Weaving Pleated Dress", summary: "위빙 처리와 살랑거리는 원단", summaryEn: "A softly draped dress with woven panels and a light, flowing fabric.", category: "clothing", homeImage: "images/look-01-weaving-dress.png", keywords: ["소재: 오간자", "원단 디테일: 위빙 처리와 살랑거리는 원단", "사이즈: 44/55 방향", "구매·대여: 구매" ] },
  { id: "look-02", label: "PURCHASE · CLOTHING", name: "능소화 원피스", nameEn: "Neungsohwa Dress", summary: "둥글게 자른 원단에 주름을 잡아 만든 꽃잎 디테일", summaryEn: "A dress shaped by rounded petals inspired by the trumpet flower.", category: "clothing", homeImage: "images/look-02-neungsohwa-dress.png", keywords: ["소재: 준비 중", "원단 디테일: 둥근 컷과 주름 꽃잎", "사이즈: 44/55 방향", "구매·대여: 구매" ] },
  { id: "look-03", label: "PURCHASE · CLOTHING", name: "윤슬 투피스", nameEn: "Yoonseul Two-Piece", summary: "유등천 물결이 흐르는 듯한 표현", summaryEn: "Draped layers that catch the shimmering light of Yudeungcheon.", category: "clothing", homeImage: "images/look-03-yoonseul-two-piece.png", keywords: ["소재: 준비 중", "원단 디테일: 유등천 물결 표현", "사이즈: 44/55 방향", "구매·대여: 구매" ] },
  { id: "seolbaek-bamboo", label: "RENTAL · CLOTHING", name: "대나무 두루마기", nameEn: "Bamboo Durumagi", summary: "옆쪽 연두색 디테일", summaryEn: "A bamboo-inspired durumagi with quiet pleats and a flowing silhouette.", category: "rental", homeImage: "images/look-04-bamboo-durumagi.png", keywords: ["소재: 준비 중", "원단 디테일: 옆쪽 연두색 디테일", "사이즈: 코르셋 또는 지퍼 조절", "구매·대여: 대여" ], published: true, featured: true }
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
  const english = currentLanguage() === "en";
  const name = (english ? product?.nameEn : product?.name) || "LOOK " + number;
  const summary = (english ? product?.summaryEn : product?.summary) || translate("catalog.pending", "제품명·상세 정보 관리자 입력 대기");
  const label = product?.label || "SEASON 01 / 2026";
  const visual = product?.homeImage
    ? '<img src="' + product.homeImage + '" alt="' + name + '" loading="lazy">'
    : '<div class="placeholder-lines" aria-hidden="true"><i></i><i></i><i></i></div><p>' + translate("catalog.imagePending", "제품 이미지<br>교체 예정") + '</p>';
  return '<article class="lookbook-card' + (product?.homeImage ? '' : ' is-placeholder') + ' reveal-on-scroll">' +
    '<div class="lookbook-image">' + visual + '<span class="look-index">LOOK ' + number + '</span></div>' +
    '<div class="lookbook-copy"><p class="look-meta">' + label + '</p><h3>' + name + '</h3><p>' + summary + '</p>' +
    (product ? '<a class="line-link" href="product.html?id=' + encodeURIComponent(product.id) + '">' + translate("product.detail", "상세 보기") + ' <b aria-hidden="true">↗</b></a>' : '') +
    (compact ? '' : '<div class="detail-placeholder-row"><span>FABRIC</span><span>DETAIL</span><span>NATURE</span></div>') + '</div></article>';
}

function productCardMarkup(product, index) {
  const escape = window.ProductCatalog.escapeHtml;
  const image = product.homeImage || (PRODUCT_PHOTOS_READY && window.ProductCatalog.safeImageUrl(product.images && product.images[0]));
  const english = currentLanguage() === "en";
  const displayName = (english ? product.nameEn : product.name) || "LOOK";
  const displaySummary = (english ? product.summaryEn : product.summary) || translate("catalog.pending", "상세 정보 관리자 입력 대기");
  const imageMarkup = image
    ? '<img src="' + escape(image) + '" alt="' + escape(displayName) + '" loading="lazy" onerror="this.remove()">'
    : '<div class="placeholder-lines" aria-hidden="true"><i></i><i></i><i></i></div><p>' + translate("catalog.imagePending", "제품 이미지<br>교체 예정") + '</p>';
  return '<a class="lookbook-card reveal-on-scroll" href="product.html?id=' + encodeURIComponent(product.id) + '">' +
    '<div class="lookbook-image">' + imageMarkup + '<span class="look-index">LOOK ' + String(index + 1).padStart(2, "0") + '</span></div>' +
    '<div class="lookbook-copy"><p class="look-meta">' + escape(product.label || product.category || "SEASON 01") + '</p><h3>' + escape(displayName) + '</h3><p>' + escape(displaySummary) + '</p>' +
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
    const source = Array.isArray(products) ? products : [];
    if (!PRODUCT_PHOTOS_READY && !source.some((product) => product && product.homeImage)) {
      return source.map((product, index) => placeholderMarkup(index, false, product)).join("") || placeholderMarkup(0, false);
    }
    return source.map(productCardMarkup).join("") || placeholderMarkup(0, false);
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

