import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './js/fetchCountries';

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputRef.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// let inputCountrie = ''



function onFormInput(evt) {
    cleanupMarkupHTML()
    const inputCountrie = `${evt.target.value}`.trim();
     if (!evt.target.value) {
            console.log('return')
            return
        }  
    fetchCountries(inputCountrie)
    .then(data => {

        if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }

        else if (data.length === 1) {
        createMarkupOneCountry(data);
        }
                   
        else { 
        createMarkupSeveralCountry(data);
        }  
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
 
function createMarkupOneCountry (data) {
    let country = data.map(item => `<div class="country-item">
        <img class="country-flag" src="${item.flags.svg}" alt="${name} flag" width="100"/>
        <h2 class="country-name">${item.name.official}</h2>
        </div>
        <div class="country-item">
        <h3 class="country-data-title">Capital:</h3>
        <p class="country-data">${item.capital}</p>
        </div>
        <div class="country-item">
        <h3 class="country-data-title">Population:</h3>
        <p class="country-data">${item.population}</p>
        </div>
        <div class="country-item">
        <h3 class="country-data-title">Languages:</h3>
        <p class="country-data">${Object.values(item.languages).join(', ')}</p>
        </div>`
        ).join('')
        countryInfoRef.insertAdjacentHTML('beforeend', country);
    }

function createMarkupSeveralCountry (data) {
    let country = data.map(item => `<li class="country-item">
        <img class="country-flag" src="${item.flags.svg}"alt="${name} flag" width="100"/>
        <h2 class="country-name">${item.name.official}</h2>
        </li>`).join('');
        countryListRef.insertAdjacentHTML('beforeend', country);
    }

function cleanupMarkupHTML() {
        countryInfoRef.innerHTML = '';
        countryListRef.innerHTML = ''; 
    }