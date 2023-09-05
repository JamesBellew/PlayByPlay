import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="grid grid-cols-12 gap-4 h-screen bg-green-600">
        <div class="col-start-3 col-span-8 bg-indigo-400">01</div>

        <div class="bg-indigo-400 col-span-3">01</div>
        <div class="bg-indigo-400 col-span-3">01</div>
        <div class="bg-indigo-400 col-span-3">01</div>
        <div class="bg-indigo-400 col-span-3">01</div>

        <div class="bg-indigo-400 col-span-4">01</div>
        <div class="bg-indigo-400 col-span-4">01</div>
        <div class="bg-indigo-400 col-span-4">01</div>

        <div class="bg-indigo-400 col-span-6">01</div>
        <div class="bg-indigo-400 col-span-6">01</div>

        <div class="col-start-3 col-span-8 bg-indigo-400">01</div>
      </div>
    </>
  );
}

export default App;
