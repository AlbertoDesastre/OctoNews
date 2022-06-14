import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { FormChangePassword } from "../components/UserSettings/FormChangePassword";
import { FormProfile } from "../components/UserSettings/FormProfile";
import { AuthContext } from "../context/AuthContext";
import "./UserSettings.css";

export const UserSettings = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);

  console.log(user && user.id);
  console.log(id);
  if (user && user.id !== Number(id)) return <Navigate to={"/"} />;
  return (
    <>
      <Header />
      <main>
        {user && (
          <section className="usersettings-page">
            <FormProfile />
            <FormChangePassword />
          </section>
        )}
      </main>
    </>
  );
};
