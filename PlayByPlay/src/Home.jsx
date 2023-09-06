import "./App.css";
import { Outlet, Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="flex h-screen ">
        <div className=" m-auto ">
          <h1 className="mb-28 text-2xl text-slate-900 font-medium capitalize ">
            Select Desired Sport
          </h1>
          <div class="grid grid-cols-4 gap-4 align-middle ">
            <Link
              to="/Football"
              className="bg-slate-700 cursor-pointer  rounded text-white h-auto text-2xl px-10 py-10  w-full  text-center items-center">
              Football
            </Link>
            <a className="bg-slate-700 cursor-pointer  rounded text-white h-auto text-2xl px-10 py-10  w-full  text-center items-center">
              GAA
            </a>
            <a className="bg-slate-700 cursor-pointer  rounded text-white h-auto text-2xl px-10 py-10  w-full  text-center items-center">
              Basketball
            </a>
            <a className="bg-slate-700 cursor-pointer  rounded text-white h-auto text-2xl px-10 py-10  w-full  text-center items-center">
              Hurling
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
