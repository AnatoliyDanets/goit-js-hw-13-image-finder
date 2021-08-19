const API_KEY = '22939354-d4c9986b85a6f5174d41c17d7';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1
    }
   async fetchArticles() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY} `;
       const response = await fetch(url);
       const images = await response.json();
                this.page += 1;
                return images.hits;
           
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
