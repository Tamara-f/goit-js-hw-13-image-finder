import './styles.css';
import imgsTpl from './templates/imgs.hbs';

const refs = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('#gallery'),
  loadmore: document.querySelector('#loadmore'),
};
refs.loadmore.classList.add('notactive');
let inputValue;
let pageNumber = 1;

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  if (event.currentTarget.elements.query.value === '') {
    refs.gallery.innerHTML = '';
    alert('Please enter search term');
  } else {
    inputValue = event.currentTarget.elements.query.value;
    startFetch(inputValue);
  }
});

function startFetch() {
  const API_KEY = '17615021-9599c8e133abdd89b923fc662';
  const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${encodeURIComponent(
    ` ${inputValue}`,
  )}&page=${pageNumber}&per_page=12&key=${API_KEY}`;

  fetch(URL)
    .then(res => res.json())
    .then(data => {
      createGallery(data);
      //   console.log(data);

      refs.loadmore.classList.remove('notactive');
    });
}

function createGallery(data) {
  const markup = imgsTpl(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.loadmore.addEventListener('click', event => {
  pageNumber += 1;

  startFetch(pageNumber);
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
});
