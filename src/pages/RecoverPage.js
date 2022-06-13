import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { loginUserService, postJson } from "../utils/api";
import { Navigate, Link } from "react-router-dom";
import { Error } from "../components/Error";
import "./RecoverPage.css";
import { FormRecoveryCodePassword } from "../components/RecoverPassword/FormRecoveryCode";
import { FormResetPassword } from "../components/RecoverPassword/FormResetPassword";

export const RecoverPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { token } = useContext(AuthContext);

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
                <FormResetPassword setIsResetPassword={setIsResetPassword} />
              ) : (
                <FormRecoveryCodePassword setIsEmailSent={setIsEmailSent} />
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
