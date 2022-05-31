import "./LoginOrRegisterBox.css";

export const LoginOrRegisterBox = () => {
  return (
    <div>
      <form className="FormToLoginOrRegister" id="LoginOrRegisterInNews">
        Login or register to leave a comment.
        <div>
          <button className="ButtonOrInputWithBorderRadius">Login</button>
          <button className="ButtonOrInputWithBorderRadius">Register</button>
        </div>
      </form>
    </div>
  );
};
