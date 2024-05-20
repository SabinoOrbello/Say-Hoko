import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/BackOffice" element={<BackOffice />} />
        <Route path="/Ordina" element={<Ordina />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
