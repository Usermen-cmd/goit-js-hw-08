import imagesRefs from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBoxImgRef = document.querySelector('.lightbox__content .lightbox__image');
const closeLigthBoxBtn = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

const setImagesMarkup = array => {
  return array
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a class="gallery__link" href="">
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

const markupImages = setImagesMarkup(imagesRefs);
galleryRef.insertAdjacentHTML('afterbegin', markupImages);

const onImageClick = event => {
  event.preventDefault();
  const isDataSource = event.target.dataset.source;
  if (!isDataSource) {
    return;
  }
  lightBoxRef.classList.add('is-open');
  addEventListeners();
  const ligthboxImageSrc = event.target.dataset.source;
  const ligthboxImageAlt = event.target.alt;

  addImageLigthbox(ligthboxImageSrc, ligthboxImageAlt);
};

const addImageLigthbox = (src, alt) => {
  lightBoxImgRef.src = src;
  lightBoxImgRef.alt = alt;
};

const onCloseLigthBoxBtnClick = () => {
  lightBoxRef.classList.remove('is-open');
  lightBoxImgRef.src = '';
  lightBoxImgRef.alt = '';
  deleteEventListeners();
};

const onKeyboardClick = keyevent => {
  if (keyevent.code === 'Escape') {
    onCloseLigthBoxBtnClick();
    return;
  }
  const arrowKey = keyevent.code === 'ArrowRight' || keyevent.code === 'ArrowLeft' ? keyevent.code : false;
  turnImage(arrowKey);
};

const turnImage = keyCode => {
  const reverceImageArray = [...imagesRefs].reverse();
  const imageArray = keyCode === 'ArrowLeft' ? [...imagesRefs] : reverceImageArray;

  for (let i = 0; i < imageArray.length; i += 1) {
    if (imageArray[i].original === lightBoxImgRef.src && i > 0) {
      const ligthboxImageSrc = imageArray[i - 1].original;
      const ligthboxImageAlt = imageArray[i - 1].description;
      addImageLigthbox(ligthboxImageSrc, ligthboxImageAlt);
      break;
    }
  }
};

const addEventListeners = () => {
  overlayRef.addEventListener('click', onCloseLigthBoxBtnClick);
  document.addEventListener('keydown', onKeyboardClick);
  closeLigthBoxBtn.addEventListener('click', onCloseLigthBoxBtnClick);
};
const deleteEventListeners = () => {
  overlayRef.removeEventListener('click', onCloseLigthBoxBtnClick);
  document.removeEventListener('keydown', onKeyboardClick);
  closeLigthBoxBtn.removeEventListener('click', onCloseLigthBoxBtnClick);
};

galleryRef.addEventListener('click', onImageClick);
