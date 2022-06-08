import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import "./Submit.css";

export const Submit = () => {
  const { token, user } = useContext(AuthContext);

  //change this to !token when done
  if (token) return <Navigate to={"/login"} />;

  return (
    <>
      <Header />
      <main>
        <section className="submit-page">
          <header className="submit-page-header">
            <h1>Write your news</h1>
          </header>
          <form className="submit-page">
            <fieldset className="submit-category">
              <select name="categorySelect" id="categorySelect">
                <option>Choose a category</option>
                <option>Cultura</option>
              </select>
            </fieldset>
            <fieldset className="submit-title">
              <span type="text" role="textbox" contentEditable></span>
            </fieldset>
            <fieldset className="submit-text">
              <div>
                <button>Add Image</button>
              </div>
              <textarea name="text" id="text" placeholder="Text"></textarea>
            </fieldset>
            <button type="submit">Post</button>
          </form>
        </section>
      </main>
    </>
  );
};
