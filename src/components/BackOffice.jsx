import { Link } from "react-router-dom";

export default function BackOffice() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center higt">
      <h1 className="text-white text-center mt-2">BackOffice</h1>
      {/* Utilizza Link per avvolgere il componente CreaProdotto */}
      <Link
        to="/CreaProdotto"
        className="block w-64 p-4 bg-gray-800 text-white rounded-lg text-center mt-4 text-decoration-none"
      >
        Crea Prodotto
      </Link>

      <Link
        to="/UtentiRegistrati"
        className="block w-64 p-4 bg-gray-800 text-white rounded-lg text-center mt-4 text-decoration-none"
      >
        Utenti registrati
      </Link>

      <Link
        to="/OrdiniUtenti"
        className="block w-64 p-4 bg-gray-800 text-white rounded-lg text-center mt-4 text-decoration-none"
      >
        Ordini utenti
      </Link>

      <Link
        to="/ProductSalesChart"
        className="block w-64 p-4 bg-gray-800 text-white rounded-lg text-center mt-4 text-decoration-none"
      >
        Grafico vendite
      </Link>
    </div>
  );
}
