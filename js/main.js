document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const heroSection = document.getElementById("hero-section");
  const sideImages = document.querySelectorAll(".side-image-container");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuCloseBtn = document.querySelector(".menu-close-btn");
  const menuOverlay = document.getElementById("menu-overlay");

  let lastScrollY = window.scrollY;
  let hasScrolledDown = false;

  const toggleMenu = () => {
    menuOverlay.classList.toggle("open");
    document.body.style.overflow = menuOverlay.classList.contains("open")
      ? "hidden"
      : "auto";
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", toggleMenu);
  }

  // --- Efek Scroll Navbar & Hero Section (Diperbaiki) ---
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Logika untuk menyembunyikan/menampilkan navbar
    if (currentScrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }
    lastScrollY = currentScrollY;

    // Logika untuk animasi hero section (hanya berjalan sekali di desktop)
    if (window.innerWidth >= 768) {
      if (!hasScrolledDown && currentScrollY > 0) {
        heroSection.classList.add("scrolled");
        sideImages.forEach((img) => img.classList.add("show"));
        hasScrolledDown = true;
      }
    }
  });

  // --- Logika untuk menjaga tampilan saat refresh dan di mode HP ---
  const checkInitialState = () => {
    // Jika di desktop dan sudah di-scroll, pertahankan tampilan 3 kolom
    if (window.innerWidth >= 768 && window.scrollY > 0) {
      heroSection.classList.add("scrolled");
      sideImages.forEach((img) => img.classList.add("show"));
      hasScrolledDown = true;
    }
    // Jika di mobile, pastikan gambar samping selalu terlihat
    else if (window.innerWidth < 768) {
      heroSection.classList.remove("scrolled");
      sideImages.forEach((img) => img.classList.add("show"));
    }
  };
  checkInitialState();

  // ==========================================================
  // LOGIKA SLIDER & LAINNYA DI BAWAH SINI (TIDAK DIUBAH)
  // ==========================================================
  const storysliders = document.querySelectorAll(".story-image-slider");

  if (storysliders.length > 0) {
    storysliders.forEach((slider) => {
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
        pagination.forEach((bar) => bar.classList.remove("active"));
        images.forEach((img) => img.classList.remove("active"));
        titles.forEach((title) => title.classList.remove("active"));
        pagination.forEach((bar) => {
          const span = bar.querySelector("span");
          if (span) {
            span.style.animation = "none";
            span.offsetWidth;
            span.style.animation = null;
          }
        });
        if (direction !== 0) {
          slideId = slideId + direction;
        }
        if (slideId >= images.length) {
          slideId = 0;
        } else if (slideId < 0) {
          slideId = images.length - 1;
        }
        pagination.forEach((bar, index) => {
          if (index < slideId) {
            bar.classList.add("bar-filled");
          } else {
            bar.classList.remove("bar-filled");
          }
        });
        images[slideId].classList.add("active");
        titles[slideId].classList.add("active");
        pagination[slideId].classList.add("active");
        resetTimer();
      }
      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          updateSlide(-1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          updateSlide(1);
        });
      }
      if (playPauseBtn) {
        playPauseBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          isPaused = !isPaused;
          slider.classList.toggle("paused", isPaused);
          if (isPaused) {
            clearInterval(automaticSlider);
          } else {
            updateSlide(0);
          }
        });
      }
      slider.addEventListener("click", (e) => {
        if (!e.target.closest(".slider-nav div")) {
          updateSlide(1);
        }
      });
      updateSlide(0);
    });
  }

  // ==========================================================
  // LOGIKA UNTUK FOOTER ACCORDION
  // ==========================================================
  const footerToggles = document.querySelectorAll(".footer-toggle");

  footerToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const submenu = toggle.nextElementSibling;
      toggle.classList.toggle("active");
      if (submenu && submenu.classList.contains("footer-submenu")) {
        submenu.classList.toggle("open");
      }
    });
  });
});

const allProductsData = [
  {
    id: "product-1",
    name: "Adidas Samba OG Preloved Red Leopard Womens",
    price: 12998000,
    date: 12,
    available: true,
    images: [
      "Asset/catalog/Shoes/Adidas Samba OG Preloved Red Leopard Womens/front/Adidas-Samba-OG-_Preloved-Red-Leopard_-Women_s-front-side-single-2_1000x.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Shoes/Adidas Samba OG Preloved Red Leopard Womens/back/Adidas-Samba-OG-_Preloved-Red-Leopard_-Women_s-back-side-single_1000x.webp", // Tampilan Belakang
      "Asset/catalog/Shoes/Adidas Samba OG Preloved Red Leopard Womens/detail/Adidas-Samba-OG-_Preloved-Red-Leopard_-Women_s-side_1000x.webp", // Tampilan Detail
      "Asset/catalog/Shoes/Adidas Samba OG Preloved Red Leopard Womens/label/Adidas-Samba-OG-_Preloved-Red-Leopard_-Women_s-top-down_1000x.webp", // Tampilan Label
    ],
  },
  {
    id: "product-2",
    name: "Nike Kwondo 1 x GDragon Peaceminusone Triple White",
    price: 13999000,
    date: 11,
    available: false,
    images: [
      "Asset/catalog/Shoes/Kwondo 1 x G-Dragon Peaceminusone Panda/front/front.jpeg", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Shoes/Kwondo 1 x G-Dragon Peaceminusone Panda/detail/detail.jpeg", // Tampilan Belakang
      "Asset/catalog/Shoes/Kwondo 1 x G-Dragon Peaceminusone Panda/detail/detail.jpeg", // Tampilan Detail
      "Asset/catalog/Shoes/Kwondo 1 x G-Dragon Peaceminusone Panda/label/label.jpeg", // Tampilan Label
    ],
  },
  {
    id: "product-3",
    name: "Geedup x Trapstar Team Logo x Irongate T Trackpant White Marle  Grey 2025",
    price: 13899000,
    date: 10,
    available: false,
    images: [
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant White Marle  Grey 2025/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant White Marle  Grey 2025/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant White Marle  Grey 2025/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant White Marle  Grey 2025/label/label.webp", // Tampilan Label
    ],
  },
  {
    id: "product-4",
    name: "Geedup x Trapstar Team Logo x Irongate T Trackpant Black  White 2025",
    price: 24998800,
    date: 9,
    available: true,
    images: [
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant Black  White 2025/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant Black  White 2025/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant Black  White 2025/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Pants/Geedup x Trapstar Team Logo x Irongate T Trackpant Black  White 2025/label/label.webp", // Tampilan Label
    ],
  },
  {
    id: "product-5",
    name: "BAPE Logo Nylon Relaxed Fit Shorts Black",
    price: 21020300,
    date: 8,
    available: true,
    images: [
      "Asset/catalog/Pants/BAPE Logo Nylon Relaxed Fit Shorts Black/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Pants/BAPE Logo Nylon Relaxed Fit Shorts Black/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Pants/BAPE Logo Nylon Relaxed Fit Shorts Black/detail/detail.jpeg", // Tampilan Detail
      "Asset/catalog/Pants/BAPE Logo Nylon Relaxed Fit Shorts Black/label/label.webp", // Tampilan Label
    ],
  },
  {
    id: "product-8",
    name: "BAPE Shark Tee #1 Black",
    price: 11998800,
    date: 7,
    available: true,
    images: [
      "Asset/catalog/Clothes/BAPE Shark Tee 1 Black/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Clothes/BAPE Shark Tee 1 Black/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Clothes/BAPE Shark Tee 1 Black/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Clothes/BAPE Shark Tee 1 Black/label/detail.webp", // Tampilan Label
    ],
  },
  {
    id: "product-9",
    name: "Nike x NOCTA NRG Big Body CS T-Shirt Black 2024",
    price: 11998000,
    date: 6,
    available: true,
    images: [
      "Asset/catalog/Clothes/Nike x NOCTA NRG Big Body CS T-Shirt Black 2024/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Clothes/Nike x NOCTA NRG Big Body CS T-Shirt Black 2024/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Clothes/Nike x NOCTA NRG Big Body CS T-Shirt Black 2024/detail/back.webp", // Tampilan Detail
      "Asset/catalog/Clothes/Nike x NOCTA NRG Big Body CS T-Shirt Black 2024/label/label.webp", // Tampilan Label
    ],
  },
  {
    id: "product-8",
    name: "Kaws x Uniqlo Warhol UT Graphic 476423 Kids T-Shirt White 2024",
    price: 11699000,
    date: 5,
    available: true,
    images: [
      "Asset/catalog/Clothes/Kaws x Uniqlo Warhol UT Graphic 476423 Kids T-Shirt White 2024/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Clothes/Kaws x Uniqlo Warhol UT Graphic 476423 Kids T-Shirt White 2024/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Clothes/Kaws x Uniqlo Warhol UT Graphic 476423 Kids T-Shirt White 2024/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Clothes/Kaws x Uniqlo Warhol UT Graphic 476423 Kids T-Shirt White 2024/label/front.webp", // Tampilan Label
    ],
  },
  {
    id: "product-9",
    name: "KAWS x Uniqlo Warhol UT Graphic 476352 T-shirt Black 2024",
    price: 12000000,
    date: 4,
    available: true,
    images: [
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476352 T-shirt Black 2024/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476352 T-shirt Black 2024/bacl/back.webp", // Tampilan Belakang
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476352 T-shirt Black 2024/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476352 T-shirt Black 2024/label/back.webp", // Tampilan Label
    ],
  },
  {
    id: "product-10",
    name: "KAWS x Uniqlo Warhol UT Graphic 476351 T-shirt Black 2024",
    price: 15100000,
    date: 3,
    available: true,
    images: [
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476351 T-shirt Black 2024/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476351 T-shirt Black 2024/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476351 T-shirt Black 2024/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Clothes/KAWS x Uniqlo Warhol UT Graphic 476351 T-shirt Black 2024/label/back.webp", // Tampilan Label
    ],
  },
  {
    id: "product-11",
    name: "Geedup x Arrdee Handstyle Hoodie Black  Multi 2025",
    price: 13500000,
    date: 2,
    available: true,
    images: [
      "Asset/catalog/Hoodie/Geedup x Arrdee Handstyle Hoodie Black  Multi 2025/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Hoodie/Geedup x Arrdee Handstyle Hoodie Black  Multi 2025/back/front.webp", // Tampilan Belakang
      "Asset/catalog/Hoodie/Geedup x Arrdee Handstyle Hoodie Black  Multi 2025/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Hoodie/Geedup x Arrdee Handstyle Hoodie Black  Multi 2025/label/label.webp", // Tampilan Label
    ],
  },
  {
    id: "product-12",
    name: "Geedup Team Logo Hooded Jacket Black 2025",
    price: 14800000,
    date: 1,
    available: true,
    images: [
      "Asset/catalog/Hoodie/Geedup Team Logo Hooded Jacket Black 2025/front/front.webp", // Tampilan Depan (Gambar Utama)
      "Asset/catalog/Hoodie/Geedup Team Logo Hooded Jacket Black 2025/back/back.webp", // Tampilan Belakang
      "Asset/catalog/Hoodie/Geedup Team Logo Hooded Jacket Black 2025/detail/detail.webp", // Tampilan Detail
      "Asset/catalog/Hoodie/Geedup Team Logo Hooded Jacket Black 2025/label/label.webp", // Tampilan Label
    ],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const catalogGrid = document.querySelector(".product-grid-catalog");
  if (catalogGrid) {
    const availabilityFilter = document.getElementById("filter-availability");
    const priceFilter = document.getElementById("filter-price");
    const sortBy = document.getElementById("sort-by");
    const productCount = document.querySelector(".product-count");
    const WISHLIST_KEY = "my_wishlist";
    const getWishlist = () =>
      JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    const saveWishlist = (wishlist) =>
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    const toggleWishlist = (productId) => {
      let wishlist = getWishlist();
      const index = wishlist.indexOf(productId);
      if (index > -1) {
        wishlist.splice(index, 1);
      } else {
        wishlist.push(productId);
      }
      saveWishlist(wishlist);
    };
    const updateWishlistIcons = () => {
      const wishlist = getWishlist();
      document.querySelectorAll(".product-item-catalog").forEach((item) => {
        const icon = item.querySelector(".wishlist-icon");
        if (icon && wishlist.includes(item.dataset.id)) {
          icon.classList.add("active");
        } else if (icon) {
          icon.classList.remove("active");
        }
      });
    };
    function renderProducts() {
      const availabilityValue = availabilityFilter.value;
      const priceValue = priceFilter.value;
      const sortValue = sortBy.value;
      let filteredProducts = allProductsData.filter((product) => {
        if (availabilityValue === "in-stock" && !product.available)
          return false;
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
        const mainImage = product.images[0];
        const productHTML = `
              <a href="detail-barang.html?id=${
                product.id
              }" class="product-item-catalog" data-id="${product.id}">
                  <span class="wishlist-icon">
                    <i class="far fa-heart"></i>
                    <i class="fas fa-heart"></i>
                  </span>
                  <img src="${mainImage}" alt="${product.name}" />
                  <p class="product-code">${product.name}</p>
                  <p class="product-price">Rp ${product.price.toLocaleString(
                    "id-ID"
                  )}</p>
              </a>
          `;
        catalogGrid.insertAdjacentHTML("beforeend", productHTML);
      });
      productCount.textContent = `${filteredProducts.length} products`;
      updateWishlistIcons();
    }
    catalogGrid.addEventListener("click", function (event) {
      const productLink = event.target.closest(".product-item-catalog");
      if (event.target.closest(".wishlist-icon")) {
        event.preventDefault();
        const productId = productLink.dataset.id;
        toggleWishlist(productId);
        updateWishlistIcons();
        return;
      }
      if (productLink) {
      }
    });
    availabilityFilter.addEventListener("change", renderProducts);
    priceFilter.addEventListener("change", renderProducts);
    sortBy.addEventListener("change", renderProducts);
    renderProducts();
  }
  const productDetailGrid = document.querySelector(".product-detail-grid");
  if (productDetailGrid) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = allProductsData.find((p) => p.id === productId);
    if (product) {
      document.getElementById("product-detail-title").textContent =
        product.name;
      document.getElementById(
        "product-detail-price"
      ).textContent = `Rp ${product.price.toLocaleString("id-ID")}`;
      const mainImage = document.getElementById("product-detail-image");
      const thumbnailsContainer = document.querySelector(".product-thumbnails");
      thumbnailsContainer.innerHTML = "";
      product.images.forEach((imgSrc, index) => {
        const thumbnailHTML = `
            <img src="${imgSrc}" 
                 alt="${product.name} view ${index + 1}" 
                 class="thumbnail-item ${index === 0 ? "active" : ""}">
        `;
        thumbnailsContainer.insertAdjacentHTML("beforeend", thumbnailHTML);
      });
      mainImage.src = product.images[0];
      const thumbnails = document.querySelectorAll(".thumbnail-item");
      thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", function () {
          mainImage.src = this.src;
          thumbnails.forEach((t) => t.classList.remove("active"));
          this.classList.add("active");
        });
      });
    } else {
      productDetailGrid.innerHTML = `<h1 style="text-align: center; width: 100%;">Produk dengan ID '${productId}' tidak ditemukan.</h1>`;
    }
  }
});
