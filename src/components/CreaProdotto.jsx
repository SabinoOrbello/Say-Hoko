import { useState } from "react";
import { useDispatch } from "react-redux";
import { creaProdotto } from "../redux/postProductSlice";

const CreaProdotto = () => {
  const [prodotto, setProdotto] = useState({
    prodotti: {
      nome: "",
      ingredienti: "",
      descrizione: "",
      immagine: "",
      allergeni1: "",
      allergeni2: "",
      allergeni3: "",
      prezzo: 0,
      disponibilità: false,
      categorieId: "",
    },
    // altri campi del prodotto
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "prezzo") {
      value = parseFloat(value);
    }
    setProdotto({ ...prodotto, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Converti categorie in un numero intero prima di inviarlo al backend
    const prodottoDaInviare = {
      ...prodotto,
      categorieId: parseInt(prodotto.categorieId),
    };
    dispatch(creaProdotto(prodottoDaInviare));
    // Resetta il form o gestisci la risposta come preferisci
  };

  return (
    <div className="container w-50 pt-5 d-flex justify-content-center align-items-center ">
      <form onSubmit={handleSubmit} className="w-75 bg-dark p-5 rounded-5 text-white">
        <h2 className="text-white text-center">CREA PRODOTTO</h2>
        <hr></hr>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label">
              <input
                className="form-control"
                name="nome"
                value={prodotto.nome}
                onChange={handleChange}
                placeholder="Nome"
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="Ingredienti" className="form-label">
              <textarea
                className="form-control"
                name="ingredienti"
                value={prodotto.ingredienti}
                onChange={handleChange}
                placeholder="Ingredienti"
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="descrizione" className="form-label">
              <textarea
                className="form-control"
                name="descrizione"
                value={prodotto.descrizione}
                onChange={handleChange}
                placeholder="Descrizione"
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="immagine" className="form-label">
              <input
                className="form-control"
                name="immagine"
                value={prodotto.immagine}
                onChange={handleChange}
                placeholder="URL Immagine"
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="allergeni1" className="form-label">
              <input
                className="form-control"
                name="allergeni1"
                value={prodotto.allergeni1}
                onChange={handleChange}
                placeholder="Allergene 1"
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="allergeni2" className="form-label">
              <input
                className="form-control"
                name="allergeni2"
                value={prodotto.allergeni2}
                onChange={handleChange}
                placeholder="Allergene 2"
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="allergeni1" className="form-label">
              <input
                className="form-control"
                name="allergeni3"
                value={prodotto.allergeni3}
                onChange={handleChange}
                placeholder="Allergene 3"
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="prezzo" className="form-label">
              <input
                className="form-control"
                name="prezzo"
                value={prodotto.prezzo}
                onChange={handleChange}
                placeholder="Prezzo"
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="disponibilità" className="form-label">
              Disponibilità:
              <input
                className="ms-2"
                type="checkbox"
                name="disponibilità"
                checked={prodotto.disponibilità}
                onChange={(e) => setProdotto({ ...prodotto, disponibilità: e.target.checked })}
              />
            </label>
          </div>
          {/* Qui potresti aggiungere un input per selezionare le categorie se necessario */}
          <div className="col-md-6 mb-3">
            <label htmlFor="categorie" className="form-label">
              Categorie:
              <select
                className="form-select"
                name="categorie"
                value={prodotto.categorieId || ""} // Assicurati che sia sempre uno scalare, usa '' per un valore non definito
                onChange={(e) => setProdotto({ ...prodotto, categorieId: e.target.value })}
              >
                <option value="">Seleziona una categoria</option>
                <option value="1">tartare</option>
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
        <button type="submit" className="golden-button ms-5">
          Aggiungi Prodotto
        </button>
      </form>
    </div>
  );
};

export default CreaProdotto;
