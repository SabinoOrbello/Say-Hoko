import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import pokè from "../assets/img/pokè.png";

const CustomPokeBuilder = () => {
  const dispatch = useDispatch();

  const ingredientsList = [
    { IngredienteId: 1, Nome: "Riso", Prezzo: 2.0, Categoria: "Base" },
    { IngredienteId: 2, Nome: "Salmone", Prezzo: 3.5, Categoria: "Proteina" },
    { IngredienteId: 3, Nome: "Tonno", Prezzo: 4.0, Categoria: "Proteina" },
    { IngredienteId: 4, Nome: "Avocado", Prezzo: 1.5, Categoria: "Topping" },
    { IngredienteId: 5, Nome: "Edamame", Prezzo: 1.0, Categoria: "Topping" },
    // Aggiungi altri ingredienti qui
  ];

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [pokeName, setPokeName] = useState("");

  const handleAddIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleRemoveIngredient = (ingredientId) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing.IngredienteId !== ingredientId));
  };

  const calculateTotalPrice = () => {
    return selectedIngredients.reduce((total, ingredient) => total + ingredient.Prezzo, 0);
  };

  const handleSubmit = () => {
    const customPoke = {
      prodottoId: 48, // Using timestamp as a unique ID for simplicity
      nome: pokeName,
      prezzo: calculateTotalPrice(),
      immagine: pokè, // Set a default image or leave it empty
      ingredienti: selectedIngredients,
    };
    dispatch(addToCart(customPoke));
  };

  return (
    <div className="container p-5 mt-5 text-white">
      <h2 className="text-center mb-4">Crea la tua Pokè personalizzata</h2>
      <div className="container d-flex justify-content-center">
        <img src={pokè} />
      </div>
      <div className="mb-3">
        <label htmlFor="pokeName" className="form-label">
          Poke Name
        </label>
        <input
          type="text"
          id="pokeName"
          className="form-control"
          value={pokeName}
          onChange={(e) => setPokeName(e.target.value)}
          placeholder="Enter Poke Name"
        />
      </div>
      <div className="mb-4">
        <h3>Seleziona Ingredienti</h3>
        <div className="row">
          {ingredientsList.map((ingredient) => (
            <div key={ingredient.IngredienteId} className="col-6 mb-2">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">{ingredient.Nome}</h5>
                  <p className="card-text">Price: {ingredient.Prezzo} €</p>
                  <button className="golden-button" onClick={() => handleAddIngredient(ingredient)}>
                    Aggiungi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3>Ingredienti selezionati</h3>
        <div className="row">
          {selectedIngredients.map((ingredient) => (
            <div key={ingredient.IngredienteId} className="col-6 mb-2">
              <div className="card  bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">{ingredient.Nome}</h5>
                  <p className="card-text">Prezzo: {ingredient.Prezzo} €</p>
                  <button className="btn btn-danger" onClick={() => handleRemoveIngredient(ingredient.IngredienteId)}>
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3>Prezzo Totale: {calculateTotalPrice()} €</h3>
      </div>
      <div>
        <button className="btn btn-success" onClick={handleSubmit}>
          Aggiungi al Carrello
        </button>
      </div>
    </div>
  );
};

export default CustomPokeBuilder;
