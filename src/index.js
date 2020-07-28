import './styles.css';
import imgsTpl from './templates/imgs.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

// document.cookie = 'SameSite=None; Secure';
// console.log(document.cookie);
const refs = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('#gallery'),
  loadmore: document.querySelector('#loadmore'),
};

let inputValue;
let pageNumber = 1;

//for submit button
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  refs.loadmore.classList.add('notactive');
  refs.gallery.innerHTML = '';
  if (event.currentTarget.elements.query.value === '') {
    // refs.gallery.innerHTML = '';
    alert('Please enter search term');
  } else {
    inputValue = event.currentTarget.elements.query.value;
    pageNumber = 1;
    startFetch(inputValue);
  }
});

//for fetch
function startFetch() {
  const API_KEY = '17615021-9599c8e133abdd89b923fc662';
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${encodeURIComponent(
    ` ${inputValue}`,
  )}&page=${pageNumber}&per_page=12&key=${API_KEY}`;

  // const options = {
  //   headers: {
  //     Authorization: API_KEY,
  //   },
  // };

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data.hits);
      if (data.hits.length === 0) {
        alert('Found 0 matches! Please enter correct search term');
      } else createGallery(data);
      if (data.hits.length < 12 && data.hits.length > 0) {
        refs.loadmore.classList.add('notactive');
        alert(
          `All pictures are already shown. Found ${data.totalHits} matches!`,
        );
      }
    });
}

//for gallery insert
function createGallery(data) {
  const markup = imgsTpl(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadmore.classList.remove('notactive');
}

// for modal
refs.gallery.addEventListener('click', event => {
  // console.log(event.target.dataset.source);
  const instance = basicLightbox.create(`  <div class="modal">  <a><i class="material-icons">highlight_off</i></a>
  <img src="${event.target.dataset.source}" >  </div> `);
  {
    instance.element().querySelector('a').onclick = instance.close;
  }
  instance.show();
});

//for button load more
refs.loadmore.addEventListener('click', event => {
  pageNumber += 1;

  startFetch(pageNumber);
  // window.scrollTo({
  //   top: document.documentElement.scrollHeight,
  //   behavior: 'smooth',
  // });
});
