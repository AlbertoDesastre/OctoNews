import "./LoginOrRegisterBox.css";

export const LoginOrRegisterBox = () => {
  const handleClickThatRedirectsToAModal = (e) => {
    alert("Comprobando que funciona todo");
  };

  return (
    <article className="news-page-formToLoginOrRegister">
      <h3>Login or register to leave a comment.</h3>
      {/* I use this div to be able to put one button of top of the other one */}
      <div className="news-page">
        <button
          className="news-page-buttonWithBorderRadius"
          onClick={handleClickThatRedirectsToAModal}
        >
          Login
        </button>
        <button
          className="news-page-buttonWithBorderRadius"
          onClick={handleClickThatRedirectsToAModal}
        >
          Register
        </button>
      </div>
    </article>
  );
};
