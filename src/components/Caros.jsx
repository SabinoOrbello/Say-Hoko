import carosello1 from "../assets/img/caros1.jpg";
import carosello2 from "../assets/img/caros2.jpeg";
import carosello3 from "../assets/img/caros3.jpg";
import carosello4 from "../assets/img/caros4.jpg";

function Caros() {
  return (
    <div className="container-fluid mt-5">
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row g-0">
              <div className="col">
                <img src={carosello1} className="d-block w-100 carousel-img" alt="Image 1" />
              </div>
              <div className="col">
                <img src={carosello2} className="d-block w-100 carousel-img" alt="Image 2" />
              </div>
              <div className="col">
                <img src={carosello3} className="d-block w-100 carousel-img" alt="Image 3" />
              </div>
              <div className="col">
                <img src={carosello4} className="d-block w-100 carousel-img" alt="Image 4" />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row g-0">
              <div className="col">
                <img src={carosello1} className="d-block w-100 carousel-img" alt="Image 1" />
              </div>
              <div className="col">
                <img src={carosello2} className="d-block w-100 carousel-img" alt="Image 2" />
              </div>
              <div className="col">
                <img src={carosello3} className="d-block w-100 carousel-img" alt="Image 3" />
              </div>
              <div className="col">
                <img src={carosello4} className="d-block w-100 carousel-img" alt="Image 4" />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row g-0">
              <div className="col">
                <img src={carosello1} className="d-block w-100 carousel-img" alt="Image 1" />
              </div>
              <div className="col">
                <img src={carosello2} className="d-block w-100 carousel-img" alt="Image 2" />
              </div>
              <div className="col">
                <img src={carosello3} className="d-block w-100 carousel-img" alt="Image 3" />
              </div>
              <div className="col">
                <img src={carosello4} className="d-block w-100 carousel-img" alt="Image 4" />
              </div>
            </div>
          </div>
          {/* Aggiungi altri carousel-item qui se vuoi più slide con diverse immagini */}
        </div>
      </div>
    </div>
  );
}

export default Caros;
