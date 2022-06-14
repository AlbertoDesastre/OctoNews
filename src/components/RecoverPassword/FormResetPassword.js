import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { postFormData, postJson } from "../../utils/api";
import { Error } from "../Error";

export const FormResetPassword = ({ setIsResetPassword }) => {
  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);

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

  return (
    <>
      <h3 className="recover-page">
        Please, write the code we sent you to the email and write a new password
        for your account
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
        {error && <Error className="recover-page error" error={error} />}
      </form>
    </>
  );
};
