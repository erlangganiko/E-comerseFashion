// ==========================================================
// INISIALISASI UTAMA
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  initializeCommonFeatures();
  initializeAppHomePage();
  initializeAppProductPages();
  initializeAppArticlePages();
});
// ==========================================================
// PRELOADER LOGIC
// ==========================================================
window.onload = function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 1500);
  }
};
// ==========================================================
// KUMPULAN FUNGSI-FUNGSI
// ==========================================================

/**
 * Menjalankan skrip umum seperti navbar, menu, dan footer.
 */
function initializeCommonFeatures() {
  // ... (Kode navbar, menu, dan footer Anda) ...
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

  // --- LOGIKA UNTUK SEARCH OVERLAY ---
  const searchIcons = document.querySelectorAll(
    ".search-icon-mobile, .search-icon-desktop"
  );
  const searchOverlay = document.getElementById("search-overlay");
  const searchCloseBtn = document.getElementById("search-close-btn");
  const searchInput = document.getElementById("catalog-search-input");

  if (searchIcons.length > 0 && searchOverlay && searchCloseBtn) {
    searchIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        searchOverlay.classList.add("show");
        if (searchInput) {
          searchInput.focus();
        }
      });
    });

    searchCloseBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("show");
    });
  }
}

/**
 * Menjalankan skrip khusus untuk halaman Beranda (Hero & Story Slider).
 */
function initializeAppHomePage() {
  // ... (Kode untuk hero section dan story slider Anda) ...
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
    checkHeroState();
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
async function initializeAppProductPages() {
  const catalogGrid = document.querySelector(".product-grid-catalog");
  const productDetailGrid = document.querySelector(".product-detail-grid");

  if (!catalogGrid && !productDetailGrid) {
    return;
  }

  try {
    const response = await fetch("products.json"); // Ambil data
    if (!response.ok) throw new Error("Gagal memuat data produk");
    const allProductsData = await response.json();

    if (catalogGrid) {
      // INI ADALAH FUNGSI YANG PENTING
      renderProductCatalog(catalogGrid, allProductsData);
    }

    if (productDetailGrid) {
      renderProductDetail(productDetailGrid, allProductsData);
      // ... (Kode modal dan tabs Anda) ...
      const contactBtn = document.getElementById("open-contact-modal");
      const modalOverlay = document.getElementById("contact-modal-overlay");
      const modalPopup = document.getElementById("contact-modal-popup");
      const modalClose = document.getElementById("modal-close-btn");
      const contactForm = document.getElementById("contact-form");
      const openModal = () => {
        modalOverlay.classList.add("show");
        modalPopup.classList.add("show");
      };
      const closeModal = () => {
        modalOverlay.classList.remove("show");
        modalPopup.classList.remove("show");
      };
      if (contactBtn && modalOverlay && modalPopup && modalClose) {
        contactBtn.addEventListener("click", openModal);
        modalClose.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", closeModal);
      }
      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();
          alert("Pesan Anda telah (demo) terkirim!");
          closeModal();
          contactForm.reset();
        });
      }
      const tabButtons = document.querySelectorAll(".tab-btn");
      const tabContents = document.querySelectorAll(".tab-content");
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));
          button.classList.add("active");
          const tabId = button.getAttribute("data-tab");
          document.getElementById(`tab-${tabId}`).classList.add("active");
        });
      });
    }
  } catch (error) {
    console.error("Error memuat data produk:", error);
    const container = catalogGrid || productDetailGrid;
    if (container) {
      container.innerHTML = "<p>Gagal memuat produk. Coba lagi nanti.</p>";
    }
  }
}

/**
 * FUNGSI LENGKAP PENGGANTI:
 * renderProductCatalog dengan SEMUA FITUR (Filter, Search, Paginasi)
 */
function renderProductCatalog(catalogGrid, allProductsData) {
  // === 1. AMBIL ELEMEN DARI HTML ===
  const availabilityFilter = document.getElementById("filter-availability");
  const categoryFilter = document.getElementById("filter-category");
  const searchInput = document.getElementById("catalog-search-input");
  const searchForm = document.getElementById("catalog-search-form"); // Untuk 'Enter'
  const sortBy = document.getElementById("sort-by");
  const productCount = document.querySelector(".product-count");
  const paginationControls = document.getElementById("pagination-controls");

  // === 2. PENGATURAN PAGINASI & URL ===
  let currentPage = 1;
  const productsPerPage = 8;

  // Cek parameter URL untuk set filter kategori saat halaman dimuat
  const params = new URLSearchParams(window.location.search);
  const kategoriFromURL = params.get("kategori");
  if (kategoriFromURL) {
    categoryFilter.value = kategoriFromURL; // Set nilai dropdown
  }

  /**
   * Fungsi internal untuk me-render produk dan tombol paginasi.
   * INI ADALAH FUNGSI INTI-NYA.
   */
  function renderProducts() {
    // 1. Ambil SEMUA nilai filter
    const availabilityValue = availabilityFilter.value;
    const categoryValue = categoryFilter.value;
    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = sortBy.value;

    // 2. Proses Filtering Produk
    let filteredProducts = allProductsData.filter((product) => {
      // Filter Pencarian (Search)
      if (searchValue && !product.name.toLowerCase().includes(searchValue)) {
        return false;
      }
      // Filter Ketersediaan
      if (availabilityValue === "in-stock" && !product.available) {
        return false;
      }
      // Filter Kategori
      if (categoryValue !== "all" && product.category !== categoryValue) {
        return false;
      }

      return true; // Lolos semua filter
    });

    // 3. Proses Sorting Produk
    filteredProducts.sort((a, b) => {
      switch (sortValue) {
        case "date-asc":
          return a.date - b.date;
        case "coming-soon":
          if (a.available !== b.available) {
            return a.available - b.available;
          }
          return b.date - a.date;
        case "date-desc":
        default:
          return b.date - a.date;
      }
    });

    // === 4. LOGIKA PAGINASI ===
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    } else if (totalPages === 0) {
      currentPage = 1;
    }

    // Ambil "potongan" produk untuk halaman ini
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToRender = filteredProducts.slice(startIndex, endIndex);

    // === 5. RENDER PRODUK KE HTML ===
    catalogGrid.innerHTML = ""; // Kosongkan grid
    if (productsToRender.length === 0) {
      catalogGrid.innerHTML =
        "<p style='text-align: center; width: 100%; grid-column: 1 / -1;'>Produk tidak ditemukan.</p>";
    } else {
      productsToRender.forEach((product) => {
        const productHTML = `<a href="detail-barang.html?id=${product.id}" class="product-item-catalog" data-id="${product.id}"><span class="wishlist-icon"><i class="far fa-heart"></i><i class="fas fa-heart"></i></span><img src="${product.images[0]}" alt="${product.name}" /><p class="product-code">${product.name}</p></a>`;
        catalogGrid.insertAdjacentHTML("beforeend", productHTML);
      });
    }

    // 6. Update jumlah produk
    productCount.textContent = `${totalProducts} products`;

    // 7. Render tombol-tombol paginasi
    renderPagination(totalPages);
  }

  /**
   * Fungsi untuk membuat tombol paginasi
   */
  function renderPagination(totalPages) {
    if (!paginationControls) return;
    paginationControls.innerHTML = ""; // Kosongkan tombol lama

    if (totalPages <= 1) return; // Sembunyikan jika hanya 1 halaman

    // Tombol "Prev"
    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
        window.scrollTo(0, 0); // Gulir ke atas
      }
    });
    paginationControls.appendChild(prevButton);

    // Tombol Angka
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderProducts();
        window.scrollTo(0, 0); // Gulir ke atas
      });
      paginationControls.appendChild(pageButton);
    }

    // Tombol "Next"
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        window.scrollTo(0, 0); // Gulir ke atas
      }
    });
    paginationControls.appendChild(nextButton);
  }

  /**
   * Fungsi untuk menangani perubahan filter
   * (Reset ke halaman 1 setiap kali filter diubah)
   */
  function onFilterChange() {
    currentPage = 1; // Selalu kembali ke halaman 1
    renderProducts();
  }

  // === 3. TAMBAHKAN SEMUA EVENT LISTENER ===
  availabilityFilter.addEventListener("change", onFilterChange);
  categoryFilter.addEventListener("change", onFilterChange);
  sortBy.addEventListener("change", onFilterChange);

  // Listener untuk mengetik (real-time filtering)
  searchInput.addEventListener("input", onFilterChange);

  // Listener untuk menekan "Enter"
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Mencegah halaman refresh
      onFilterChange(); // Jalankan filter
      searchInput.blur(); // Sembunyikan keyboard
    });
  }

  // === 4. PANGGIL RENDER PERTAMA KALI ===
  renderProducts();
}

/**
 * Menjalankan skrip untuk Halaman Detail Produk.
 */
function renderProductDetail(productDetailGrid, allProductsData) {
  // ... (Kode Anda untuk render halaman detail produk) ...
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = allProductsData.find((p) => p.id === productId);

  if (product) {
    document.getElementById("product-detail-title").textContent = product.name;
    const mainImage = document.getElementById("product-detail-image");
    mainImage.src = product.images[0];
    const whatsappBtn = document.getElementById("whatsapp-btn");
    if (whatsappBtn) {
      const phoneNumber = "628123456789"; // GANTI NOMOR INI
      const message = `Halo, saya tertarik dengan produk: ${product.name} (ID: ${product.id})`;
      whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
    }
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
    const descriptionContainer = document.getElementById("tab-description");
    const specsContainer = document.getElementById("tab-specifications");
    if (descriptionContainer && product.description) {
      descriptionContainer.innerHTML = `<p>${product.description}</p>`;
    } else if (descriptionContainer) {
      descriptionContainer.innerHTML = `<p>Deskripsi produk belum tersedia.</p>`;
    }
    if (
      specsContainer &&
      product.specifications &&
      product.specifications.length > 0
    ) {
      const specsList = product.specifications
        .map((item) => `<li>${item}</li>`)
        .join("");
      specsContainer.innerHTML = `<ul>${specsList}</ul>`;
    } else if (specsContainer) {
      specsContainer.innerHTML = `<p>Spesifikasi produk belum tersedia.</p>`;
    }
  } else {
    productDetailGrid.innerHTML = `<h1 style="text-align: center; width: 100%;">Produk tidak ditemukan.</h1>`;
  }
}

/**
 * Menjalankan skrip untuk Halaman Artikel (Daftar & Detail).
 */
async function initializeAppArticlePages() {
  // ... (Kode Anda untuk halaman artikel) ...
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
  // ... (Kode Anda untuk render daftar artikel) ...
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
  // ... (Kode Anda untuk render detail artikel) ...
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
