import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProductAsync, fetchProductByIdAsync, selectProduct } from "../redux/putProductSlice";
import { useParams } from "react-router-dom";

const EditProductForm = () => {
  const { id } = useParams(); // Ottieni l'ID dai parametri della rotta
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setFormData({
        ProdottoId: product.prodottoId || "",
        CategoriaId: product.categoriaId || "",
        Nome: product.nome || "",
        Ingredienti: product.ingredienti || "",
        Immagine: product.immagine || "",
        Allergeni1: product.allergeni1 || "",
        Allergeni2: product.allergeni2 || "",
        Allergeni3: product.allergeni3 || "",
        Prezzo: product.prezzo || "",
        Disponibilità: product.disponibilità || false,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(formData));
  };

  if (!formData) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container w-50 pt-5 d-flex justify-content-center align-items-center p-5 higt">
      <form onSubmit={handleSubmit} className="w-75 bg-dark p-5 rounded-5 text-white">
        <h2 className="text-white text-center">MODIFICA PRODOTTO</h2>
        <hr></hr>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="Nome" className="form-label">
              Nome
              <input
                className="form-control"
                type="text"
                name="Nome"
                value={formData.Nome}
                onChange={handleChange}
                placeholder="Nome"
              />
            </label>
          </div>
          <label htmlFor="Ingredienti" className="form-label">
            Ingredienti
            <textarea
              className="form-control"
              name="Ingredienti"
              value={formData.Ingredienti}
              onChange={handleChange}
              placeholder="Ingredienti"
            />
          </label>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="Immagine" className="form-label">
              URL Immagine
              <input
                className="form-control"
                name="Immagine"
                value={formData.Immagine}
                onChange={handleChange}
                placeholder="URL Immagine"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="Allergeni1" className="form-label">
              Allergene 1
              <input
                className="form-control"
                name="Allergeni1"
                value={formData.Allergeni1}
                onChange={handleChange}
                placeholder="Allergene 1"
              />
            </label>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="Allergeni2" className="form-label">
              Allergene 2
              <input
                className="form-control"
                name="Allergeni2"
                value={formData.Allergeni2}
                onChange={handleChange}
                placeholder="Allergene 2"
              />
            </label>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="Allergeni3" className="form-label">
              Allergene 3
              <input
                className="form-control"
                name="Allergeni3"
                value={formData.Allergeni3}
                onChange={handleChange}
                placeholder="Allergene 3"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="Prezzo" className="form-label">
              Prezzo
              <input
                className="form-control"
                name="Prezzo"
                value={formData.Prezzo}
                onChange={handleChange}
                placeholder="Prezzo"
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="Disponibilità" className="form-label">
              Disponibilità
              <input
                className="ms-2"
                type="checkbox"
                name="Disponibilità"
                checked={formData.Disponibilità}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="CategoriaId" className="form-label">
              Categorie
              <select
                className="form-select"
                name="CategoriaId"
                value={formData.CategoriaId} // Assicurati che sia sempre uno scalare, usa '' per un valore non definito
                onChange={handleChange}
              >
                <option value="">Seleziona una categoria</option>
                <option value="1">Tartare</option>
                <option value="2">Nigiri</option>
                <option value="3">Hosomaki</option>
                <option value="4">Gubkan</option>
                <option value="5">Temaki</option>
                <option value="6">Uramaki</option>
                <option value="7">Sushi e Sashimi</option>
                <option value="8">Pokè</option>
                <option value="9">Riso e Spaghetti</option>
                <option value="10">Salse</option>
                <option value="11">Bevande</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Salva
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
