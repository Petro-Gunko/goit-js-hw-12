import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const formRef = document.querySelector('.form');
const galleryRef = document.querySelector('.gallery');
const loaderRef = document.querySelector('.loader');
const loadMoreButtonRef = document.querySelector('.btn-load-more');
const oneImage = document.querySelector('.gallery img');

loadMoreButtonRef.style.display = 'none';
loaderRef.style.display = 'none';

let currentPage = 1;
let cardHeight = 0;

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});

formRef.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchQuery = event.currentTarget.elements.query.value.trim();
    currentPage = 1;

    try {
        const { hits, totalHits } = await getImages(searchQuery, currentPage);

        if (hits.length === 0) {
            galleryRef.innerHTML = "";
            iziToast.error({ position: 'topRight', message: 'Sorry, there are no images matching your search query. Please try again!' });
            return;
        }
        
        galleryRef.innerHTML = "";
        
        const markup = hits.map((hit) => {
            return `<li class="gallery-item">
                <a class="gallery-link" href="${hit.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${hit.webformatURL}"
                        alt="${hit.tags}"
                    />
                    <ul class="list">
                        <li class="list-item"><h3>likes</h3><span>${hit.likes}</span></li>
                        <li class="list-item"><h3>views</h3><span>${hit.views}</span></li>
                        <li class="list-item"><h3>comments</h3><span>${hit.comments}</span></li>
                        <li class="list-item"><h3>downloads</h3><span>${hit.downloads}</span></li>
                    </ul>
                </a>
            </li>`;
        }).join("");

        galleryRef.insertAdjacentHTML(`beforeend`, markup);
        const oneImage = document.querySelector(".gallery-item");

        if (oneImage) {
            cardHeight = oneImage.getBoundingClientRect().height;
        }
        lightbox.refresh();

        if (totalHits <= 40) {
            loadMoreButtonRef.style.display = 'none';
        } else {
            loadMoreButtonRef.style.display = 'block';
        }

    } catch (error) {
        iziToast.error({ position: 'topRight', message: 'Sorry, there are no images matching your search query. Please try again!' });
    }
});

loadMoreButtonRef.addEventListener('click', async () => {
    currentPage++;

    try {
        const searchQuery = formRef.elements.query.value.trim();
        const result = await getImages(searchQuery, currentPage);

        const markup = result.hits.map((hit) => {
            return `<li class="gallery-item">
                <a class="gallery-link" href="${hit.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${hit.webformatURL}"
                        alt="${hit.tags}"
                    />
                    <ul class="list">
                        <li class="list-item"><h3>likes</h3><span>${hit.likes}</span></li>
                        <li class="list-item"><h3>views</h3><span>${hit.views}</span></li>
                        <li class="list-item"><h3>comments</h3><span>${hit.comments}</span></li>
                        <li class="list-item"><h3>downloads</h3><span>${hit.downloads}</span></li>
                    </ul>
                </a>
            </li>`;
        }).join("");

        galleryRef.insertAdjacentHTML(`beforeend`, markup);
        
        lightbox.refresh();

        if (result.totalHits <= currentPage * 40) { 
            iziToast.info({
                title: '',
                message: 'We are sorry, but you have reached the end of search results.',
            });
            loadMoreButtonRef.style.display = 'none';
        }    
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });
    } catch (error) {
        iziToast.error({ position: 'topRight', message: 'Sorry, there are no images matching your search query. Please try again!' });
    }
});

async function getImages(query, page) {
    loaderRef.style.display = 'block';
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=41717891-03a798ff6847d2641a93432cc&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
        return {
            hits: response.data.hits,
            totalHits: response.data.totalHits
        };
    } catch (error) {
        throw new Error(error.response.status);
    } finally {
        loaderRef.style.display = 'none';
        
    }
}