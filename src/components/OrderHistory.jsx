import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../redux/getOrderSlice";
import Loader from "./Loader";
import Message from "./Message";
import moment from "moment";
import { FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaStickyNote } from "react-icons/fa";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.getOrder);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const userId = localStorage.getItem("userId");

  const userOrders = orders.filter((order) => order.userId === parseInt(userId));

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
  };

  return (
    <div className="container mt-5 higt p-5">
      <h2 className="text-gold">Storico Ordini</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row">
          {userOrders.map((order) => (
            <div key={order.ordiniId} className="col-md-4 mb-4">
              <div className="card bg-dark text-white h-100">
                <div className="card-body">
                  <h5 className="card-title text-gold">
                    <FaCalendarAlt /> {formatDateTime(order.dataOra)}
                  </h5>
                  <p className="card-text">
                    <FaMoneyBillWave /> Totale: {order.totale}€
                  </p>
                  <p className="card-text">
                    <FaMapMarkerAlt /> Indirizzo: {order.indirizzo}
                  </p>
                  <p className="card-text">
                    <FaStickyNote /> Note: {order.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
