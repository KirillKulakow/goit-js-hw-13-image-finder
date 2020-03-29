"use strict";

const basicLightbox = require('basiclightbox');

export default function (event, el) {
    let src = event.toElement.src;
    const instance = basicLightbox.create(`
        <img src="${src}" style="pointer-events: all" width="960">
    `, {closable: true});
    el.onerror = () => {
        el.display = 'none';
    }
    instance.show(
        () => {
            const boxOverlay = document.querySelector('.basicLightbox__placeholder');
            boxOverlay.addEventListener('click', (e) => {
                if (e.target.nodeName !== 'IMG') {
                    instance.close();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.code === 'Escape') {
                    instance.close();
                }
            });
        }
    );

};



