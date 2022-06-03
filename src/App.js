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
          <Route path="/news/:id" element={<News />} />
          <Route path="/category/:id" element={<p> category page</p>} />
          <Route path="/submit" element={<p> post/submit page</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
