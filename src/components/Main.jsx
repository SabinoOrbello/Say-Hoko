import sushi1 from "../assets/img/Sushi-1.jpg";
import sushi2 from "../assets/img/wagyu-gunkan-2400-1941.jpg";
import Caros from "./Caros";

function Main() {
  return (
    <>
      <div className="container mt-5 w-100">
        <div className="row">
          <div className="col col-6">
            <img className="h-100 w-100" src={sushi1}></img>
          </div>
          <div className="col col-6 text-white">
            <p className="fw-bold gold">Say Hoko</p>
            <h1 className="fw-bold fs-2">Le nostre specialità</h1>
            <p>
              Scopri l'eccezionale cucina giapponese reinterpretata con maestria dal <br></br>
              ristorante Yoshi. Le nostre specialità culinarie rappresentano l'incontro <br></br>
              armonioso tra la tradizione e la creatività, e regalano un'esperienza <br></br>
              gustativa indimenticabile.
            </p>
          </div>
        </div>

        <div className="row mt-5 mb-5 pb-5">
          <div className="col col-6 text-white">
            <p className="fw-bold gold">Say Hoko</p>
            <h1 className="fw-bold fs-2">Le nostre materie prime</h1>
            <p>
              Riponiamo grande passione e cura nella preparazione dei <br></br>
              nostri piatti. Allo stesso tempo, operiamo un’attenta selezione <br></br>
              delle migliori materie prime. Scegliamo solo ingredienti <br></br>
              freschi e collaboriamo solo con fornitori affidabili, per offrire <br></br>
              un'esperienza gastronomica di prim'ordine, dove la bontà degli <br></br>
              ingredienti si sposa con la maestria dei nostri chef.
            </p>
            <p>
              La nostra missione? Diventare il ristorante n°1 di Bologna per <br></br>
              qualità e ricercatezza dei piatti.
            </p>
          </div>
          <div className="col col-6">
            <div className="image-container">
              <img src={sushi1} className="image image1 w-75"></img>
              <img src={sushi2} className="image image2 w-75"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid sushi3 mt-5 p-5">
        <div className="container p-5">
          <div className="row text-white d-flex justify-content-center">
            <div className="col col-6"></div>
            <div className="col col-6">
              <p className="gold fw-bold">Location</p>
              <h1 className="fw-bold fs-2">Il nostro ristorante</h1>
              <p>
                La nostra location raffinata ma informale è perfetta sia per cene romantiche <br></br>
                di coppia che per piacevoli serate con gli amici. Grazie alla suggestiva zona <br></br>
                tatami riuscirai a ripercorre le tradizioni giapponesi e a sentirti parte di una <br></br>
                cultura tanto iconica quanto entusiasmante.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Caros />
      <div className="container mt-5 py-3">
        <div className="row">
          <div className="col col-6 w-50">
            <img src={sushi1}></img>
          </div>
          <div className="col col-6 text-white">
            <p className="fw-bold gold">Menù e offerta</p>
            <h1 className="fw-bold fs-2">Il sushi più amato dai canosini</h1>
            <p>
              Il nostro shop online è sempre ricco di offerte e promozioni e può vantare un <br></br>
              menù gustoso e costantemente aggiornato con nuovi piatti. Sei a Bologna e vuoi <br></br>
              assaggiare il sushi più amato dai bolognesi? Scegli Yoshi! Prenota un tavolo nel <br></br>
              nostro ristorante, oppure ordina comodamente i nostri piatti di sushi tramite <br></br>
              consegna a domicilio o ritiro take away.
            </p>
            <button type="submit" className="golden-button">
              Ordina ora
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
