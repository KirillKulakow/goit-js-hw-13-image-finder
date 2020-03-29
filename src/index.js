
import '../node_modules/material-icons/iconfont/material-icons.scss';
import './styles.scss';
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import '../node_modules/materialize-css/dist/js/materialize.js';
import './tooltip.js';
import infScroll from './infinite-scroll.js';
import {renderGallerySearch} from './infinite-scroll.js';
import {msnryInst} from './masonry.js';

const enterBtn = document.querySelector('#enter');
const closeBtn = document.querySelector('#close');
const form = document.querySelector('form');

infScroll.loadNextPage();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderGallerySearch(event.target.elements[0])
    const input = document.querySelector('#search');
    input.value = '';
    msnryInst.layout();
});

enterBtn.addEventListener('click', () => {
    const input = document.querySelector('#search');
    renderGallerySearch(input)
    input.value = '';
});

closeBtn.addEventListener('click', () => {
    const input = document.querySelector('#search');
    input.value = '';
});
