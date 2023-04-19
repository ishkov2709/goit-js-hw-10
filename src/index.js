import Notiflix from 'notiflix';
import './css/styles.css';
import getCountry from './fetchCountries';
var debounce = require('lodash.debounce');

// Variables

const refs = {
  inputCountries: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  boxInfoCountry: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

// Functions

const onInputGetCountryHandler = evt => {
  const country = evt.target.value;
  if (!country) {
    return;
  }
  cleanForm();
  return getCountry(country.trim()).then(detectCountries).catch(errorQuery);
};

const detectCountries = response => {
  if (response.length > 10) {
    return infoQuery();
  } else if (response.length > 1) {
    return renderMarkupItems(response);
  } else if (response.length === 1) {
    return renderMurkupCard(...response);
  } else {
    return errorQuery();
  }
};

// Render Foo

const renderMarkupItems = response => {
  return (refs.listCountries.innerHTML = response
    .map(({ name: { common }, flags: { svg } }) => {
      return `<li class="country-item">
            <img class="item-flag" src="${svg}" width="40" />
            <p class="item-text">${common}</p>
          </li>`;
    })
    .join(''));
};

const renderMurkupCard = ({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) => {
  const lang = Object.values(languages).join(', ');
  return (refs.boxInfoCountry.innerHTML = `<div class="manifest-country"><img src="${svg}" width="60" />
      <p class="country-name">${official}</p></div>
      <p class="card-text"><span class="accent">Capital: </span>${capital}</p>
      <p class="card-text"><span class="accent">Population: </span>${population}</p>
      <p class="card-text"><span class="accent">Languages: </span>${lang}</p>`);
};

// Utils Foo

const cleanForm = () => {
  refs.boxInfoCountry.innerHTML = '';
  refs.listCountries.innerHTML = '';
};

const infoQuery = () => {
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

const errorQuery = () => {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
};

// Listeners

refs.inputCountries.addEventListener(
  'input',
  debounce(onInputGetCountryHandler, DEBOUNCE_DELAY)
);
