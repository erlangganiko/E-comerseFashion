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
    // Toggle body overflow based on menu state
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

  // Set initial overflow state to 'auto' to prevent sticking on page load
  document.body.style.overflow = "auto";

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Navbar transparansi dan sembunyi/tampil
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

    // Hero section video transition logic (one-way trip)
    if (window.innerWidth >= 768) {
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

  const sideImageContainers = document.querySelectorAll(
    ".side-image-container"
  );
  console.log(sideImageContainers);

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
});
