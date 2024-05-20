import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "./Hero";
import Main from "./Main";

export default function Home() {
  const location = useLocation();
  const nome = location.state?.nome;

  useEffect(() => {
    if (nome) {
      toast(`Benvenuto ${nome}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [nome]);

  return (
    <div>
      <Hero />
      <Main />
      <ToastContainer />
    </div>
  );
}
