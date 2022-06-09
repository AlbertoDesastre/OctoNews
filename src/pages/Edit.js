import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FormNews } from "../components/FormNews";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Edit = () => {
  const { id } = useParams();
  const [mode] = useState("edit");
  const { token, user } = useContext(AuthContext);

  const [news, , , newsError] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news/${id}`
  );

  console.log(news, user);

  if (!token) return <Navigate to={"/login"} />;
  if (news && user && news.id_user !== user?.id) return <Navigate to={"/"} />;
  return (
    <>
      <Header />
      <main>
        {user && (
          <section className="edit-page">
            <header className="edit-page-header">
              <h1>Write your news</h1>
            </header>
            <FormNews mode={mode} newsData={news} newsError={newsError} />
          </section>
        )}
      </main>
    </>
  );
};
