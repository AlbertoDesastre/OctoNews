import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { loginUserService } from "../utils/api";
import { Link, Navigate } from "react-router-dom";
import { Error } from "../components/Error";
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
        <form className="auth">
          <fieldset className="email">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <Link className="forgot-password" to="/recover-password">
            forgot password?
          </Link>

          <button type="submit" onClick={handleForm}>
            Login
          </button>
          {error ? <Error className="userauth error" error={error} /> : null}
        </form>
        <p>
          Fist time on OctoNews? <Link to="/register"> Register </Link>
        </p>
      </main>
    </>
  );
};
