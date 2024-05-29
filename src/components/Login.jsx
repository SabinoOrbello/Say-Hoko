import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { KJUR } from "jsrsasign";

export default function Login() {
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7052/api/Utenti/Login", {
        nome,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("jwt", token); // Salva il token nel localStorage

        // Decodifica il token per ottenere il nome dell'utente e l'ID
        const decodedToken = KJUR.jws.JWS.parse(token).payloadObj;
        console.log(decodedToken);
        const loggedInUserName = decodedToken.given_name;
        const userId = decodedToken.unique_name;

        const userRole = decodedToken.role;
        console.log(userRole); // Assumendo che il ruolo dell'utente sia salvato come `role` nel token
        localStorage.setItem("role", userRole); // Assumendo che l'ID dell'utente sia salvato come `userId` nel token

        setLoggedInUser(loggedInUserName);

        // Salva l'ID dell'utente nel localStorage se necessario
        localStorage.setItem("userId", userId);
        console.log(userId);

        navigate("/", { state: { nome: loggedInUserName } });
      } else {
        console.error("Errore durante il login", response.data);
      }
    } catch (error) {
      console.error("Errore durante il login", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container w-50 pt-5 d-flex justify-content-center align-items-center p-5 mt-5 higt">
      <form onSubmit={handleSubmit} className="w-75 bg-dark p-5 rounded-5 text-white">
        <h2 className="text-white text-center">LOGIN</h2>
        <p className="text-center">Accedi al nostro portale</p>
        <hr />
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label">
              Nome:
              <input className="form-control" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Password:
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
        <button type="submit" className="golden-button">
          Submit
        </button>
      </form>
    </div>
  );
}
