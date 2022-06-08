import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { FormNews } from "../components/FormNews";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import "./Submit.css";

export const Submit = () => {
  const [categories, , isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );
  const [mode] = useState("post");
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to={"/login"} />;

  return (
    <>
      <Header />
      <main>
        <section className="submit-page">
          <header className="submit-page-header">
            <h1>Write your news</h1>
          </header>
          <FormNews
            mode={mode}
            categoryData={categories}
            categoryLoading={isLoading}
            categoryError={error}
          />
        </section>
      </main>
    </>
  );
};
