import axios from "axios";

export const updateProduct = async (product) => {
  return axios.put(`https://say-hoko12.azurewebsites.net/api/prodotti/${product.ProdottoId}`, product);
};

export const fetchProductById = async (id) => {
  return axios.get(`https://say-hoko12.azurewebsites.net/api/prodotti/${id}`);
};
