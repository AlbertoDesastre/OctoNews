import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const FormProfile = () => {
  const { user, token } = useContext(AuthContext);
  const [imageUpload, setImageUpload] = useState();
  const [biographyInput, setBiographyInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.name) setNameInput(user.name);
      if (user.biography) setBiographyInput(user.biography);
      if (user.email) setEmailInput(user.email);
    }
  }, [user]);

  const handleOnSubmitUserSettings = (e) => {};

  return (
    <article className="usersettings-page profile">
      <h1>User Settings</h1>
      <form
        onSubmit={handleOnSubmitUserSettings}
        className="usersettings-page profile"
      >
        <fieldset className="avatar">
          <figure className="usersettings-page avatar">
            {user.avatar ? (
              imageUpload ? (
                <img src={URL.createObjectURL(imageUpload)} alt="user-avatar" />
              ) : (
                <img
                  src={`${process.env.REACT_APP_BACKEND}/uploads/users/${user.avatar}`}
                  alt="user-avatar"
                />
              )
            ) : (
              <img src={`/user-login-default-icon.svg`} alt="user-avatar" />
            )}
          </figure>
          <label htmlFor="image-upload">Change avatar</label>
          <input
            type="file"
            id="image-upload"
            name="image-upload"
            accept="image/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
        </fieldset>
        <fieldset className="username">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={nameInput}
            minLength="3"
            maxLength="10"
            required
            onChange={(e) => setNameInput(e.target.value)}
          />
        </fieldset>
        <fieldset className="biography">
          <label htmlFor="biography">Bio</label>
          <textarea
            type="text"
            id="biography"
            name="biography"
            value={biographyInput}
            onChange={(e) => setBiographyInput(e.target.value)}
          />
        </fieldset>
        <fieldset className="useremail">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailInput}
            required
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </fieldset>
        <button type="submit">SAVE</button>
        {error ? <p>{error}</p> : null}
      </form>
    </article>
  );
};
