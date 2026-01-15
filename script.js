'use strict';

const images = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close');
const filterButtons = document.querySelectorAll('.filters button');

let currentIndex = 0;

/* FILTERING */
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filters .active').classList.remove('active');
    button.classList.add('active');

    const filter = button.dataset.filter;

    images.forEach(img => {
      img.style.display =
        filter === 'all' || img.dataset.category === filter
          ? 'block'
          : 'none';
    });
  });
});

/* LIGHTBOX OPEN */
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(img.src);
  });
});

function openLightbox(src) {
  if (!src) return; 
  // to prevent opening empty placeholders
  lightboxImage.src = src;
  lightbox.classList.remove('hidden');
}

/* LIGHTBOX CLOSE */
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.add('hidden');
}

/* KEYBOARD NAVIGATION */
document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('hidden')) return;

  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'Escape') closeLightbox();
});

function navigate(direction) {
  do {
    currentIndex = (currentIndex + direction + images.length) % images.length;
  } while (!images[currentIndex].src);

  lightboxImage.src = images[currentIndex].src;
}
