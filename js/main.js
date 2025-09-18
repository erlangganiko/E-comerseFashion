document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const heroSection = document.getElementById("hero-section");
  const sideImages = document.querySelectorAll(".side-image-container");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuCloseBtn = document.querySelector(".menu-close-btn");
  const menuOverlay = document.getElementById("menu-overlay");

  let lastScrollY = window.scrollY;
  let hasScrolledDown = false;
  let isAnimating = false;

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

  document.body.style.overflow = "auto";

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

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

    // Tambahkan pengecekan if di sini
    if (heroSection && window.innerWidth >= 768) {
      if (!hasScrolledDown && currentScrollY > 0) {
        isAnimating = true;
        document.body.style.overflowY = "hidden";

        heroSection.classList.add("scrolled");
        sideImages.forEach((img) => img.classList.remove("hidden"));

        setTimeout(() => {
          isAnimating = false;
          document.body.style.overflowY = "scroll";
          hasScrolledDown = true;
        }, 800);
      }
    }
  });

  const storysliders = document.querySelectorAll(".story-image-slider");

  // Tambahkan pengecekan if di sini
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

  const sideImageContainers = document.querySelectorAll(
    ".side-image-container"
  );

  // Tambahkan pengecekan if di sini
  if (sideImageContainers.length > 0) {
    const triggerPoint = 0;

    function handleScroll() {
      if (window.scrollY > triggerPoint) {
        sideImageContainers.forEach((container) => {
          container.classList.add("show");
        });
      } else {
        sideImageContainers.forEach((container) => {
          container.classList.remove("show");
        });
      }
    }

    window.addEventListener("scroll", handleScroll);
  }

  // --- Catalog Filter and Sort Functionality ---
  const catalogGrid = document.querySelector(".product-grid-catalog");

  if (catalogGrid) {
    const products = Array.from(catalogGrid.querySelectorAll(".product-item-catalog"));
    const availabilityFilter = document.getElementById("filter-availability");
    const priceFilter = document.getElementById("filter-price");
    const sortBy = document.getElementById("sort-by");
    const productCount = document.querySelector(".product-count");

    const updateProducts = () => {
      // 1. Filtering
      const availabilityValue = availabilityFilter.value;
      const priceValue = priceFilter.value;

      const visibleProducts = products.filter(product => {
        // Availability filter
        const isAvailable = product.getAttribute('data-available') === 'true';
        if (availabilityValue === 'in-stock' && !isAvailable) {
          return false;
        }

        // Price filter
        const price = parseFloat(product.getAttribute('data-price'));
        if (priceValue === 'low' && price >= 12000000) {
          return false;
        }
        if (priceValue === 'medium' && (price < 12000000 || price > 14000000)) {
          return false;
        }
        if (priceValue === 'high' && price <= 14000000) {
          return false;
        }

        return true; // Keep product if it passes all filters
      });

      // 2. Sorting
      const sortValue = sortBy.value;
      visibleProducts.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        const dateA = parseInt(a.getAttribute('data-date'));
        const dateB = parseInt(b.getAttribute('data-date'));

        switch (sortValue) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'date-asc':
            return dateA - dateB;
          case 'date-desc':
          default:
            return dateB - dateA;
        }
      });

      // 3. Re-render the grid
      catalogGrid.innerHTML = ""; // Clear the grid
      visibleProducts.forEach(product => {
        catalogGrid.appendChild(product);
      });

      // 4. Update product count
      productCount.textContent = `${visibleProducts.length} products`;
    };

    // --- Event Listeners ---
    availabilityFilter.addEventListener('change', updateProducts);
    priceFilter.addEventListener('change', updateProducts);
    sortBy.addEventListener('change', updateProducts);

    // Initial call to set the default sort order
    updateProducts();
  }
const productLinks = document.querySelectorAll(".product-item-catalog");

  productLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah navigasi standar

      const name = encodeURIComponent(this.dataset.name);
      const price = this.dataset.price;
      const img = encodeURIComponent(this.dataset.img);

      // Membuat URL dengan parameter
      const detailUrl = `detail-barang.html?name=${name}&price=${price}&img=${img}`;

      // Arahkan ke halaman detail
      window.location.href = detailUrl;
    });
  });

  // --- Product Detail Page Dynamic Content ---
  // Cek apakah kita berada di halaman detail produk
  if (window.location.pathname.endsWith("detail-barang.html")) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const price = params.get('price');
    const img = params.get('img');

    if (name && price && img) {
      // Update elemen di halaman
      document.getElementById('product-detail-title').textContent = name;
      document.getElementById('product-detail-image').src = img;
      document.getElementById('product-detail-image').alt = name;

      // Format harga
      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(price);
      document.getElementById('product-detail-price').textContent = formattedPrice;
    }
  }

  // --- Wishlist Functionality ---
  const WISHLIST_STORAGE_KEY = 'bdgfw_wishlist';

  // Function to get wishlist items from localStorage
  const getWishlist = () => {
    const wishlistJson = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlistJson ? JSON.parse(wishlistJson) : [];
  };

  // Function to save wishlist items to localStorage
  const saveWishlist = (wishlist) => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  };

  // Function to toggle product in wishlist
  const toggleWishlist = (productId, iconElement) => {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);

    if (index > -1) {
      // Product is in wishlist, remove it
      wishlist.splice(index, 1);
      iconElement.classList.remove('active');
    } else {
      // Product is not in wishlist, add it
      wishlist.push(productId);
      iconElement.classList.add('active');
    }
    saveWishlist(wishlist);
  };

  // Initialize wishlist icons on page load
  const initializeWishlistIcons = () => {
    const wishlist = getWishlist();
    document.querySelectorAll(".product-item-catalog").forEach(productItem => {
      const productId = productItem.dataset.id;
      const wishlistIcon = productItem.querySelector(".wishlist-icon");

      if (wishlist.includes(productId)) {
        wishlistIcon.classList.add('active');
      } else {
        wishlistIcon.classList.remove('active');
      }

      // Add click listener for wishlist icon
      // Use event delegation to prevent navigating to detail page when clicking icon
      wishlistIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Stop event from bubbling up to product item link
        event.preventDefault(); // Prevent default link behavior for the icon
        toggleWishlist(productId, this);
      });
    });
  };

  // Run initialization when catalog grid is present
  if (catalogGrid) { // Using the existing check for catalogGrid from filter/sort
    // ... existing filter/sort code ...

    // Call initializeWishlistIcons after products are rendered/updated
    // This is important because products might be re-rendered by filters/sort
    const originalUpdateProducts = updateProducts; // Keep a reference to the original function
    updateProducts = () => { // Override updateProducts
      originalUpdateProducts(); // Run the original filtering and sorting
      initializeWishlistIcons(); // Then re-initialize wishlist icons
    };
    updateProducts(); // Call once on initial load

    // ... ensure existing event listeners are still added for filters/sort ...
    availabilityFilter.addEventListener('change', updateProducts);
    priceFilter.addEventListener('change', updateProducts);
    sortBy.addEventListener('change', updateProducts);
  }
});
