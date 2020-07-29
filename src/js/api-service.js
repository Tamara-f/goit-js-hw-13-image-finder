export default {
  pageNumber: 1,
  inputValue: '',

  startFetch() {
    const API_KEY = '17615021-9599c8e133abdd89b923fc662';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${encodeURIComponent(
      ` ${this.value}`,
    )}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        this.pageNumber += 1;
        return data;
      })
      .catch(error => console.log(error));
  },
  resetPage() {
    this.pageNumber = 1;
  },
  get value() {
    return this.inputValue;
  },
  set value(newValue) {
    this.inputValue = newValue;
  },
};

// export default startFetch;
