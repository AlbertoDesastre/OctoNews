import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Search } from "./pages/Search";

import { UserCreate } from "./pages/UserCreate";
import { LoginPage } from "./pages/UserLogin";
// UserCreate UserLogin

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
          <Route path="/News/:id" element={<News />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
