"use strict";

import Masonry from 'masonry-layout';

let msnryInst = new Masonry( '.gallery', {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30,
    gutter: 5,
});

export {msnryInst};