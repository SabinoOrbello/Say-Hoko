import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/registrationSlice";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const registrationStatus = useSelector((state) => state.registration.status);
  const navigate = useNavigate();

  function validate(nome, cognome, email, password, telefono) {
    const errors = {};
    if (!nome) {
      errors.nome = "Il nome è obbligatorio";
    }

    if (!cognome) {
      errors.cognome = "Il cognome è obbligatorio";
    }

    if (!email) {
      errors.email = "L'email è obbligatoria";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "L'email non è valida";
    }

    if (!password) {
      errors.password = "La password è obbligatoria";
    } else if (password.length < 6) {
      errors.password = "La password deve essere lunga almeno 6 caratteri";
    }

    if (!telefono) {
      errors.telefono = "Il numero di telefono è obbligatorio";
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(nome, cognome, email, password, telefono);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    dispatch(registerUser({ nome, cognome, email, password, telefono, Role: "utente" }));
    navigate("/");

    setNome("");
    setCognome("");
    setPassword("");
    setEmail("");
    setTelefono("");
  };

  if (registrationStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container w-50 pt-5 d-flex justify-content-center align-items-center p-5 ">
      <form onSubmit={handleSubmit} className="w-75 bg-dark p-5 rounded-5 text-white">
        <h2 className="text-white text-center">REGISTRAZIONE</h2>
        <p className="text-center">Registrati per poter accedere</p>
        <hr />
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {validationErrors.nome && <div className="error">{validationErrors.nome}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cognome" className="form-label">
              Cognome:
            </label>
            <input
              type="text"
              className="form-control"
              id="cognome"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
            />
            {validationErrors.cognome && <div className="error">{validationErrors.cognome}</div>}
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validationErrors.email && <div className="error">{validationErrors.email}</div>}
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="telefono" className="form-label">
              Telefono:
            </label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            {validationErrors.telefono && <div className="error">{validationErrors.telefono}</div>}
          </div>
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control "
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors.password && <div className="error">{validationErrors.password}</div>}
        </div>
        <button type="submit" className="golden-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
