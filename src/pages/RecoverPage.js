import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { loginUserService, postJson } from "../utils/api";
import { Navigate, Link } from "react-router-dom";
import { Error } from "../components/Error";
import "./RecoverPage.css";

export const RecoverPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { token } = useContext(AuthContext);

  const handleFormRecoverCodePassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsEmailSent(false);
      const dataStringified = JSON.stringify({ email });
      await postJson(
        `${process.env.REACT_APP_BACKEND}/users/recover-password`,
        dataStringified
      );
      setIsEmailSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsResetPassword(false);
      const dataStringified = JSON.stringify({
        recoverCode: recoveryCode,
        newPassword,
      });
      await postJson(
        `${process.env.REACT_APP_BACKEND}/users/reset-password`,
        dataStringified
      );
      setIsResetPassword(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (token) return <Navigate to={"/"} />;

  return (
    <>
      <Header />
      <main>
        <section className="recover-page">
          <h1 className="recover-page">Recover Password</h1>
          {!isResetPassword ? (
            <>
              {isEmailSent ? (
                <>
                  <h3 className="recover-page">
                    Please, write the code we sent you to the email and write a
                    new password for your account
                  </h3>
                  <form className="recover-page resetpassword">
                    <fieldset className="recover-page recoverycode">
                      <label htmlFor="code">Recovery Code</label>
                      <input
                        type="text"
                        id="code"
                        name="code"
                        value={recoveryCode}
                        required
                        onChange={(e) => setRecoveryCode(e.target.value)}
                      />
                    </fieldset>
                    <fieldset className="recover-page newpassword">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        minLength="8"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </fieldset>

                    <button type="submit" onClick={handleFormResetPassword}>
                      Send
                    </button>
                    {error ? <p>{error}</p> : null}
                  </form>
                </>
              ) : (
                <>
                  <h3 className="recover-page">
                    Please, write your email and we will send you a code to
                    reset your password
                  </h3>
                  <form className="recover-page recoverycode">
                    <fieldset className="recover-page email">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </fieldset>

                    <button
                      type="submit"
                      onClick={handleFormRecoverCodePassword}
                    >
                      Send
                    </button>
                    {error && (
                      <Error className="recover-password error" error={error} />
                    )}
                  </form>
                </>
              )}
            </>
          ) : (
            <p className="recover-page">
              Your password has been reset you now can{" "}
              <Link to="/login">login</Link>
            </p>
          )}
        </section>
      </main>
    </>
  );
};
