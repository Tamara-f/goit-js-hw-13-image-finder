import imgsTpl from '../templates/imgs.hbs';
import refs from './refs';

function createGallery(data) {
  const markup = imgsTpl(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadmore.classList.remove('notactive');
}
export default createGallery;
