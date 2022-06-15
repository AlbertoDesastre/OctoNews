import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Search } from "./pages/Search";
import { UserCreate } from "./pages/UserCreate";
import { LoginPage } from "./pages/UserLogin";
import { useEffect } from "react";
import { UserValidation } from "./pages/UserValidation";
import { SubmitNews } from "./pages/SubmitNews";
import { Category } from "./pages/Category";
import { EditNews } from "./pages/EditNews";
import { UserSettings } from "./pages/UserSettings";
import { NotFound } from "./pages/NotFound";
import { RecoverPage } from "./pages/RecoverPage";

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
        <Route path="/recover-password" element={<RecoverPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/news/:id" element={<News />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/submit" element={<SubmitNews />} />
        <Route path="/edit/:id" element={<EditNews />} />
        <Route path="/users/:id/settings" element={<UserSettings />} />
        <Route path="/users/validate/:code" element={<UserValidation />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <GoUpWhenChangeLocation />
    </>
  );
}

export default App;
