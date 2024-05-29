// src/components/ProductSalesChart.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSales } from "../redux/productSalesSlice";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const ProductSalesChart = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.productSales.sales);
  const status = useSelector((state) => state.productSales.status);
  const error = useSelector((state) => state.productSales.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductSales());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log(sales); // Debug dei dati
  }, [sales]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    // Assicurati che 'sales' sia un array prima di passarlo al grafico
    if (Array.isArray(sales)) {
      content = (
        <BarChart
          width={600}
          height={300}
          data={sales}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="prodottoNome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantitàTotale" fill="#8884d8" />
        </BarChart>
      );
    } else {
      content = <div>Data format is incorrect.</div>;
    }
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="mt-5 p-5">
      <div className="container p-5 bg-dark w-50 mt-5">
        <button onClick={() => navigate("/backoffice")} className="golden-button mb-3">
          Torna Indietro
        </button>
        <h2 className="text-white ms-5 ps-4">Prodotti Più Venduti</h2>
        {content}
      </div>
    </div>
  );
};

export default ProductSalesChart;
