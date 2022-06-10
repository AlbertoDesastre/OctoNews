import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { FormChangePassword } from "../components/UserSettings/FormChangePassword";
import { FormProfile } from "../components/UserSettings/FormProfile";
import { AuthContext } from "../context/AuthContext";
import "./UserSettings.css";

export const UserSettings = () => {
  const { user } = useContext(AuthContext);

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
