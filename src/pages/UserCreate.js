import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { registerUserService } from "../utils/api";

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
      <main>
        {!registrationFinished ? (
          <section>
            <h1>Register</h1>
            <form onSubmit={handleForm}>
              <fieldset>
                <label htmlFor="username">User Name</label>
                <input
                  type="name"
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
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>

              {/* password*/}
              <fieldset>
                <label htmlFor="pass1">Password</label>
                <input
                  type="password"
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
                  id="pass2"
                  name="pass2"
                  required
                  onChange={(e) => setPass2(e.target.value)}
                  minLength="8"
                />
              </fieldset>

              <button>Register</button>
              {error ? <p>{error}</p> : null}
            </form>
          </section>
        ) : (
          <p>Registration successful, check your email to continue</p>
        )}
      </main>
    </>
  );
};

// http://localhost:3000/users/validate/449570d73b78cf7bb4cb90f3e961899ea14f7403
