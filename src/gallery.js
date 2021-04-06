import imagesRefs from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBtnRef = document.querySelector('.lightbox__button');
const lightboxImageRef = document.querySelector('.lightbox__image');

const imagesMurkup = imagesRefs
  .map(
    ({ preview, description, original }) =>
      `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`,
  )
  .join('');

galleryRef.insertAdjacentHTML('afterbegin', imagesMurkup);

const galleryLinkRefs = document.querySelectorAll('.gallery__link');

const onGalleryLinckClick = event => {
  event.preventDefault();
  lightBoxRef.classList.toggle('is-open');
  imagesRefs.forEach(img => {
    if (event.currentTarget.href === img.original) {
      console.log(img.original);
      lightboxImageRef.src = img.original;
      lightboxImageRef.alt = img.description;
    }
  });
  console.log(lightboxImageRef);
};

const onLightBtnClick = () => {
  lightBoxRef.classList.toggle('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
};

galleryLinkRefs.forEach(btn => btn.addEventListener('click', onGalleryLinckClick));
lightBtnRef.addEventListener('click', onLightBtnClick);
