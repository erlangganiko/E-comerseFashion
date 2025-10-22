// ==========================================================
// DATA PRODUK
// ==========================================================
const allProductsData = [
  {
    id: "product-1",
    name: "Adidas Samba OG Preloved Red Leopard Womens",
    price: 0,
    date: 12,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K01/depan.webp",
      "Asset/catalog/Kebaya Pria/K01/back.webp",
      "Asset/catalog/Kebaya Pria/K01/kiri.webp",
      "Asset/catalog/Kebaya Pria/K01/kanan.webp",
    ],
  },
  {
    id: "product-2",
    name: "Nike Kwondo 1 x GDragon Peaceminusone Triple White",
    price: 13999000,
    date: 11,
    available: false,
    images: [
      "Asset/catalog/Kebaya Pria/K02/depan.png",
      "Asset/catalog/Kebaya Pria/K02/back.png",
      "Asset/catalog/Kebaya Pria/K02/kiri.png",
      "Asset/catalog/Kebaya Pria/K02/kanan.png",
    ],
  },
  {
    id: "product-3",
    name: "Geedup x Trapstar Team Logo x Irongate T Trackpant White Marle  Grey 2025",
    price: 13899000,
    date: 10,
    available: false,
    images: [
      "Asset/catalog/Kebaya Pria/K03/depan.png",
      "Asset/catalog/Kebaya Pria/K03/belakang.png",
      "Asset/catalog/Kebaya Pria/K03/kiri.png",
      "Asset/catalog/Kebaya Pria/K03/kanan.png",
    ],
  },
  {
    id: "product-4",
    name: "Geedup x Trapstar Team Logo x Irongate T Trackpant Black  White 2025",
    price: 24998800,
    date: 9,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K04/depan.png",
      "Asset/catalog/Kebaya Pria/K04/back.png",
      "Asset/catalog/Kebaya Pria/K04/kiri.png",
      "Asset/catalog/Kebaya Pria/K04/kanan.png",
    ],
  },
  {
    id: "product-5",
    name: "BAPE Logo Nylon Relaxed Fit Shorts Black",
    price: 21020300,
    date: 8,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K05/depan.png",
      "Asset/catalog/Kebaya Pria/K05/back.png",
      "Asset/catalog/Kebaya Pria/K05/kiri.png",
      "Asset/catalog/Kebaya Pria/K05/kanan.png",
    ],
  },
  {
    id: "product-8",
    name: "BAPE Shark Tee #1 Black",
    price: 11998800,
    date: 7,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K06/depan.png",
      "Asset/catalog/Kebaya Pria/K06/back.png",
      "Asset/catalog/Kebaya Pria/K06/kiri.png",
      "Asset/catalog/Kebaya Pria/K06/kanan.png",
    ],
  },
  {
    id: "product-9",
    name: "Nike x NOCTA NRG Big Body CS T-Shirt Black 2024",
    price: 11998000,
    date: 6,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K07/depan.png",
      "Asset/catalog/Kebaya Pria/K07/back.png",
      "Asset/catalog/Kebaya Pria/K07/kiri.png",
      "Asset/catalog/Kebaya Pria/K07/kanan.png",
    ],
  },
  {
    id: "product-8",
    name: "Kaws x Uniqlo Warhol UT Graphic 476423 Kids T-Shirt White 2024",
    price: 11699000,
    date: 5,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K08/depan.png",
      "Asset/catalog/Kebaya Pria/K08/back.png",
      "Asset/catalog/Kebaya Pria/K08/kiri.png",
      "Asset/catalog/Kebaya Pria/K08/kanan.png",
    ],
  },
  {
    id: "product-9",
    name: "KAWS x Uniqlo Warhol UT Graphic 476352 T-shirt Black 2024",
    price: 12000000,
    date: 4,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K09/depan.png",
      "Asset/catalog/Kebaya Pria/K09/back.png",
      "Asset/catalog/Kebaya Pria/K09/kiri.png",
      "Asset/catalog/Kebaya Pria/K09/kanan.png",
    ],
  },
  {
    id: "product-10",
    name: "KAWS x Uniqlo Warhol UT Graphic 476351 T-shirt Black 2024",
    price: 15100000,
    date: 3,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K10/depan.png",
      "Asset/catalog/Kebaya Pria/K10/back.png",
      "Asset/catalog/Kebaya Pria/K10/kiri.png",
      "Asset/catalog/Kebaya Pria/K10/kanan.png",
    ],
  },
  {
    id: "product-11",
    name: "Geedup x Arrdee Handstyle Hoodie Black  Multi 2025",
    price: 13500000,
    date: 2,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K11/depan.png",
      "Asset/catalog/Kebaya Pria/K11/back.png",
      "Asset/catalog/Kebaya Pria/K11/kiri.png",
      "Asset/catalog/Kebaya Pria/K11/kanan.png",
    ],
  },
  {
    id: "product-12",
    name: "Geedup Team Logo Hooded Jacket Black 2025",
    price: 14800000,
    date: 1,
    available: true,
    images: [
      "Asset/catalog/Kebaya Pria/K12/depan.png",
      "Asset/catalog/Kebaya Pria/K12/back.png",
      "Asset/catalog/Kebaya Pria/K12/kiri.png",
      "Asset/catalog/Kebaya Pria/K12/kanan.png",
    ],
  },
];

// ==========================================================
// INISIALISASI UTAMA
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi fitur umum (navbar, menu, footer, dll)
  initializeCommonFeatures();

  // 2. Inisialisasi fitur khusus halaman utama (hero, slider)
  initializeAppHomePage();

  // 3. Inisialisasi halaman produk (katalog & detail)
  initializeAppProductPages();

  // 4. Inisialisasi halaman artikel (daftar & detail)
  initializeAppArticlePages();
});
// ==========================================================
// PRELOADER LOGIC
// ==========================================================
window.onload = function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Atur jeda waktu sebelum preloader menghilang (dalam milidetik)
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 1500); // <-- Jeda 3000ms atau 1 detik. Anda bisa ubah nilainya.
  }
};
// ==========================================================
// KUMPULAN FUNGSI-FUNGSI
// ==========================================================

/**
 * Menjalankan skrip umum seperti navbar, menu, dan footer.
 */
function initializeCommonFeatures() {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");

      if (currentScrollY > lastScrollY && currentScrollY > 100)
        navbar.classList.add("hidden");
      else navbar.classList.remove("hidden");

      lastScrollY = currentScrollY;
    });
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const menuCloseBtn = document.querySelector(".menu-close-btn");
  const menuOverlay = document.getElementById("menu-overlay");
  if (menuToggle && menuCloseBtn && menuOverlay) {
    const toggleMenu = () => {
      menuOverlay.classList.toggle("open");
      document.body.style.overflow = menuOverlay.classList.contains("open")
        ? "hidden"
        : "auto";
    };
    menuToggle.addEventListener("click", toggleMenu);
    menuCloseBtn.addEventListener("click", toggleMenu);
  }

  const footerToggles = document.querySelectorAll(".footer-toggle");
  footerToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const submenu = toggle.nextElementSibling;
      toggle.classList.toggle("active");
      if (submenu) submenu.classList.toggle("open");
    });
  });
}

/**
 * Menjalankan skrip khusus untuk halaman Beranda (Hero & Story Slider).
 */
function initializeAppHomePage() {
  const heroSection = document.getElementById("hero-section");
  const storySliders = document.querySelectorAll(".story-image-slider");

  if (heroSection) {
    const sideImages = document.querySelectorAll(".side-image-container");
    let hasScrolledDown = false;

    const checkHeroState = () => {
      if (window.innerWidth >= 768 && window.scrollY > 0) {
        heroSection.classList.add("scrolled");
        sideImages.forEach((img) => img.classList.add("show"));
        hasScrolledDown = true;
      } else if (window.innerWidth < 768) {
        heroSection.classList.remove("scrolled");
        sideImages.forEach((img) => img.classList.add("show"));
      }
    };

    window.addEventListener("scroll", () => {
      if (window.innerWidth >= 768 && !hasScrolledDown && window.scrollY > 0) {
        heroSection.classList.add("scrolled");
        sideImages.forEach((img) => img.classList.add("show"));
        hasScrolledDown = true;
      }
    });
    checkHeroState(); // Cek saat pertama kali memuat
  }

  if (storySliders.length > 0) {
    storySliders.forEach((slider) => {
      const pagination = slider.querySelectorAll(".progress-bar");
      const images = slider.querySelectorAll(".images img");
      const titles = slider.querySelectorAll(".title h1");
      const prevBtn = slider.querySelector(".prev-btn");
      const nextBtn = slider.querySelector(".next-btn");
      const playPauseBtn = slider.querySelector(".play-pause-btn");
      let slideId = 0;
      let automaticSlider;
      let isPaused = false;

      function resetTimer() {
        clearInterval(automaticSlider);
        if (!isPaused) {
          automaticSlider = setInterval(() => updateSlide(1), 4000);
        }
      }

      function updateSlide(direction = 1) {
        slideId = (slideId + direction + images.length) % images.length;

        images.forEach((img, index) =>
          img.classList.toggle("active", index === slideId)
        );
        titles.forEach((title, index) =>
          title.classList.toggle("active", index === slideId)
        );
        pagination.forEach((bar, index) => {
          bar.classList.remove("active");
          bar.classList.toggle("bar-filled", index < slideId);
          if (index === slideId) bar.classList.add("active");
        });
        resetTimer();
      }

      if (prevBtn)
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          updateSlide(-1);
        });
      if (nextBtn)
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          updateSlide(1);
        });

      if (playPauseBtn) {
        playPauseBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          isPaused = !isPaused;
          slider.classList.toggle("paused", isPaused);
          if (isPaused) clearInterval(automaticSlider);
          else resetTimer();
        });
      }
      updateSlide(0);
    });
  }
}

/**
 * Menjalankan skrip untuk halaman Katalog dan Detail Produk.
 */
function initializeAppProductPages() {
  const catalogGrid = document.querySelector(".product-grid-catalog");
  const productDetailGrid = document.querySelector(".product-detail-grid");

  if (catalogGrid) {
    renderProductCatalog(catalogGrid);
  }
  if (productDetailGrid) {
    renderProductDetail(productDetailGrid);
  }
}

function renderProductCatalog(catalogGrid) {
  const availabilityFilter = document.getElementById("filter-availability");
  const priceFilter = document.getElementById("filter-price");
  const sortBy = document.getElementById("sort-by");
  const productCount = document.querySelector(".product-count");

  function renderProducts() {
    const availabilityValue = availabilityFilter.value;
    const priceValue = priceFilter.value;
    const sortValue = sortBy.value;
    let filteredProducts = allProductsData.filter((product) => {
      if (availabilityValue === "in-stock" && !product.available) return false;
      if (priceValue === "low" && product.price >= 12000000) return false;
      if (
        priceValue === "medium" &&
        (product.price < 12000000 || product.price > 14000000)
      )
        return false;
      if (priceValue === "high" && product.price <= 14000000) return false;
      return true;
    });
    filteredProducts.sort((a, b) => {
      switch (sortValue) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return b.date - a.date;
      }
    });
    catalogGrid.innerHTML = "";
    filteredProducts.forEach((product) => {
      const productHTML = `<a href="detail-barang.html?id=${
        product.id
      }" class="product-item-catalog" data-id="${
        product.id
      }"><span class="wishlist-icon"><i class="far fa-heart"></i><i class="fas fa-heart"></i></span><img src="${
        product.images[0]
      }" alt="${product.name}" /><p class="product-code">${
        product.name
      }</p><p class="product-price">Rp ${product.price.toLocaleString(
        "id-ID"
      )}</p></a>`;
      catalogGrid.insertAdjacentHTML("beforeend", productHTML);
    });
    productCount.textContent = `${filteredProducts.length} products`;
  }

  availabilityFilter.addEventListener("change", renderProducts);
  priceFilter.addEventListener("change", renderProducts);
  sortBy.addEventListener("change", renderProducts);
  renderProducts();
}

function renderProductDetail(productDetailGrid) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = allProductsData.find((p) => p.id === productId);
  if (product) {
    document.getElementById("product-detail-title").textContent = product.name;
    document.getElementById(
      "product-detail-price"
    ).textContent = `Rp ${product.price.toLocaleString("id-ID")}`;
    const mainImage = document.getElementById("product-detail-image");
    mainImage.src = product.images[0];
    const thumbnailsContainer = document.querySelector(".product-thumbnails");
    thumbnailsContainer.innerHTML = "";
    product.images.forEach((imgSrc, index) => {
      const thumb = document.createElement("img");
      thumb.src = imgSrc;
      thumb.alt = `${product.name} tampilan ${index + 1}`;
      thumb.classList.add("thumbnail-item");
      if (index === 0) thumb.classList.add("active");
      thumb.addEventListener("click", function () {
        mainImage.src = this.src;
        thumbnailsContainer
          .querySelector(".active")
          ?.classList.remove("active");
        this.classList.add("active");
      });
      thumbnailsContainer.appendChild(thumb);
    });
  } else {
    productDetailGrid.innerHTML = `<h1 style="text-align: center; width: 100%;">Produk tidak ditemukan.</h1>`;
  }
}

/**
 * Menjalankan skrip untuk Halaman Artikel (Daftar & Detail) dengan mengambil data dari articles.json
 */
async function initializeAppArticlePages() {
  const isArticleListPage = document.querySelector(".article-grid");
  const isArticleDetailPage = document.querySelector(
    ".article-detail-container"
  );

  if (!isArticleListPage && !isArticleDetailPage) return;

  try {
    const response = await fetch("articles.json");
    if (!response.ok) throw new Error("Gagal memuat data artikel");
    const allArticlesData = await response.json();

    if (isArticleListPage) renderArticleListPage(allArticlesData);
    if (isArticleDetailPage) renderArticleDetailPage(allArticlesData);
  } catch (error) {
    console.error("Error:", error);
    const container = isArticleListPage || isArticleDetailPage;
    container.innerHTML = `<p>Terjadi kesalahan saat memuat artikel.</p>`;
  }
}

function renderArticleListPage(allArticlesData) {
  const articleGrid = document.querySelector(".article-grid");
  const recentArticlesList = document.getElementById("recent-articles-list");
  const articlePageTitle = document.querySelector(
    ".article-section .article-title"
  );
  const params = new URLSearchParams(window.location.search);
  const tagFilter = params.get("tag");

  const articlesToDisplay = tagFilter
    ? allArticlesData.filter((article) =>
        article.category.map((c) => c.trim()).includes(tagFilter)
      )
    : allArticlesData;

  if (tagFilter)
    articlePageTitle.textContent = `Artikel dengan Tag: "${tagFilter}"`;

  articleGrid.innerHTML = "";
  if (articlesToDisplay.length > 0) {
    articlesToDisplay.forEach((article) => {
      const tagLinks = article.category
        .map(
          (tag) =>
            `<a class="tag-link" href="list-artikel.html?tag=${encodeURIComponent(
              tag.trim()
            )}">${tag.trim()}</a>`
        )
        .join(" ");
      const articleHTML = `
          <div class="featured-article">
            <div class="article-meta-info">
              <span>${article.date}</span>
              <div class="tag-wrapper">
                <span>Tags: </span>
                ${tagLinks}
              </div>
            </div>
            <div class="article-main-content">
              <div class="article-image">
                <a href="detail-artikel.html?id=${article.id}"><img src="${article.image}" alt="${article.title}"></a>
              </div>
              <h2 class="article-card-title"><a href="detail-artikel.html?id=${article.id}">${article.title}</a></h2>
              <p class="article-card-excerpt">${article.excerpt}</p>
              <a href="detail-artikel.html?id=${article.id}" class="read-more-btn">Read more</a>
            </div>
          </div>`;
      articleGrid.insertAdjacentHTML("beforeend", articleHTML);
    });
  } else {
    articleGrid.innerHTML = `<p>Tidak ada artikel yang ditemukan dengan tag "${tagFilter}". <a href="list-artikel.html">Lihat semua artikel</a>.</p>`;
  }

  recentArticlesList.innerHTML = "";
  allArticlesData.forEach((article) => {
    const recentArticleHTML = `<li><a href="detail-artikel.html?id=${article.id}">${article.title}</a><div class="post-date">${article.date}</div></li>`;
    recentArticlesList.insertAdjacentHTML("beforeend", recentArticleHTML);
  });
}

function renderArticleDetailPage(allArticlesData) {
  const container = document.querySelector(".article-detail-container");
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");
  const article = allArticlesData.find((a) => a.id === articleId);

  if (article) {
    container.innerHTML = `
        <a href="list-artikel.html" class="back-to-articles"><i class="fas fa-arrow-left"></i> Kembali ke Semua Artikel</a>
        <img src="${article.image}" alt="${
      article.title
    }" class="article-detail-header-image">
        <h1 class="article-detail-title">${article.title}</h1>
        <p class="article-meta">
          <span>${article.date}</span> | 
          <span>Kategori: ${article.category.join(", ")}</span>
        </p>
        <div class="article-body">${article.content}</div>`;
  } else {
    container.innerHTML = `<h1 style="text-align: center;">Artikel tidak ditemukan.</h1>`;
  }
}
