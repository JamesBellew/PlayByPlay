import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoPage from "./NoPage";
import Football from "./Football";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* this is the rout components haib  */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="*" element={<NoPage />} />
            <Route path="Football" element={<Football />} />
            {/* <Route index element={<Home />} /> */}
            {/* <Route index element={<Home />} /> */}
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
