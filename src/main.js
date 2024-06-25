import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showNotification, showLoader, hideLoader } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('query').value.trim();
    if (query === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }

    showLoader();
    try {
        const images = await fetchImages(query);
        if (images.length === 0) {
            showNotification('Sorry, there are no images matching your search query. Please try again!', 'error');
        } else {
            renderGallery(images);
            if (lightbox) {
                lightbox.destroy();
            }
            lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();
        }
    } catch (error) {
        showNotification('An error occurred while fetching images', 'error');
    } finally {
        hideLoader();
    }
});