import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

const Cart = () => {
  const userId = localStorage.getItem("userId");

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const handleRemoveFromCart = (prodottoId) => {
    dispatch(removeFromCart({ prodottoId }));
  };

  const handleUpdateQuantity = (prodottoId, nuovaQuantita) => {
    dispatch(updateQuantity({ prodottoId, quantita: nuovaQuantita }));
  };

  const handleProceedToCheckout = () => {
    setIsCheckoutVisible(true);
  };

  return (
    <>
      <div className="container mt-5 text-white higt1">
        <h2 className="text-center p-5">Carrello</h2>
        {cartItems.length === 0 && (
          <div className="alert alert-warning" role="alert">
            Non ci sono articoli nel carrello.
          </div>
        )}
        <div className="d-flex justify-content-between">
          <ul className="list-group w-75">
            {cartItems.map((item) => (
              <li
                key={item.prodottoId}
                className="bg-dark text-white list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-5 p-2" style={{ width: "100%" }}>
                  <img
                    src={item.immagine}
                    alt={item.nome}
                    style={{ width: "100px", height: "100px", marginRight: "20px" }}
                  />
                  <div className="d-flex justify-content-around" style={{ width: "100%" }}>
                    <div className="d-flex flex-column">
                      <p>Nome</p>
                      <p>{item.nome}</p>
                    </div>
                    <div className="d-flex flex-column">
                      <p>Prezzo</p>
                      <p>{item.prezzo},00 €</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <p>Quantità</p>
                      <div>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleUpdateQuantity(item.prodottoId, item.quantita - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantita}</span>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleUpdateQuantity(item.prodottoId, item.quantita + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(item.prodottoId)}>
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
          <div className="ms-3 text-white bg-dark border border-white p-3" style={{ minWidth: "200px" }}>
            <h4>Totale Carrello</h4>
            <p>{cartItems.reduce((total, item) => total + item.prezzo * item.quantita, 0).toFixed(2)} €</p>
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-3">
            <button className="golden-button" onClick={handleProceedToCheckout}>
              Procedi all'acquisto
            </button>
          </div>
        )}
      </div>
      <div className="container p-4">{isCheckoutVisible && <CheckoutForm cartItems={cartItems} userId={userId} />}</div>
    </>
  );
};

export default Cart;
