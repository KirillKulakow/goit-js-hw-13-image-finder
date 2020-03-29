"use strict";

import InfiniteScroll from 'infinite-scroll';
import imagesLoaded from 'imagesloaded';
import {msnryInst} from './masonry.js';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import modalLightbox from './modalLightBox.js';
import imgList from './image-li.hbs';

InfiniteScroll.imagesLoaded = imagesLoaded;

let qSearch = '';
const KEY = '15687137-c5f0f01058e95950ce1cda2fd';

const infScroll = new InfiniteScroll('.gallery', {
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
    const div = document.createElement('div');
    div.innerHTML = imgList(info.hits);
    const items = div.querySelectorAll('.gallery__item');
    const images = div.querySelectorAll('img');
    imagesLoaded(items, function() {
        infScroll.appendItems(items);
        msnryInst.appended(items);
        msnryInst.layout();
        if(!items.length) {
            PNotify.info({
                title: 'No matches!',
                text: 'Nothing matching your search',
                delay: 3000,
                modules: {
                    Desktop: {
                        desktop: true
                    },
                },
            });
        };
        images.forEach((el)=> {
            el.addEventListener('click', (event) => {modalLightbox(event, el)});
        });
    });
});

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
        const galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach((el) => {
            el.remove();
        })
        infScroll.pageIndex = 1;
        infScroll.loadNextPage();
    };
};

export {renderGallerySearch};
export default infScroll;