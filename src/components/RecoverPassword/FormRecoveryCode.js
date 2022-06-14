import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { postFormData, postJson } from "../../utils/api";
import { Error } from "../Error";

export const FormRecoveryCodePassword = ({ setIsEmailSent }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

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

  return (
    <>
      <h3 className="recover-page">
        Please, write your email and we will send you a code to reset your
        password
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

        <button type="submit" onClick={handleFormRecoverCodePassword}>
          Send
        </button>
        {error && <Error className="recover-page error" error={error} />}
      </form>
    </>
  );
};
