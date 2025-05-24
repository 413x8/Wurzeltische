// Scroll-Verhalten für Navigation
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 30,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scrollspy
function setupScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.scroll-nav a');

  window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// Autoplay-Slider für Werkstatt
function setupSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.nav-dot');
  let currentIndex = 0;
  let intervalId;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoplay() {
    intervalId = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(intervalId);
    startAutoplay();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index, 10);
      showSlide(index);
      resetAutoplay();
    });
  });

  showSlide(0);
  startAutoplay();
}

// Künstler-Bildvorschau & Karussell
function setupKuenstlerCarousel() {
  const track = document.getElementById("carousel-track");
  const preview = document.getElementById("kuenstler-preview").querySelector("img");
  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");
  const images = track.querySelectorAll("img");
  const imageWidth = 250 + 16; // Bildbreite + Padding (0.5em ≈ 16px)
  let currentIndex = 0;

function updateCarousel() {
  const imageWidth = 250 + 16; // Bild + Padding
  const visibleCount = 3;
  const half = Math.floor(visibleCount / 2);
  const track = document.getElementById("carousel-track");
  const images = track.querySelectorAll("img");
  const preview = document.getElementById("kuenstler-preview").querySelector("img");

  // Vorschau oben setzen
  const currentImage = images[currentIndex % images.length];
  preview.src = currentImage.src;
  preview.alt = currentImage.alt;

  // Markierung setzen
  images.forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });

  // Karussell verschieben, sodass aktuelles Bild zentriert ist
  let scrollIndex = currentIndex - half;
  if (scrollIndex < 0) scrollIndex = 0;
  if (scrollIndex > images.length - visibleCount) {
    scrollIndex = images.length - visibleCount;
  }

  const offset = scrollIndex * imageWidth;
  track.style.transform = `translateX(-${offset}px)`;
}



  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
}



// Loader und Scroll-Reveal
function setupLoaderAndReveal() {
  window.addEventListener('load', () => {
    const loader = document.getElementById('logo-loader');

    // Warte, bis der Ladebalken fertig ist (Zoom + Progress)
    setTimeout(() => {
      loader.style.transition = "opacity 1s ease";
      loader.style.opacity = "0";
    }, 4500);

    setTimeout(() => {
      loader.style.display = 'none';
    }, 5500);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// Initialisierung
window.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupScrollSpy();
  setupSlider();
  setupKuenstlerCarousel();
  setupLoaderAndReveal();
});
