import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const FormChangePassword = () => {
  const { user, token } = useContext(AuthContext);
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [error, setError] = useState(false);

  return (
    <article className="usersettings-page password">
      <h1> Change Password</h1>
      <form className="usersettings-page password">
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

        <button type="submit">SAVE</button>
        {error ? <p>{error}</p> : null}
      </form>
    </article>
  );
};
