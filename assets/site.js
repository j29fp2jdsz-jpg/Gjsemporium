const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

nav?.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
});

document.querySelectorAll('[data-showcase-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const viewport = carousel.querySelector('.carousel-viewport');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;
  let startX = null;

  if (slides.length < 2) return;

  slides.forEach((_, slideIndex) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show image ${slideIndex + 1}`);
    dot.addEventListener('click', () => {
      show(slideIndex);
      restart();
    });
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.querySelectorAll('.carousel-dot')];

  function show(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      const image = slide.querySelector('img');
      if (image) image.tabIndex = active ? 0 : -1;
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function restart() {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => show(index + 1), 5000);
  }

  prev?.addEventListener('click', () => {
    show(index - 1);
    restart();
  });
  next?.addEventListener('click', () => {
    show(index + 1);
    restart();
  });
  viewport?.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  }, { passive: true });
  viewport?.addEventListener('touchend', (event) => {
    if (startX === null) return;
    const delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) show(index + (delta < 0 ? 1 : -1));
    startX = null;
    restart();
  }, { passive: true });
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  carousel.addEventListener('focusin', () => clearInterval(timer));
  carousel.addEventListener('focusout', restart);
  show(0);
  restart();
});

const carouselLightbox = document.querySelector('.carousel-lightbox');
let lightboxTrigger = null;

function openCarouselImage(image) {
  if (!carouselLightbox) return;
  lightboxTrigger = image;
  const enlarged = carouselLightbox.querySelector('img');
  const title = image.closest('.carousel-slide')?.querySelector('figcaption strong')?.textContent || image.alt;
  enlarged.src = image.currentSrc || image.src;
  enlarged.alt = image.alt;
  carouselLightbox.querySelector('p').textContent = title;
  carouselLightbox.showModal();
}

document.querySelectorAll('.carousel-slide img').forEach((image) => {
  image.tabIndex = image.closest('.carousel-slide')?.classList.contains('is-active') ? 0 : -1;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `Enlarge image: ${image.alt}`);
  image.addEventListener('click', () => openCarouselImage(image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCarouselImage(image);
    }
  });
});

carouselLightbox?.querySelector('.carousel-lightbox-close')?.addEventListener('click', () => carouselLightbox.close());
carouselLightbox?.addEventListener('click', (event) => {
  if (event.target === carouselLightbox) carouselLightbox.close();
});
carouselLightbox?.addEventListener('close', () => {
  carouselLightbox.querySelector('img').src = '';
  lightboxTrigger?.focus();
});
