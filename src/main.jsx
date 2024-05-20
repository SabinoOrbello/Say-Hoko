import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe(
  "pk_test_51P3eZiCzdPBqLcmGk82gXFVY9jj8AbIxB1DOjsxNv8ljuaVbJmmQE50awCqX3NubkbXfqWZjdNipltSxJGC9Tcet00fZB6ogt9"
);

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  </React.StrictMode>
);
