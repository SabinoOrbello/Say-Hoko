import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdotti } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import Badge from "react-bootstrap/Badge";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, error } = useSelector((state) => state.prodotti);
  const [categoriaSelezionata, setCategoriaSelezionata] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const categorie = [
    { CategorieId: 1, NomeCategoria: "Tartare" },
    { CategorieId: 2, NomeCategoria: "Nigiri" },
    { CategorieId: 3, NomeCategoria: "Hosomaki" },
    { CategorieId: 4, NomeCategoria: "Gubkan" },
    { CategorieId: 5, NomeCategoria: "Temaki" },
    { CategorieId: 6, NomeCategoria: "Uramaki" },
    { CategorieId: 7, NomeCategoria: "Seshi e Sashimi" },
    { CategorieId: 8, NomeCategoria: "Pokè" },
    { CategorieId: 9, NomeCategoria: "Riso e Spaghetti" },
    { CategorieId: 10, NomeCategoria: "Salse" },
    { CategorieId: 11, NomeCategoria: "Bevande" },
  ];

  useEffect(() => {
    dispatch(fetchProdotti());
    setUserRole(localStorage.getItem("role"));
  }, [dispatch]);

  const handleAddToCart = (prodotto) => {
    dispatch(addToCart(prodotto));
    swal({
      title: "Aggiunto al carrello!",
      text: `${prodotto.nome} è stato aggiunto al tuo carrello.`,
      icon: "success",
      button: "Ok",
    }); // Nasconde il messaggio dopo 3 secondi
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`); // Naviga alla pagina di modifica del prodotto
  };

  return (
    <div className="container-fluid p-5 mt-5">
      <div className="row">
        <div className="col-md-3 sticky-top">
          <h1 className="text-white mb-5 fw-bold">Categorie</h1>
          {categorie.map((categoria) => (
            <button
              key={categoria.CategorieId}
              className="golden-button m-2"
              onClick={() => setCategoriaSelezionata(categoria.CategorieId)}
            >
              {categoria.NomeCategoria}
            </button>
          ))}
        </div>
        <div className="col-md-9">
          <h1 className="text-white mb-5 fw-bold">Menù</h1>
          {status === "loading" ? (
            <div>Caricamento...</div>
          ) : status === "failed" ? (
            <div>Errore: {error}</div>
          ) : (
            <div className="d-flex flex-wrap gap-32">
              {list
                .filter((prodotto) => !categoriaSelezionata || prodotto.categorieId === categoriaSelezionata)
                .map((prodotto) => (
                  <div key={prodotto.prodottoId} className="card16 w-25">
                    <div className="card16-header">
                      <img src={prodotto.immagine || "holder.js/100px180"} />
                    </div>
                    <div className="card16-details">
                      <div className="card16-title">
                        <h3>{prodotto.nome}</h3>
                      </div>
                      <div className="card16-text">
                        <p>Prezzo: {prodotto.prezzo},00€</p>
                      </div>
                      <div className="card16-text">
                        <p>{prodotto.ingredienti}</p>
                      </div>
                      <div className="card16-text">
                        <Badge bg="danger">{prodotto.allergeni1}</Badge>
                      </div>
                      <button className="card16-btn" onClick={() => handleAddToCart(prodotto)}>
                        Aggiungi
                      </button>
                      {userRole === "admin" && (
                        <button className="card16-btn" onClick={() => handleEditProduct(prodotto.prodottoId)}>
                          Modifica
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
