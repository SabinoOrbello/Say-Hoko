import axios from "axios";

export const updateProduct = async (product) => {
  return axios.put(`https://localhost:7052/api/prodotti/${product.ProdottoId}`, product);
};

export const fetchProductById = async (id) => {
  return axios.get(`https://localhost:7052/api/prodotti/${id}`);
};
