import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { NewsContextProvider } from "./context/NewsContext";

function App() {
  return (
    <>
      <NewsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/News" element={<News />} />
          </Routes>
        </BrowserRouter>
      </NewsContextProvider>
    </>
  );
}

export default App;
