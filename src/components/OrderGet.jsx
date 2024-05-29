import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../redux/orderGetSlice";
import { useNavigate } from "react-router-dom";

const OrderGet = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderGet.list);
  const status = useSelector((state) => state.orderGet.status);
  const error = useSelector((state) => state.orderGet.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (orderId) => {
    const newState = "Completato";
    dispatch(updateOrderStatus({ orderId, newState }));
  };
  const formatDate = (dateTime) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString();
  };

  return (
    <div className="container mt-5 p-5">
      <h2 className="text-gold">Ordini</h2>
      <button onClick={() => navigate("/backoffice")} className="golden-button mb-3">
        Torna Indietro
      </button>
      {status === "loading" && <p>Caricamento...</p>}
      {status === "failed" && <p>Errore: {error}</p>}
      <div className="row">
        {orders.map((order) => (
          <div key={order.ordiniId} className="col-md-6">
            <div className="card bg-dark text-white mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  <b className="text-gold">Ordine #</b>
                  {order.ordiniId}
                </h5>
                <p className="card-text">
                  <b>Cliente: </b> {order.userId}
                </p>
                <p className="card-text">
                  <b>Totale: </b>
                  {order.totale}€
                </p>
                <p className="card-text">
                  <b>Stato: </b>
                  {order.stato}
                </p>
                <p className="card-text">
                  <b>Data e ora: </b>
                  {formatDate(order.dataOra)} {formatTime(order.dataOra)}
                </p>
                <hr />
                <h6 className="card-subtitle mb-2">Dettagli Ordine:</h6>
                {order.dettagliOrdines.map((dettaglio) => (
                  <div key={dettaglio.dettagliOrdineId}>
                    <p>
                      <b>Prodotto: </b> {dettaglio.prodotto?.nome}
                    </p>
                    <p>
                      <b>Quantità: </b> {dettaglio.quantità}
                    </p>
                  </div>
                ))}
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateStatus(order.ordiniId)}
                  disabled={order.stato === "Completato"}
                >
                  Evadi Ordine
                </button>
                {order.stato === "Completato" && (
                  <div className="mt-2">
                    <span className="badge bg-success">✓ Completato</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderGet;
