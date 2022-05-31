import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/News" element={<News />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
