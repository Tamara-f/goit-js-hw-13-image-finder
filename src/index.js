import './styles.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import markupGallery from './js/markupGallery';
import apiService from './js/api-service';
import refs from './js/refs';

//for submit button
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  refs.loadmore.classList.add('notactive');
  refs.gallery.innerHTML = '';
  apiService.value = event.currentTarget.elements.query.value;
  apiService.resetPage();
  if (event.currentTarget.elements.query.value === '') {
    alert('Please enter search term');
  } else {
    refs.spinner.classList.remove('notactive');
    apiService
      .startFetch()
      .then(data => onFetchthen(data))
      .finally(() => {
        refs.spinner.classList.add('notactive');
      });
  }
});

// for modal
refs.gallery.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`  <div class="modal"> 
 <a>  <i class="material-icons">highlight_off</i></a>
  <img src="${event.target.dataset.source}" >  </div> `);
  {
    instance.element().querySelector('a').onclick = instance.close;
  }
  instance.show();
});

//for button load more
refs.loadmore.addEventListener('click', () => {
  apiService
    .startFetch()
    .then(data => onFetchthen(data))
    .finally(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    });
});

function onFetchthen(data) {
  if (data.hits.length === 0) {
    alert('Found 0 matches! Please enter correct search term');
  } else markupGallery(data.hits);
  if (data.hits.length < 12 && data.hits.length > 0) {
    refs.loadmore.classList.add('notactive');
    alert(`All pictures are already shown. Found ${data.totalHits} matches!`);
  }
}
