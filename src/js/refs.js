export default  function getRefs() {
    return {
        searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadBtn: document.querySelector('[data-action="load-more"]'),
    container: document.getElementById('js-container'),
    };
    
}