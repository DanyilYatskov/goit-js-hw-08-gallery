import imagesDataArray from './gallery-items.js';
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeLightboxBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  lightboxImg: document.querySelector('.js-lightbox .lightbox__image'),
};
let originalImgUrlArray = [];
let currentImgIndx = 0;
function addGalleryItem(image) {
  const galleryItem = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = image.preview;
  galleryImage.dataset.source = image.original;
  galleryImage.alt = image.description;
  originalImgUrlArray.push(image.original);
  galleryLink.appendChild(galleryImage);
  galleryLink.classList.add('gallery__link');
  galleryLink.href = image.original;
  galleryItem.appendChild(galleryLink);
  galleryItem.classList.add('gallery__item');
  return galleryItem;
}
function createGallery(images) {
  let galleryToCreate = images.map(image => addGalleryItem(image));
  refs.gallery.append(...galleryToCreate);
}
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.lightboxImg.src = event.target.dataset.source;
  refs.lightbox.classList.add('is-open');
  window.addEventListener('keydown', onEscPress);
  window.addEventListener('keydown', onArrowLeftPress);
  window.addEventListener('keydown', onArrowRightPress);
}
function onCloseLightbox() {
  refs.lightboxImg.src = '';
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onArrowLeftPress);
  window.removeEventListener('keydown', onArrowRightPress);
}
function onOverlayClick(event) {
  if (event.target.classList.contains('lightbox__overlay')) {
    onCloseLightbox();
  }
}
function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseLightbox();
  }
}
function onArrowLeftPress(event) {
  currentImgIndx = originalImgUrlArray.indexOf(refs.lightboxImg.src);
  if (event.keyCode === 37) {
    refs.lightboxImg.src =
      currentImgIndx <= 0
        ? originalImgUrlArray[originalImgUrlArray.length - 1]
        : originalImgUrlArray[currentImgIndx - 1];
  }
}
function onArrowRightPress(event) {
  currentImgIndx = originalImgUrlArray.indexOf(refs.lightboxImg.src);
  if (event.keyCode === 39) {
    refs.lightboxImg.src =
      currentImgIndx >= originalImgUrlArray.length - 1
        ? originalImgUrlArray[0]
        : originalImgUrlArray[currentImgIndx + 1];
  }
}
createGallery(imagesDataArray);
refs.gallery.addEventListener('click', onGalleryClick);
refs.closeLightboxBtn.addEventListener('click', onCloseLightbox);
refs.lightbox.addEventListener('click', onOverlayClick);
