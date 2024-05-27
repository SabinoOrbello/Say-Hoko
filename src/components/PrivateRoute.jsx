import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  if (role !== "admin") {
    navigate("/Login", { state: { from: location } });
    return null;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
