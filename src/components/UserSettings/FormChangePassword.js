import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { postFormData } from "../../utils/api";
import { Error } from "../Error";

export const FormChangePassword = () => {
  const { user, token } = useContext(AuthContext);
  const [passwordUpdated, setPasswordUpdated] = useState();
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [error, setError] = useState(false);

  const handleOnSubmitPasswordChange = async (e) => {
    e.preventDefault();
    setError(null);
    const passwordData = new FormData(e.target);
    try {
      const response = await postFormData(
        `${process.env.REACT_APP_BACKEND}/users/${user.id}/password`,
        passwordData,
        token
      );

      setPasswordUpdated(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="usersettings-page password">
      <h1> Change Password</h1>
      <form
        onSubmit={handleOnSubmitPasswordChange}
        className="usersettings-page password"
      >
        <fieldset className="useroldpassword">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPasswordInput}
            required
            onChange={(e) => setOldPasswordInput(e.target.value)}
          />
        </fieldset>
        <fieldset className="usernewpassword">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPasswordInput}
            required
            onChange={(e) => setNewPasswordInput(e.target.value)}
            minLength="8"
          />
        </fieldset>

        <div>
          <button type="submit">SAVE</button>
          {error ? (
            <Error className="result error" error={error}></Error>
          ) : null}
          {passwordUpdated ? (
            <p className="result" style={{ color: "green" }}>
              {passwordUpdated}
            </p>
          ) : null}
        </div>
      </form>
    </article>
  );
};
