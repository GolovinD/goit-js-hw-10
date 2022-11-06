fetchCountries = (name) =>{
    const URL = `https://restcountries.com/v3.1/name/${name}/?fields=name,capital,languages,flags,population `;
    return fetch(URL).then((response) => {if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();});
}

export { fetchCountries };