import './css/styles';
import articlesTmpl from './templates/image-cards.hbs';
import ApiNewService from './js/apiService';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import getRefs from './js/refs';
const refs = getRefs();

const apiNewService = new ApiNewService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadMore);
function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.query;
    apiNewService.query = input.value;
       apiNewService.resetPage();
    clearArticles();
    apiNewService.fetchArticles()
        .then(hits => {
            if (hits.length < 12 ) {
                refs.loadBtn.style.display = 'none';
            }
            else if (apiNewService.query === ''||apiNewService.query.indexOf(' ')>=0) {
                refs.loadBtn.style.display = 'none';
                error({
               text: "Введите что-нибудь",
               delay: 1000,
                });
                return
            }
    
            else {
                refs.loadBtn.style.display = 'block';
               
            }

            renderImageCard(hits)
        })
        .catch(error => console.log(error))
    input.value = '';
    
  
}
function renderImageCard(image) {
   refs.gallery.insertAdjacentHTML('beforeend', articlesTmpl(image))
}
function onLoadMore() {
    apiNewService.fetchArticles()
        .then(renderImageCard)
        .catch(error => console.log(error));
    scrollEnd();

}


function clearArticles() {
    refs.gallery.innerHTML = '';
}
function scrollEnd() {
    setTimeout(() => {
        
        refs.container.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
    }, 800)
}

