export default function getCountry(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}
