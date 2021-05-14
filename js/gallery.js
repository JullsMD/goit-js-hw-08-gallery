import gallery from './gallery-items.js'


const galleryContainerRef = document.querySelector('.js-gallery');
const modalImageRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.lightbox');
const closeButtonRef = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

// Ссылка на оригинальное изображение должна храниться в data-атрибуте source
//  на элементе img, и указываться в href ссылки
//  (это необходимо для доступности).

function createGalleryMarkup(gallery) {
    return gallery
        .map(({preview,original,description}) => {
            return `
        <li>
         <a
             class="gallery__link"
             href= "${original}"
             >
            <img class = "gallery__image"
            src = '${preview}'
            alt = '${description}'
            data-source="${original}"
            width = 392
            height = 240>
            </a>
        </li>
    `;
        })
        .join('');
};

galleryContainerRef.insertAdjacentHTML('beforeend', createGalleryMarkup(gallery));

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
function closeModal(){
    modalRef.classList.remove('is-open');
    modalImageRef.src = '';
    lightboxOverlayRef.removeEventListener('click',closeModal );
    window.removeEventListener('keydown', onEscapePress);
};
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Реализация делегирования на галерее ul.js-gallery,  получение url большого изображения.
function onGalleryContainerClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    
    modalImageRef.src = evt.target.dataset.source;
    modalImageRef.alt = evt.target.alt;
    
    modalRef.classList.add('is-open');
    lightboxOverlayRef.addEventListener('click',closeModal);
    window.addEventListener('keydown',  onEscapePress);

    const onCloseButton = closeButtonRef.addEventListener('click',closeModal);
};

galleryContainerRef.addEventListener('click',onGalleryContainerClick);

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
function onEscapePress(evt) {

    if (evt.code === 'Escape') {
       closeModal(); 
    }
};



