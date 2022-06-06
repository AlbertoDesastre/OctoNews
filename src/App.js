import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Search } from "./pages/Search";

import { UserCreate } from "./pages/UserCreate";
import { LoginPage } from "./pages/UserLogin";
import { Category } from "./pages/Category";
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
          <Route path="/news/:id" element={<News />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/submit" element={<p> post/submit page</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
