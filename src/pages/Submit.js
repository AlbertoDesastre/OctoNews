import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";

export const Submit = () => {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to={"/login"} />;

  return (
    <>
      <Header />
      <main>send news</main>
    </>
  );
};
