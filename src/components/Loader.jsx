// components/Loader.js
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <ClipLoader size={50} color={"#FFD700"} loading={true} />
    </div>
  );
};

export default Loader;
