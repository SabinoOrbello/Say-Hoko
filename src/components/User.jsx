import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserRole } from "../redux/getUser";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUpdateUserRole = (userId) => {
    const newRole = "admin";
    dispatch(updateUserRole({ userId, newRole }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-gold">Utenti Registrati</h2>
      <button onClick={() => navigate("/BackOffice")} className="golden-button mb-3">
        Torna Indietro
      </button>
      {status === "loading" && <p>Caricamento...</p>}
      {status === "failed" && <p>Errore: {error}</p>}
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6">
            <div className="card bg-dark text-white mb-3">
              <div className="card-body">
                <h5 className="card-title text-gold">ID: {user.userId}</h5>
                <h5 className="card-title">
                  <b>Nome: </b>
                  {user.nome}
                </h5>
                <p className="card-text">
                  <b>Cognome: </b>
                  {user.cognome}
                </p>
                <p className="card-text">
                  <b>Email: </b>
                  {user.email}
                </p>
                <p className="card-text">
                  <b>Ruolo: </b>
                  {user.role}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateUserRole(user.userId)}
                  disabled={user.role === "admin"}
                >
                  {status === "loading" ? "Aggiornamento in corso..." : "Rendi Admin"}
                </button>
                {status === "failed" && <p className="text-danger">Aggiornamento fallito</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
