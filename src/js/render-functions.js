import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = images.map(image => `
        <li class="gallery-item">
        <a href="${image.largeImageURL}" class="gallery-link">
            <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
            </a>
            <div class="info">
                <div class="image-info">
                <b>Likes</b>
                <p>${image.likes}</p>
                </div>
                <div class="image-info">
                <b>Views</b>
                <p>${image.views}</p>
                </div>
                <div class="image-info">
                <b>Comments</b>
                <p>${image.comments}</p>
                </div>
                <div class="image-info">
                <b>Downloads</b>
                <p>${image.downloads}</p>
                </div>
            </div>
        </a>
        </li>
    `).join('');
}

export function showNotification(message, type = 'info') {
    iziToast[type]({
        message,
        position: 'topRight'
    });
}

export function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

export function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}