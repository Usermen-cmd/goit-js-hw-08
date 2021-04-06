import imagesRefs from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBtnRef = document.querySelector('.lightbox__button');
const lightboxImageRef = document.querySelector('.lightbox__image');

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
  const currentDatasetSourse = event.currentTarget.firstElementChild.dataset.source;
  imagesRefs.forEach(img => {
    if (currentDatasetSourse === img.original) {
      lightboxImageRef.src = img.original;
      lightboxImageRef.alt = img.description;
      window.addEventListener('keydown', onKeyboardClick);
      return;
    }
  });
};

const onLightBtnClick = () => {
  lightBoxRef.classList.toggle('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
  window.removeEventListener('keydown', onKeyboardClick);
};

const onLeftArrowClick = () => {
  for (let i = 0; i < imagesRefs.length; i += 1) {
    if (lightboxImageRef.src === imagesRefs[i].original && i > 0) {
      lightboxImageRef.src = imagesRefs[i - 1].original;
      return;
    }
  }
};

const onRightArrowClick = () => {
  for (let i = 0; i < imagesRefs.length; i += 1) {
    if (lightboxImageRef.src === imagesRefs[i].original && i < imagesRefs.length - 1) {
      lightboxImageRef.src = imagesRefs[i + 1].original;
      return;
    }
  }
};

const onArrowsClick = eventKeys => {
  eventKeys.code === 'ArrowLeft' ? onLeftArrowClick() : onRightArrowClick();
};

const onKeyboardClick = KeyEvent => {
  KeyEvent.code === 'Escape' ? onLightBtnClick() : onArrowsClick(KeyEvent);
};

galleryLinkRefs.forEach(btn => btn.addEventListener('click', onGalleryLinkClick));
lightBtnRef.addEventListener('click', onLightBtnClick);
