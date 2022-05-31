import "./LoginOrRegisterBox.css";

export const LoginOrRegisterBox = () => {
  return (
    <div className="news-page">
      <form className="FormToLoginOrRegister" id="LoginOrRegisterInNews">
        Login or register to leave a comment.
        <div>
          <button className="buttonOrInputWithBorderRadius">Login</button>
          <button className="buttonOrInputWithBorderRadius">Register</button>
        </div>
      </form>
    </div>
  );
};
