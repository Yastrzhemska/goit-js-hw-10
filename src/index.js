

import { fetchBreeds, fetchCatByBreed } from './cat-api'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import './styles.css';

const selectors = {
    select: document.querySelector('.breed-select'),
    load: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    info: document.querySelector('.cat-info')
}
// console.log(selectors);


selectors.load.classList.add('loader');
selectors.select.classList.add('is-hidden')
selectors.error.classList.add('is-hidden');
selectors.info.classList.add('is-hidden');

fetchBreeds()
    // selectors.select.classList.add('is-hidden')
    .then(data => {
    console.log(data)
    
    selectors.select.innerHTML = data.map(element => `<option value="${element.id}">${element.name}</option>`).join('');
        selectors.load.classList.add('is-hidden');
        selectors.select.classList.remove('is-hidden')
    new SlimSelect({
        select: selectors.select,
        
    })
    })
    .catch(onFetchError)


selectors.select.addEventListener('change', hendlerChangeSelect)

function hendlerChangeSelect(evt) {
    evt.preventDefault();
    selectors.load.classList.replace('is-hidden', 'loader');
    selectors.select.classList.add('is-hidden');
    selectors.info.classList.add('is-hidden');

    const breedId = evt.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            console.log(data)
        selectors.load.classList.replace('loader', 'is-hidden');
        selectors.select.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
            selectors.info.innerHTML = `
        <img src="${url}" 
        alt="${breeds[0].name}" 
        width="400"/>

        <div class="contenet">
        <h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        selectors.info.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};


function onFetchError(err) {
    selectors.select.classList.remove('is-hidden');
    selectors.load.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 3000,
        width: '500px',
        fontSize: '30px'
    });
};






