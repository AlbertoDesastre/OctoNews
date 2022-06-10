import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Search } from "./pages/Search";
import { UserCreate } from "./pages/UserCreate";
import { LoginPage } from "./pages/UserLogin";
import { useEffect } from "react";
import { UserValidation } from "./pages/UserValidation";
import { Submit } from "./pages/Submit";
import { Category } from "./pages/Category";
import { Edit } from "./pages/Edit";
import { UserSettings } from "./pages/UserSettings";

// UserCreate UserLogin

function GoUpWhenChangeLocation() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <>
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
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/users/:name/settings" element={<UserSettings />} />
        <Route path="/users/validate/:code" element={<UserValidation />} />
        <Route
          path="/*"
          element={<p className="home-page error">Wrong link</p>}
        />
      </Routes>
      <GoUpWhenChangeLocation />
    </>
  );
}

export default App;
