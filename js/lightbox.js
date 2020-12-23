import imagesDataArray from './gallery-items.js';
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeLightboxBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  lightboxImg: document.querySelector('.js-lightbox .lightbox__image'),
};
function addGalleryItem(image) {
  const galleryItem = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = image.preview;
  galleryImage.dataset.source = image.original;
  galleryImage.alt = image.description;
  galleryLink.appendChild(galleryImage);
  galleryLink.classList.add('gallery__link');
  galleryLink.href = image.original;
  galleryItem.appendChild(galleryLink);
  galleryItem.classList.add('gallery__item');
  //console.log(galleryItem);
  return galleryItem;
}
function createGallery(images) {
  var galleryToCreate = images.map(image => addGalleryItem(image));
  //console.log(galleryToCreate);
  refs.gallery.append(...galleryToCreate);
}
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightboxImg.src = event.target.dataset.source;
  refs.lightbox.classList.add('is-open');
}
function onCloseLightbox(event) {
  refs.lightboxImg.src = '';
  refs.lightbox.classList.remove('is-open');
}
function onOverlayClick(event) {
  if (event.target.classList.contains('lightbox__overlay')) {
    onCloseLightbox(event);
  }
}
createGallery(imagesDataArray);
refs.gallery.addEventListener('click', onGalleryClick);
refs.closeLightboxBtn.addEventListener('click', onCloseLightbox);
refs.lightbox.addEventListener('click', onOverlayClick);
