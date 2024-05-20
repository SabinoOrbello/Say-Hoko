import { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const {
        data: { clientSecret },
      } = await axios.post(
        "https://localhost:7052/api/payments/create-payment-intent",
        {
          amount: cartItems.reduce((total, item) => total + item.prezzo * item.quantita, 0) * 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
            address: {
              city: citta,
              line1: indirizzo,
            },
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
          Totale: cartItems.reduce((total, item) => total + item.prezzo * item.quantita, 0),
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
              Importo: cartItems.reduce((total, item) => total + item.prezzo * item.quantita, 0),
              Stato: "Completato",
              DataOra: new Date(),
            },
          ],
        };

        dispatch(createOrder(orderData));

        // Reset form fields
        setCustomerName("");
        setCitta("");
        setIndirizzo("");
        setNumeroTelefono("");
        setNote("");
        setPaymentMethod("");
        setIsProcessing(false);

        swal("Ordine Confermato!", "Il tuo ordine è stato confermato con successo.", "success");
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
          <input
            className="form-control"
            type="text-area"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
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
                "::placeholder": {
                  color: "#cccccc",
                },
              },
              invalid: {
                color: "#ff6961",
              },
            },
          }}
        />
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
