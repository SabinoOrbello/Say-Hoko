import MapContainer from "./MapContainer";

function Info() {
  return (
    <>
      <div className="container-fluid sushi0  d-flex justify-content-center align-items-center h-100 w-100">
        <div className="container p-5 m-5 d-flex justify-content-center align-items-center">
          <h1 className="fw-bold p-5 text-white m-5">Tutto ciò che devi sapere</h1>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row g-4">
          <div className="col col-12">
            <h3 className="text-gold">Dove siamo</h3>
            <p className="text-white">Via Emilia Levante, 164, 40139 Bologna BO</p>
            <p className="text-white">Tel: 051546292</p>
          </div>
          <hr />
          <div className="col col-12">
            <h3 className="text-gold">Orario</h3>
            <p className="text-white">
              Siamo Aperti tutti i giorni dalle 12:00 alle 14:30, mentre a cena dalle 19:00 alle 23:30
            </p>
          </div>
          <hr />
          <div className="col col-12">
            <h3 className="text-gold">Cap di consegna</h3>
            <p className="text-white">Attualmente la nostra consegna è disponibile per i seguenti CAP:</p>
            <p className="text-white">40139 - 40138 - 40137 - 40141 - 40125 - 40127 - 40126 - 40124 - 40068</p>
          </div>
          <hr />
        </div>
        <MapContainer />
      </div>
    </>
  );
}
export default Info;
