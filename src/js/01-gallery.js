// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simple-lightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('div.gallery');

let gItems = '';
galleryItems.map(value => {
  const { preview, original, description } = value;
  gItems += `
  <a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" />
  </a>`;
});
gallery.innerHTML = gItems;

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
