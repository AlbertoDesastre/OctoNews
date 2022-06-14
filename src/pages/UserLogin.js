import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { loginUserService } from "../utils/api";
import { Link, Navigate } from "react-router-dom";
import "./userAuth.css";

export const LoginPage = () => {
  const { token, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUserService({ email, password });
      login(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (token) return <Navigate to={"/"} />;

  return (
    <>
      <Header />
      <main className="auth">
        <h1>Login</h1>
        <form class="auth">
          <fieldset className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <button type="submit" onClick={handleForm}>
            Login
          </button>
          {error ? <p>{error}</p> : null}
        </form>
        <p>
          Fist time on OctoNews? <Link to="/users/create"> Register </Link>
        </p>
      </main>
    </>
  );
};
