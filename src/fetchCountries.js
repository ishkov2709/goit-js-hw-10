export default function getCountry(country) {
  return fetch(`https://restcountries.com/v3.1/name/${country}`).then(
    response => response.json()
  );
}
