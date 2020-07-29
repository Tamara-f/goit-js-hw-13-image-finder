let pageNumber = 1;
function startFetch(inputValue) {
  console.log(inputValue);
  const API_KEY = '17615021-9599c8e133abdd89b923fc662';
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${encodeURIComponent(
    ` ${inputValue}`,
  )}&page=${pageNumber}&per_page=12&key=${API_KEY}`;
  console.log(url);
  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
}

export default startFetch;
