import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Error } from "../components/Error";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { registerUserService } from "../utils/api";
import "./userAuth.css";

export const UserCreate = () => {
  const { token } = useContext(AuthContext);
  const [registrationFinished, setRegistrationFinished] = useState(false);
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Password do not match");
      return;
    }

    try {
      await registerUserService({ email, name: username, password: pass1 });

      setRegistrationFinished(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (token) return <Navigate to={"/"} />;

  return (
    <>
      <Header />
      <main className="auth">
        {!registrationFinished ? (
          <>
            <h1>Register</h1>
            <form onSubmit={handleForm} className="auth">
              <fieldset>
                <label htmlFor="username">User Name</label>
                <input
                  type="name"
                  value={username}
                  id="username"
                  name="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="3"
                  maxLength="10"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="pass1">Password</label>
                <input
                  type="password"
                  value={pass1}
                  id="pass1"
                  name="pass1"
                  required
                  onChange={(e) => setPass1(e.target.value)}
                  minLength="8"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="pass2">Verify Password</label>
                <input
                  type="password"
                  value={pass2}
                  id="pass2"
                  name="pass2"
                  required
                  onChange={(e) => setPass2(e.target.value)}
                  minLength="8"
                />
              </fieldset>
              <label htmlFor="terms" className="check">
                <input type="checkbox" required id="terms" />I have read and
                accept the terms and conditions
              </label>

              <button>Register</button>
              {error ? (
                <Error className="userauth error" error={error} />
              ) : null}
            </form>
          </>
        ) : (
          <p>Registration successful, check your email to continue</p>
        )}
      </main>
    </>
  );
};
