import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/Navbar";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/registrationForm";
import Home from "./components/Home";
import Login from "./components/Login";
import BackOffice from "./components/BackOffice";
import Footer from "./components/Footer";
import Ordina from "./components/Ordina";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import PrivateRoute from "./components/PrivateRoute";
import CreaProdotto from "./components/CreaProdotto";
import EditProductForm from "./components/EditProductForm";
import User from "./components/User";
import OrderGet from "./components/OrderGet";
import ProductSalesChart from "./components/ProductSalesChart";
import Info from "./components/Info";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomPokeBuilder from "./components/CustomPokeBuilder";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/BackOffice"
          element={
            <PrivateRoute>
              <BackOffice />
            </PrivateRoute>
          }
        />
        <Route path="/Ordina" element={<Ordina />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/CreaProdotto" element={<CreaProdotto />} />
        <Route path="/edit-product/:id" element={<EditProductForm />} />
        <Route path="/UtentiRegistrati" element={<User />} />
        <Route path="/OrdiniUtenti" element={<OrderGet />} />
        <Route path="/ProductSalesChart" element={<ProductSalesChart />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/CustomPokeBuilder" element={<CustomPokeBuilder />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
