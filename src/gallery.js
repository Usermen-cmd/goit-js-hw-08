import imagesRefs from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBtnRef = document.querySelector('.lightbox__button');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

const getImagesMarkup = array => {
  return array
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
};

const imagesMarkup = getImagesMarkup(imagesRefs);

galleryRef.insertAdjacentHTML('afterbegin', imagesMarkup);

const galleryLinkRefs = document.querySelectorAll('.gallery__link');

const onGalleryLinkClick = event => {
  event.preventDefault();

  lightBoxRef.classList.toggle('is-open');

  lightBoxRef.title = 'Click "right" or "left" to switch picture';
  setTimeout(() => {
    lightBoxRef.removeAttribute('title');
  }, 4000);

  const currentDatasetSourse = event.currentTarget.firstElementChild.dataset.source;

  imagesRefs.forEach(img => {
    if (currentDatasetSourse === img.original) {
      lightboxImageRef.src = img.original;
      lightboxImageRef.alt = img.description;
      window.addEventListener('keydown', onKeyboardClick);
      lightboxOverlayRef.addEventListener('click', onOverlayClick);
    }
  });
};

const onLightBtnClick = () => {
  lightBoxRef.classList.toggle('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
  window.removeEventListener('keydown', onKeyboardClick);
  lightboxOverlayRef.removeEventListener('click', onOverlayClick);
};

const onArrowClick = array => {
  array.forEach((el, ind, arr) => {
    if (lightboxImageRef.src === el.original && ind > 0) {
      lightboxImageRef.src = arr[ind - 1].original;
      lightboxImageRef.alt = arr[ind - 1].description;
    }
  });
};

const onArrowsClick = codeKey => {
  const reverseImagesRefs = [...imagesRefs].reverse();
  codeKey === 'ArrowLeft' ? onArrowClick(imagesRefs) : onArrowClick(reverseImagesRefs);
};

const onKeyboardClick = ({ code }) => {
  code === 'Escape' ? onLightBtnClick() : onArrowsClick(code);
};

const onOverlayClick = ({ target, currentTarget }) => {
  if (target === currentTarget) {
    onLightBtnClick();
  }
};

galleryLinkRefs.forEach(link => link.addEventListener('click', onGalleryLinkClick));
lightBtnRef.addEventListener('click', onLightBtnClick);
lightboxOverlayRef.addEventListener('click', onOverlayClick);
