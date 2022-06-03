import { useState } from "react";
import { Header } from "../components/Header";
import { loginUserService } from "../utils/api";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log(email, password);
      const data = await loginUserService({ email, password });
      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      <Header />
      <main>
        <section>
          <h1>Login</h1>
          <form>
            <fieldset>
              <label htmlFor="email">Email</label>
              <input
                type="email"
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
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            <button type="submit" onClick={handleForm}>
              Login
            </button>
            {error ? <p>(error)</p> : null}
          </form>
        </section>
      </main>
    </>
  );
};
