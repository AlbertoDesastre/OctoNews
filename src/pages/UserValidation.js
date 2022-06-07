import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/Header";

export const UserValidation = () => {
  const { code } = useParams();
  const [validationOK, setValidationOK] = useState(false);
  const [error, setError] = useState("");

  //esto solo vale para el modo desarrollo (Strict mode)
  const mounted = useRef(false);

  useEffect(() => {
    const validateUser = async () => {
      mounted.current = true;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/users/validate/${code}`
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.data);
          return;
        }

        setValidationOK(true);
      } catch (error) {
        setError("General error validating user");
      }
    };

    if (!mounted.current) validateUser();
  }, [code]);

  return (
    <>
      <Header />

      <main>
        {validationOK ? (
          <p>
            User validated correctly. You can <Link to={"/login"}>login</Link>
          </p>
        ) : (
          false
        )}
        {error ? <p>{error}</p> : null}
      </main>
    </>
  );
};
