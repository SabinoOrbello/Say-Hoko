import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { createOrder } from "../redux/orderSlice";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import swal from "sweetalert";

const CheckoutForm = ({ cartItems, userId }) => {
  const [customerName, setCustomerName] = useState("");
  const [citta, setCitta] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("carta");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [totalAmount, setTotalAmount] = useState(0);
  const [isFirstOrder, setIsFirstOrder] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(0);

  useEffect(() => {
    axios
      .get(`https://localhost:7052/api/ordini/user/${userId}`)
      .then((response) => {
        const isFirstOrder = response.data.length === 0;
        setIsFirstOrder(isFirstOrder);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // L'utente non ha ordini, consideralo come il primo ordine
          setIsFirstOrder(true);
        } else {
          console.error("Si è verificato un errore durante il recupero degli ordini dell'utente:", error);
        }
      });
  }, [userId]);

  useEffect(() => {
    const amount = cartItems.reduce((total, item) => total + item.prezzo * item.quantita, 0);
    setTotalAmount(amount);
  }, [cartItems]);

  useEffect(() => {
    const calculateDiscountedAmount = () => {
      if (isFirstOrder) {
        setDiscountedAmount(totalAmount * 0.8);
      } else {
        setDiscountedAmount(totalAmount);
      }
    };
    calculateDiscountedAmount();
  }, [isFirstOrder, totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const {
        data: { clientSecret },
      } = await axios.post(
        "https://localhost:7052/api/payments/create-payment-intent",
        { amount: discountedAmount * 100 },
        { headers: { "Content-Type": "application/json" } }
      );

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
            address: { city: citta, line1: indirizzo },
            phone: numeroTelefono,
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setIsProcessing(false);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        const orderData = {
          UserId: parseInt(userId, 10),
          DataOra: new Date(),
          Stato: "In elaborazione",
          Totale: discountedAmount,
          Indirizzo: indirizzo,
          Citta: citta,
          NumeroTelefono: numeroTelefono,
          Note: note,
          DettagliOrdines: cartItems.map((item) => ({
            ProdottoId: item.prodottoId,
            Quantità: item.quantita,
            Prezzo: item.prezzo,
          })),
          Pagamentis: [
            {
              UserId: parseInt(userId, 10),
              Metodo: paymentMethod,
              Importo: discountedAmount,
              Stato: "Completato",
              DataOra: new Date(),
            },
          ],
        };

        dispatch(createOrder(orderData));

        const orderSummary = `
          Prodotti Acquistati: ${cartItems.map((item) => `${item.quantita} x ${item.nome}`).join(", ")}
          Data: ${orderData.DataOra.toLocaleDateString()}
          Totale: ${orderData.Totale}€
          Indirizzo: ${orderData.Indirizzo}
        `;

        setCustomerName("");
        setCitta("");
        setIndirizzo("");
        setNumeroTelefono("");
        setNote("");
        setPaymentMethod("");
        setIsProcessing(false);

        swal("Ordine Confermato!", orderSummary, "success");
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-75 bg-dark p-5 rounded-5 text-white">
      <h2>Checkout</h2>
      <hr />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nome Cliente</label>
          <input
            className="form-control"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Città</label>
          <input
            className="form-control"
            type="text"
            value={citta}
            onChange={(e) => setCitta(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Indirizzo</label>
          <input
            className="form-control"
            type="text"
            value={indirizzo}
            onChange={(e) => setIndirizzo(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Numero di telefono</label>
          <input
            className="form-control"
            type="text"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Note</label>
          <input className="form-control" type="text" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Metodo di Pagamento</label>
          <select
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="carta">Carta di Credito</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <CardElement
          options={{
            style: {
              base: {
                color: "#ffffff",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                "::placeholder": { color: "#cccccc" },
              },
              invalid: { color: "#ff6961" },
            },
          }}
        />
      </div>
      <div className="mt-3">
        <h4>
          Totale Ordine:{" "}
          {isFirstOrder ? (
            <span className="discounted-total">{discountedAmount.toFixed(2)} € (Sconto del 20% applicato)</span>
          ) : (
            <span>{totalAmount.toFixed(2)} €</span>
          )}
        </h4>
      </div>

      <button type="submit" className="golden-button" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Conferma Ordine"}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  cartItems: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

export default CheckoutForm;
