"use strict";

import '../node_modules/material-icons/iconfont/material-icons.scss';
import './styles.scss';
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import imgList from './image-li.hbs';
import '../node_modules/materialize-css/dist/js/materialize.js';
import './tooltip.js';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import InfiniteScroll from 'infinite-scroll';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';

const basicLightbox = require('basiclightbox');

const enterBtn = document.querySelector('#enter');
const closeBtn = document.querySelector('#close');
const form = document.querySelector('form');

let qSearch = '';
const KEY = '15687137-c5f0f01058e95950ce1cda2fd';
let msnryInst;

imagesLoaded('img', function() {
    msnryInst = new Masonry( '.gallery', {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30,
    gutter: 5,
    });
});

InfiniteScroll.imagesLoaded = imagesLoaded;

let infScroll = new InfiniteScroll('.gallery', {
    path () {
        return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=${KEY}&q=${qSearch}&image_type=photo&orientation=horizontal&page=${this.pageIndex}&per_page=12`
    },
    responseType: 'text',
    status: '.page-load-status',
    outlayer: msnryInst,
    scrollThreshold: 100,
    loadOnScroll: true,
    append: false,
    history: false,
});

infScroll.on('load', (res) => {
    const info = JSON.parse(res);
    let div = document.createElement('div');
    div.innerHTML = imgList(info.hits);
    let items = div.querySelectorAll('.gallery__item');
    imagesLoaded(items, function() {
        infScroll.appendItems(items);
        msnryInst.appended(items);
        msnryInst.layout();
        items.length === 0 ? 
        PNotify.info({
            title: 'No matches!',
            text: 'Nothing matching your search',
            delay: 3000,
            modules: {
                Desktop: {
                    desktop: true
                }
                }
        })
        :
        PNotify.success({
            title: 'Excelent!',
            text: 'Your request is loaded.',
            delay: 3000,
            modules: {
                Desktop: {
                  desktop: true
                }
            }
        });
        items.forEach((el)=> {
            el.children[0].children[0].addEventListener('click', (event) => {
            let src = event.toElement.src;
            const instance = basicLightbox.create(`
                <img src="${src}" width="960">
            `,);
            instance.show();
            });
        });
    });
});
infScroll.loadNextPage();

infScroll.on('request', () => {
    PNotify.info({
        title: 'Loading...',
        text: 'Your request is being processed',
        delay: 1000,
        modules: {
            Desktop: {
              desktop: true
            }
          }
    })
})

infScroll.on('error', (error, path) => {
    PNotify.error({
        title: 'Error',
        text: `Could not load: ${path}`,
        delay: 3000,
        modules: {
            Desktop: {
              desktop: true
            }
          }
    })
})

const renderGallerySearch = (item) => {
    if (qSearch === item.value) {
        infScroll.loadNextPage();
        
    } else {
        qSearch = item.value;
        let galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach((el) => {
            el.remove();
        })
        infScroll.pageIndex = 1;
        infScroll.loadNextPage();
    };
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderGallerySearch(event.target.elements[0]);
    let input = document.querySelector('#search');
    input.value = '';
    msnryInst.layout();
});

enterBtn.addEventListener('click', () => {
    qSearch = document.getElementById('search').value;
    let input = document.querySelector('#search');
    input.value = '';
    infScroll.loadNextPage();
    msnryInst.layout();
});

closeBtn.addEventListener('click', () => {
    let input = document.querySelector('#search');
    input.value = '';
});
