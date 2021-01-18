export const fetchMapData = (key) => {
  let url = `https://fakerapi.it/api/v1/addresses?_quantity=50`;

  return fetch(url).then((res) => res.json());
};
