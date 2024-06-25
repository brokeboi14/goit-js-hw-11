const API_KEY = '44599145-181f37b758d0f90a33e2c7ba6';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchImages(query) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return data.hits;
}