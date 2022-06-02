import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Search } from "./pages/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/:filter" element={<Home />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/News/:id" element={<News />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
