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

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOverlay = document.getElementById("menu-overlay");

  let lastScrollY = window.scrollY;

  // Function untuk menangani efek scroll
  window.addEventListener("scroll", () => {
    // Efek Sembunyi/Tampil
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;

    // Efek Transparan
    if (window.scrollY === 0) {
      navbar.classList.add("transparent");
    } else {
      navbar.classList.remove("transparent");
    }
  });

  // Panggil saat halaman dimuat untuk mengecek posisi awal
  if (window.scrollY === 0) {
    navbar.classList.add("transparent");
  }

  // Toggle Menu Hamburger
  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.toggle("open");
    navbar.classList.toggle("menu-open");
  });
});


const storysliders = document.querySelectorAll(".story-image-slider");

storysliders.forEach(slider => {
    const pagination = slider.querySelectorAll(".progress-bar");
    const images = slider.querySelectorAll(".images img");
    const titles = slider.querySelectorAll(".title h1");
    const prevBtn = slider.querySelector(".prev-btn");
    const nextBtn = slider.querySelector(".next-btn");
    const playPauseBtn = slider.querySelector(".play-pause-btn"); // Ambil tombol play/pause

    let slideId = 0;
    let automaticSlider;
    let isPaused = false; // Tambahkan state untuk status pause

    function resetTimer() {
        clearInterval(automaticSlider);
        // Hanya jalankan timer jika tidak sedang di-pause
        if (!isPaused) {
            automaticSlider = setInterval(() => updateSlide(1), 4000);
        }
    }

    function updateSlide(direction = 1) {
        // Hapus kelas 'active' dari semua elemen terlebih dahulu
        pagination.forEach(bar => bar.classList.remove("active"));
        images.forEach(img => img.classList.remove("active"));
        titles.forEach(title => title.classList.remove("active"));

        // Hapus animasi progress bar sebelumnya
        pagination.forEach(bar => {
            const span = bar.querySelector("span");
            if (span) {
                span.style.animation = 'none'; // Reset animasi
                span.offsetWidth; // Trigger reflow
                span.style.animation = null; // Hapus style animasi
            }
        });

        // Tentukan slideId berikutnya. Jika direction 0, slideId tidak berubah.
        // Ini digunakan untuk me-refresh timer saat menekan tombol play.
        if (direction !== 0) {
            slideId = slideId + direction;
        }

        // Atur ulang jika sudah mencapai akhir atau awal
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

        // Tambahkan kelas 'active' ke elemen saat ini
        images[slideId].classList.add("active");
        titles[slideId].classList.add("active");
        pagination[slideId].classList.add("active");

        resetTimer(); // Reset timer setiap kali slide diperbarui
    }

    // Event listener untuk tombol prev
    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            updateSlide(-1);
        });
    }

    // Event listener untuk tombol next
    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            updateSlide(1);
        });
    }

    // Event listener untuk tombol play/pause
    if (playPauseBtn) {
        playPauseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isPaused = !isPaused; // Toggle status pause
            slider.classList.toggle('paused', isPaused); // Tambah/hapus class .paused

            if (isPaused) {
                // Jika sekarang di-pause, hentikan interval
                clearInterval(automaticSlider);
            } else {
                // Jika sekarang play, refresh slide saat ini untuk memulai ulang timer dan animasi
                updateSlide(0);
            }
        });
    }


    // Event listener untuk klik pada container slider (maju otomatis)
    slider.addEventListener("click", (e) => {
        // Hanya melanjutkan jika klik tidak berasal dari tombol navigasi
        if (!e.target.closest(".slider-nav div")) {
            updateSlide(1);
        }
    });

    // Inisialisasi awal
    updateSlide(0); // Panggil sekali untuk inisialisasi slide pertama
});
