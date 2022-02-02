export const getCountries = async () => {
  return fetch('https://61d18fc6da87830017e5928b.mockapi.io/productlist') //random service for test
    .then((res) => res.json());
};
