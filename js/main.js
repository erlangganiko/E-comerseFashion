document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const heroSection = document.getElementById("hero-section");
  const sideImages = document.querySelectorAll(".side-image-container");

  let lastScrollY = window.scrollY;
  let hasScrolledDown = false;
  let isAnimating = false;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Disable animation on small screens
    if (window.innerWidth < 768) {
      return;
    }

    // Block scroll events during animation
    if (isAnimating) {
      window.scrollTo(0, lastScrollY);
      return;
    }

    // Navbar logic
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }
    lastScrollY = currentScrollY;

    // Hero section video transition logic (one-way trip)
    if (!hasScrolledDown && currentScrollY > 0) {
      isAnimating = true;
      document.body.style.overflowY = "hidden";

      heroSection.classList.add("scrolled");
      sideImages.forEach((img) => img.classList.remove("hidden"));

      setTimeout(() => {
        isAnimating = false;
        document.body.style.overflowY = "scroll";
        hasScrolledDown = true;
      }, 800); // Duration of the CSS transition
    }
  });
});
