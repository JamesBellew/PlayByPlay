import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoPage from "./NoPage";
import Football from "./Football/Football";
import Layout from "./Layout";
import SetPlay from "./Football/SetPlay";
import Formations from "./Football/Formations";
import KickOuts from "./Football/KickOuts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<KickOuts />} />
            <Route path="Football" element={<Football />} />
            <Route path="Football/SetPlay" element={<SetPlay />} />
            <Route path="Football/Formations" element={<Formations />} />
            <Route path="Football/KickOuts" element={<KickOuts />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
