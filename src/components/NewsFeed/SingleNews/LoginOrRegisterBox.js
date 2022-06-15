import { useNavigate } from "react-router-dom";
import "./LoginOrRegisterBox.css";

export const LoginOrRegisterBox = () => {
  const navigate = useNavigate();

  const handleClickThatRedirectsToLogin = () => {
    navigate("/login");
  };
  const handleClickThatRedirectsToRegister = () => {
    navigate("/register");
  };
  return (
    <article className="news-page-formToLoginOrRegister">
      <h3>Login or register to leave a comment.</h3>
      {/* I use this div to be able to put one button of top of the other one */}
      <div className="news-page">
        <button
          className="news-page-buttonWithBorderRadius news-page-loginButton"
          onClick={handleClickThatRedirectsToLogin}
        >
          Login
        </button>
        <button
          className="news-page-buttonWithBorderRadius news-page-registerButton"
          onClick={handleClickThatRedirectsToRegister}
        >
          Register
        </button>
      </div>
    </article>
  );
};
