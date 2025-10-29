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
  const searchInput = document.getElementById("catalog-search-input"); // Input search di catalog

  if (searchIcons.length > 0 && searchOverlay && searchCloseBtn) {
    searchIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        searchOverlay.classList.add("show");
        // Jika ADA input search di catalog, fokuskan
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
    // === PENTING: Pastikan nama file JSON di sini benar ===
    const response = await fetch("products.json"); // Ganti jika nama file JSON Anda berbeda
    // =======================================================
    if (!response.ok) throw new Error("Gagal memuat data produk");
    const allProductsData = await response.json();

    if (catalogGrid) {
      // Menjalankan fungsi katalog dengan data produk
      renderProductCatalog(catalogGrid, allProductsData);
    }

    if (productDetailGrid) {
      // Menjalankan fungsi detail produk
      renderProductDetail(productDetailGrid, allProductsData);
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
 * Fungsi Utama untuk Halaman Katalog (Termasuk Filter, Paginasi, dsb.)
 */
function renderProductCatalog(catalogGrid, allProductsData) {
  // === 1. AMBIL ELEMEN FILTER DARI HTML ===
  const availabilityFilter = document.getElementById("filter-availability");
  const tipeFilter = document.getElementById("filter-tipe"); // Filter Tipe (Pria/Wanita)
  const categoryFilter = document.getElementById("filter-category"); // Filter Kategori (Batik/Kebaya)
  const collectionFilter = document.getElementById("filter-collection"); // Filter Collection
  const searchInput = document.getElementById("catalog-search-input");
  const searchForm = document.getElementById("catalog-search-form");
  const sortBy = document.getElementById("sort-by");
  const productCount = document.querySelector(".product-count");
  const paginationControls = document.getElementById("pagination-controls");

  // === 2. PENGATURAN AWAL ===
  let currentPage = 1;
  const productsPerPage = 8;

  // Cek parameter URL '?kategori=...' dan terapkan ke filter TIPE
  const params = new URLSearchParams(window.location.search);
  const kategoriFromURL = params.get("kategori");
  if (kategoriFromURL && tipeFilter) {
    tipeFilter.value = kategoriFromURL; // Set nilai dropdown Tipe berdasarkan URL
  }

  /**
   * Fungsi Internal: Merender produk ke grid berdasarkan filter dan halaman saat ini.
   */
  function renderProducts() {
    // 1. Baca nilai semua filter saat ini
    const availabilityValue = availabilityFilter.value;
    const tipeValue = tipeFilter.value;
    const categoryValue = categoryFilter.value;
    const collectionValue = collectionFilter.value;
    const searchValue = searchInput.value.toLowerCase().trim();
    const sortValue = sortBy.value;

    // 2. Filter data produk berdasarkan nilai filter
    let filteredProducts = allProductsData.filter((product) => {
      // Filter Search
      if (searchValue && !product.name.toLowerCase().includes(searchValue))
        return false;
      // Filter Ketersediaan
      if (availabilityValue === "in-stock" && !product.available) return false;
      // Filter Tipe (menggunakan key 'tipe' dari JSON baru)
      if (tipeValue !== "all" && product.tipe !== tipeValue) return false;
      // Filter Kategori (menggunakan key 'category' dari JSON baru)
      if (categoryValue !== "all" && product.category !== categoryValue)
        return false;
      // Filter Collection (menggunakan key 'collection' dari JSON baru)
      if (collectionValue !== "all" && product.collection !== collectionValue)
        return false;

      return true; // Lolos semua filter
    });

    // 3. Urutkan produk hasil filter
    filteredProducts.sort((a, b) => {
      switch (sortValue) {
        case "date-asc":
          return a.date - b.date;
        case "coming-soon":
          if (a.available !== b.available) return a.available - b.available;
          return b.date - a.date;
        case "date-desc":
        default:
          return b.date - a.date;
      }
    });

    // 4. Hitung Paginasi
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    currentPage = Math.max(1, Math.min(currentPage, totalPages || 1)); // Pastikan halaman valid

    // 5. Ambil produk untuk halaman saat ini
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToRender = filteredProducts.slice(startIndex, endIndex);

    // 6. Tampilkan produk ke HTML
    catalogGrid.innerHTML = ""; // Kosongkan grid
    if (productsToRender.length === 0) {
      catalogGrid.innerHTML =
        "<p style='text-align: center; width: 100%; grid-column: 1 / -1;'>Produk tidak ditemukan.</p>";
    } else {
      productsToRender.forEach((product) => {
        const productHTML = `
          <a href="detail-barang.html?id=${product.id}" class="product-item-catalog" data-id="${product.id}">
            <span class="wishlist-icon"><i class="far fa-heart"></i><i class="fas fa-heart"></i></span>
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy"/>
            <p class="product-code">${product.name}</p>
          </a>`;
        catalogGrid.insertAdjacentHTML("beforeend", productHTML);
      });
    }

    // 7. Update tampilan jumlah produk
    productCount.textContent = `${totalProducts} products`;

    // 8. Render tombol-tombol paginasi
    renderPagination(totalPages, currentPage, (page) => {
      currentPage = page;
      renderProducts();
      // Scroll halus ke atas grid
      catalogGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /**
   * Fungsi Internal: Merender tombol-tombol paginasi (termasuk Skip Page).
   */
  function renderPagination(totalPages, currentPage, onPageClick) {
    if (!paginationControls) return;
    paginationControls.innerHTML = "";

    if (totalPages <= 1) return; // Tidak perlu paginasi jika hanya 1 halaman

    // --- Helper Buttons ---
    const createPageButton = (page) => {
      /* ... (fungsi sama seperti sebelumnya) ... */
      const pageButton = document.createElement("button");
      pageButton.textContent = page;
      if (page === currentPage) pageButton.classList.add("active");
      pageButton.addEventListener("click", () => onPageClick(page));
      paginationControls.appendChild(pageButton);
    };
    const createEllipsis = () => {
      /* ... (fungsi sama seperti sebelumnya) ... */
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.classList.add("pagination-ellipsis");
      paginationControls.appendChild(ellipsis);
    };

    // --- Tombol Prev ---
    const prevButton =
      document.createElement("button"); /* ... (logika sama) ... */
    prevButton.textContent = "Prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) onPageClick(currentPage - 1);
    });
    paginationControls.appendChild(prevButton);

    // --- Tombol Angka (Ellipsis Logic) ---
    const siblingCount = 1;
    let lastPageRendered = 0; /* ... (logika sama) ... */
    for (let i = 1; i <= totalPages; i++) {
      const shouldShowPage =
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - siblingCount && i <= currentPage + siblingCount);
      if (shouldShowPage) {
        const gap = i - lastPageRendered;
        if (gap > 1) {
          if (gap === 2) createPageButton(i - 1);
          else createEllipsis();
        }
        createPageButton(i);
        lastPageRendered = i;
      }
    }

    // --- Tombol Next ---
    const nextButton =
      document.createElement("button"); /* ... (logika sama) ... */
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) onPageClick(currentPage + 1);
    });
    paginationControls.appendChild(nextButton);

    // --- Fitur Lompat Halaman ---
    const skipInput =
      document.createElement("input"); /* ... (logika sama) ... */
    skipInput.type = "number";
    skipInput.placeholder = `... (1-${totalPages})`;
    skipInput.min = "1";
    skipInput.max = totalPages;
    skipInput.classList.add("pagination-skip-input");
    const skipButton =
      document.createElement("button"); /* ... (logika sama) ... */
    skipButton.textContent = "Go";
    skipButton.classList.add("pagination-skip-button");
    const handleSkip = () => {
      /* ... (logika sama) ... */
      const pageNum = parseInt(skipInput.value, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages)
        onPageClick(pageNum);
      else skipInput.value = "";
    };
    skipButton.addEventListener("click", handleSkip);
    skipInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSkip();
      }
    });
    paginationControls.appendChild(skipInput);
    paginationControls.appendChild(skipButton);
  }

  /**
   * Fungsi Internal: Dipanggil ketika salah satu filter diubah.
   */
  function onFilterChange() {
    currentPage = 1; // Kembali ke halaman 1 setiap filter diubah
    renderProducts();
  }

  // === 3. TAMBAHKAN EVENT LISTENER KE SEMUA FILTER ===
  availabilityFilter.addEventListener("change", onFilterChange);
  tipeFilter.addEventListener("change", onFilterChange); // Listener filter baru
  categoryFilter.addEventListener("change", onFilterChange); // Listener filter baru
  collectionFilter.addEventListener("change", onFilterChange); // Listener filter baru
  sortBy.addEventListener("change", onFilterChange);
  searchInput.addEventListener("input", onFilterChange); // Filter saat mengetik
  if (searchForm) {
    // Filter saat menekan Enter
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      onFilterChange();
      searchInput.blur();
    });
  }

  // === 4. RENDER PRODUK PERTAMA KALI SAAT HALAMAN DIMUAT ===
  renderProducts();
}

/**
 * Fungsi untuk Halaman Detail Produk (Termasuk Modal, Tabs, Lightbox Panzoom).
 */
function renderProductDetail(productDetailGrid, allProductsData) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = allProductsData.find((p) => p.id === productId);

  if (!product) {
    productDetailGrid.innerHTML = `<h1 style="text-align: center; width: 100%;">Produk tidak ditemukan.</h1>`;
    return; // Hentikan fungsi jika produk tidak ada
  }

  // --- Render Informasi Dasar Produk ---
  document.getElementById("product-detail-title").textContent = product.name;
  const mainImage = document.getElementById("product-detail-image");
  mainImage.src = product.images[0];
  mainImage.alt = product.name; // Tambahkan alt text

  // --- Tombol WhatsApp ---
  const whatsappBtn = document.getElementById("whatsapp-btn");
  if (whatsappBtn) {
    const phoneNumber = "628123456789"; // GANTI NOMOR INI
    const message = `Halo, saya tertarik dengan produk: ${product.name} (ID: ${product.id})`;
    whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
  }

  // --- Render Thumbnails ---
  const thumbnailsContainer = document.querySelector(".product-thumbnails");
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = "";
    product.images.forEach((imgSrc, index) => {
      const thumb = document.createElement("img");
      thumb.src = imgSrc;
      thumb.alt = `${product.name} thumbnail ${index + 1}`;
      thumb.classList.add("thumbnail-item");
      if (index === 0) thumb.classList.add("active");
      thumb.addEventListener("click", function () {
        mainImage.src = this.src; // Ganti gambar utama saat thumbnail diklik
        thumbnailsContainer
          .querySelector(".active")
          ?.classList.remove("active");
        this.classList.add("active");
      });
      thumbnailsContainer.appendChild(thumb);
    });
  }

  // --- Render Konten Tabs (Deskripsi & Spesifikasi) ---
  const descriptionContainer = document.getElementById("tab-description");
  const specsContainer = document.getElementById("tab-specifications");
  if (descriptionContainer) {
    descriptionContainer.innerHTML = product.description
      ? `<p>${product.description}</p>`
      : `<p>Deskripsi produk belum tersedia.</p>`;
  }
  if (specsContainer) {
    if (product.specifications && product.specifications.length > 0) {
      const specsList = product.specifications
        .map((item) => `<li>${item}</li>`)
        .join("");
      specsContainer.innerHTML = `<ul>${specsList}</ul>`;
    } else {
      specsContainer.innerHTML = `<p>Spesifikasi produk belum tersedia.</p>`;
    }
  }

  // --- Logika Modal Kontak ---
  const contactBtn = document.getElementById("open-contact-modal");
  const modalOverlay = document.getElementById("contact-modal-overlay");
  const modalPopup = document.getElementById("contact-modal-popup");
  const modalClose = document.getElementById("modal-close-btn");
  const contactForm = document.getElementById("contact-form");
  const openModal = () => {
    /* ... (fungsi sama) ... */
    if (modalOverlay && modalPopup) {
      modalOverlay.classList.add("show");
      modalPopup.classList.add("show");
    }
  };
  const closeModal = () => {
    /* ... (fungsi sama) ... */
    if (modalOverlay && modalPopup) {
      modalOverlay.classList.remove("show");
      modalPopup.classList.remove("show");
    }
  };
  if (contactBtn && modalOverlay && modalPopup && modalClose) {
    /* ... (event listener sama) ... */
    contactBtn.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  if (contactForm) {
    /* ... (event listener sama) ... */
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Pesan Anda telah (demo) terkirim!");
      closeModal();
      contactForm.reset();
    });
  }

  // --- Logika Tabs ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  if (tabButtons.length > 0 && tabContents.length > 0) {
    /* ... (logika sama) ... */
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        button.classList.add("active");
        const targetContent = document.getElementById(`tab-${tabId}`);
        if (targetContent) targetContent.classList.add("active");
      });
    });
    // Aktifkan tab pertama secara default
    if (tabButtons[0] && tabContents[0]) {
      tabButtons[0].classList.add("active");
      tabContents[0].classList.add("active");
    }
  }

  // --- Logika Lightbox Galeri dengan Panzoom ---
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close-grouped");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const panzoomElement = document.getElementById("panzoom-element");
  const zoomInBtn = document.getElementById("lightbox-zoom-in");
  const zoomOutBtn = document.getElementById("lightbox-zoom-out");

  if (
    lightboxOverlay &&
    lightboxModal &&
    lightboxImg &&
    lightboxClose &&
    lightboxPrev &&
    lightboxNext &&
    panzoomElement &&
    zoomInBtn &&
    zoomOutBtn &&
    typeof Panzoom !== "undefined"
  ) {
    let currentLightboxIndex = 0;
    const allImages = product.images;
    let panzoomInstance = null;

    // Fungsi update gambar lightbox
    function updateLightboxImage(index) {
      /* ... (logika sama) ... */
      index = (index + allImages.length) % allImages.length; // Loop index
      lightboxImg.src = allImages[index];
      currentLightboxIndex = index;
      if (panzoomInstance) panzoomInstance.reset({ animate: false }); // Reset zoom tanpa animasi
    }

    // Buka lightbox
    mainImage.addEventListener("click", () => {
      /* ... (logika sama, pastikan Panzoom diinisialisasi) ... */
      const currentMainSrc = mainImage.getAttribute("src");
      const startIndex = allImages.indexOf(currentMainSrc);
      updateLightboxImage(startIndex !== -1 ? startIndex : 0);
      lightboxOverlay.classList.add("show");
      lightboxModal.classList.add("show");

      // Inisialisasi Panzoom setelah modal tampil dan gambar dimuat
      requestAnimationFrame(() => {
        // Tunggu frame berikutnya
        if (lightboxImg.complete) {
          // Jika gambar sudah dimuat
          if (!panzoomInstance) {
            panzoomInstance = Panzoom(lightboxImg, {
              maxScale: 4,
              minScale: 1,
            });
            zoomInBtn.addEventListener("click", panzoomInstance.zoomIn);
            zoomOutBtn.addEventListener("click", panzoomInstance.zoomOut);
            panzoomElement.addEventListener(
              "wheel",
              panzoomInstance.zoomWithWheel
            );
          } else {
            panzoomInstance.reset({ animate: false }); // Reset jika instance sudah ada
          }
        } else {
          // Jika gambar belum dimuat, tunggu event onload
          lightboxImg.onload = () => {
            if (!panzoomInstance) {
              panzoomInstance = Panzoom(lightboxImg, {
                maxScale: 4,
                minScale: 1,
              });
              zoomInBtn.addEventListener("click", panzoomInstance.zoomIn);
              zoomOutBtn.addEventListener("click", panzoomInstance.zoomOut);
              panzoomElement.addEventListener(
                "wheel",
                panzoomInstance.zoomWithWheel
              );
            } else {
              panzoomInstance.reset({ animate: false });
            }
            lightboxImg.onload = null; // Hapus listener setelah dijalankan
          };
        }
      });
    });

    // Tutup lightbox
    function closeLightbox() {
      /* ... (logika sama, pastikan event listener dihapus) ... */
      lightboxOverlay.classList.remove("show");
      lightboxModal.classList.remove("show");
      if (panzoomInstance) {
        // Hapus event listener sebelum destroy (best practice)
        zoomInBtn.removeEventListener("click", panzoomInstance.zoomIn);
        zoomOutBtn.removeEventListener("click", panzoomInstance.zoomOut);
        panzoomElement.removeEventListener(
          "wheel",
          panzoomInstance.zoomWithWheel
        );
        panzoomInstance.destroy();
        panzoomInstance = null;
      }
    }
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxOverlay.addEventListener("click", (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });

    // Navigasi
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightboxImage(currentLightboxIndex + 1);
    });
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightboxImage(currentLightboxIndex - 1);
    });

    // Navigasi Keyboard
    document.addEventListener("keydown", (e) => {
      /* ... (logika sama) ... */
      if (lightboxModal.classList.contains("show")) {
        if (e.key === "ArrowRight")
          updateLightboxImage(currentLightboxIndex + 1);
        else if (e.key === "ArrowLeft")
          updateLightboxImage(currentLightboxIndex - 1);
        else if (e.key === "Escape") closeLightbox();
      }
    });
  } else {
    // Beri pesan jika elemen lightbox/Panzoom tidak ada atau library Panzoom belum dimuat
    if (typeof Panzoom === "undefined") {
      console.warn(
        "Library Panzoom.js belum dimuat. Fitur zoom tidak akan berfungsi."
      );
    } else {
      console.warn(
        "Salah satu elemen lightbox atau tombol zoom tidak ditemukan di HTML."
      );
    }
  }
} // Akhir dari renderProductDetail

/**
 * Menjalankan skrip untuk Halaman Artikel (Daftar & Detail).
 */
async function initializeAppArticlePages() {
  const isArticleListPage = document.querySelector(".article-grid");
  const isArticleDetailPage = document.querySelector(
    ".article-detail-container"
  );

  if (!isArticleListPage && !isArticleDetailPage) return; // Keluar jika bukan halaman artikel

  try {
    const response = await fetch("articles.json"); // Ambil data artikel
    if (!response.ok) throw new Error("Gagal memuat data artikel");
    const allArticlesData = await response.json();

    if (isArticleListPage) {
      renderArticleListPage(allArticlesData); // Render daftar artikel
    }
    if (isArticleDetailPage) {
      renderArticleDetailPage(allArticlesData); // Render detail artikel
    }
  } catch (error) {
    console.error("Error memuat artikel:", error);
    const container = isArticleListPage || isArticleDetailPage;
    if (container)
      container.innerHTML = `<p>Terjadi kesalahan saat memuat artikel.</p>`;
  }
}

/**
 * Fungsi untuk merender daftar artikel (termasuk filter tag).
 */
function renderArticleListPage(allArticlesData) {
  const articleGrid = document.querySelector(".article-grid");
  const recentArticlesList = document.getElementById("recent-articles-list"); // Sidebar
  const articlePageTitle = document.querySelector(
    ".article-section .article-title"
  );

  if (!articleGrid || !recentArticlesList || !articlePageTitle) return; // Pastikan elemen ada

  const params = new URLSearchParams(window.location.search);
  const tagFilter = params.get("tag"); // Cek apakah ada filter tag di URL

  // Filter artikel jika ada tag di URL
  const articlesToDisplay = tagFilter
    ? allArticlesData.filter(
        (article) =>
          Array.isArray(article.category) &&
          article.category.map((c) => c.trim()).includes(tagFilter)
      )
    : allArticlesData;

  // Update judul halaman jika ada filter tag
  if (tagFilter) {
    articlePageTitle.textContent = `Artikel dengan Tag: "${tagFilter}"`;
  }

  // Render artikel ke grid
  articleGrid.innerHTML = ""; // Kosongkan grid
  if (articlesToDisplay.length > 0) {
    articlesToDisplay.forEach((article) => {
      // Buat link tag
      const tagLinks = Array.isArray(article.category)
        ? article.category
            .map(
              (tag) =>
                `<a class="tag-link" href="list-artikel.html?tag=${encodeURIComponent(
                  tag.trim()
                )}">${tag.trim()}</a>`
            )
            .join(" ")
        : "";

      const articleHTML = `
        <div class="featured-article">
          <div class="article-meta-info">
            <span>${article.date || "Tanggal tidak tersedia"}</span>
            ${
              tagLinks
                ? `<div class="tag-wrapper"><span>Tags: </span>${tagLinks}</div>`
                : ""
            }
          </div>
          <div class="article-main-content">
            <div class="article-image">
              <a href="detail-artikel.html?id=${article.id}">
                <img src="${article.image || "placeholder.jpg"}" alt="${
        article.title || "Judul Artikel"
      }">
              </a>
            </div>
            <h2 class="article-card-title">
              <a href="detail-artikel.html?id=${article.id}">${
        article.title || "Judul Artikel"
      }</a>
            </h2>
            <p class="article-card-excerpt">${article.excerpt || ""}</p>
            <a href="detail-artikel.html?id=${
              article.id
            }" class="read-more-btn">Read more</a>
          </div>
        </div>`;
      articleGrid.insertAdjacentHTML("beforeend", articleHTML);
    });
  } else {
    // Pesan jika tidak ada artikel
    articleGrid.innerHTML = `<p>Tidak ada artikel yang ditemukan${
      tagFilter ? ` dengan tag "${tagFilter}"` : ""
    }. <a href="list-artikel.html">Lihat semua artikel</a>.</p>`;
  }

  // Render artikel terbaru di sidebar
  recentArticlesList.innerHTML = "";
  // Ambil 5 artikel terbaru (atau semua jika kurang dari 5)
  const recentArticles = allArticlesData.slice(0, 5);
  recentArticles.forEach((article) => {
    const recentArticleHTML = `
      <li>
        <a href="detail-artikel.html?id=${article.id}">${
      article.title || "Judul Artikel"
    }</a>
        <div class="post-date">${article.date || ""}</div>
      </li>`;
    recentArticlesList.insertAdjacentHTML("beforeend", recentArticleHTML);
  });
}

/**
 * Fungsi untuk merender detail artikel.
 */
function renderArticleDetailPage(allArticlesData) {
  const container = document.querySelector(".article-detail-container");
  if (!container) return; // Pastikan elemen ada

  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id"); // Ambil ID artikel dari URL
  const article = allArticlesData.find((a) => a.id === articleId); // Cari artikel berdasarkan ID

  if (article) {
    // Render detail artikel jika ditemukan
    // Pastikan category adalah array sebelum join
    const categoriesText = Array.isArray(article.category)
      ? article.category.join(", ")
      : "Tidak ada kategori";
    container.innerHTML = `
      <a href="list-artikel.html" class="back-to-articles">
        <i class="fas fa-arrow-left"></i> Kembali ke Semua Artikel
      </a>
      <img src="${article.image || "placeholder.jpg"}" alt="${
      article.title || "Judul Artikel"
    }" class="article-detail-header-image">
      <h1 class="article-detail-title">${article.title || "Judul Artikel"}</h1>
      <p class="article-meta">
        <span>${article.date || "Tanggal tidak tersedia"}</span> |
        <span>Kategori: ${categoriesText}</span>
      </p>
      <div class="article-body">${
        article.content || "<p>Konten tidak tersedia.</p>"
      }</div>`;

    // Jika ada gambar blok di dalam konten, tambahkan kelas
    container.querySelectorAll(".article-body img").forEach((img) => {
      img.classList.add("article-image-block");
    });
  } else {
    // Tampilkan pesan jika artikel tidak ditemukan
    container.innerHTML = `<h1 style="text-align: center;">Artikel tidak ditemukan.</h1>`;
  }
}
