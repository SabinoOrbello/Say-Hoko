import Carousel from "react-bootstrap/Carousel";
import risto1 from "../assets/img/corridoio-tavoli-ristorante-sushi.jpg";
import risto2 from "../assets/img/migliori-sushi-milano-fingers-garden.jpg";
import risto3 from "../assets/img/rist-sushi.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Hero() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container-fluid" data-aos="zoom-in-up" data-aos-duration="2000" data-aos-delay="400">
      <Carousel>
        <Carousel.Item interval={1000}>
          <div
            className="carousel-img-container d-flex justify-content-center align-items-center h-100 w-100"
            style={{ position: "relative" }}
          >
            <div
              className="img-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            ></div>
            <img className="w-100 carousel-img" src={risto1} alt="Ristorante Sushi"></img>
            <Carousel.Caption
              style={{
                position: "absolute", // Posiziona assolutamente all'interno del contenitore flex
                textAlign: "center",
                top: "75px", // Centra il testo se necessario
              }}
            >
              <h3 className="fw-bold">Benvenuto d Say-Hoko</h3>
              <p className="mb-5">Il punto di riferimento per la cucina giapponese a Canosa</p>
              <Link to="/ordina" className=" golden-button text-decoration-none p-3">
                Ordina ora
              </Link>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div
            className="carousel-img-container d-flex justify-content-center align-items-center h-100 w-100"
            style={{ position: "relative" }}
          >
            <div
              className="img-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            ></div>
            <img className="w-100 carousel-img" src={risto2} alt="Ristorante Sushi"></img>
            <Carousel.Caption
              style={{
                position: "absolute", // Posiziona assolutamente all'interno del contenitore flex
                textAlign: "center",
                top: "75px", // Centra il testo se necessario
              }}
            >
              <h3>Vieni a trovarci</h3>
              <p className="mb-5">
                Assapora l'eccellenza culinaria nel nostro ristorante : dove gusto e tradizione si fondono in un
                esperienza indimenticabile!
              </p>
              <Link to="/info" type="submit" className="golden-button text-decoration-none pt-3">
                Info
              </Link>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="carousel-img-container d-flex justify-content-center align-items-center h-100 w-100"
            style={{ position: "relative" }}
          >
            <div
              className="img-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            ></div>
            <img className="w-100 carousel-img" src={risto3} alt="Ristorante Sushi"></img>
            <Carousel.Caption
              style={{
                position: "absolute", // Posiziona assolutamente all'interno del contenitore flex
                textAlign: "center",
                top: "75px", // Centra il testo se necessario
              }}
            >
              <h3>Sei un nuovo utente?</h3>
              <p className="mb-5">Per te il 20% di sconto sul primo ordine</p>
              <Link to="/register" type="submit" className="golden-button text-decoration-none pt-3">
                Registrati
              </Link>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Hero;
