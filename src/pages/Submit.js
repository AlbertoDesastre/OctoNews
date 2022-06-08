import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FormNews } from "../components/FormNews";
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
          <FormNews />
        </section>
      </main>
    </>
  );
};
