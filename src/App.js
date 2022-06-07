import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Search } from "./pages/Search";
import { UserCreate } from "./pages/UserCreate";
import { LoginPage } from "./pages/UserLogin";
import { useEffect } from "react";
import { UserValidation } from "./pages/UserValidation";
import { Submit } from "./pages/Submit";
import { Category } from "./pages/Category";

// UserCreate UserLogin

function CambiaMiNombre() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/:filter" element={<Home />} />
          </Route>
          <Route path="/register" element={<UserCreate />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/news/:id" element={<News />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/users/validate/:code" element={<UserValidation />} />
          <Route path="/*" element={<p>Wrong link</p>} />
        </Routes>
        <CambiaMiNombre />
      </BrowserRouter>
    </>
  );
}

export default App;
