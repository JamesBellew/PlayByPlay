import { Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";

const Football = () => {
  return (
    <>
      <div className="flex h-screen ">
        <div className=" m-auto ">
          <h1 className="mb-28 text-2xl text-slate-900 font-medium capitalize ">
            Football
          </h1>
          <div class="grid grid-cols-4 gap-4 align-middle ">
            <Link
              to="SetPlay"
              className="bg-slate-700 cursor-pointer rounded
              text-white h-auto text-2xl px-10 py-10 w-full text-center
              items-center">
              {" "}
              New Set Play
            </Link>
            <Link
              to="Formations"
              className="bg-slate-700 cursor-pointer  rounded text-white h-auto text-2xl px-10 py-10  w-full  text-center items-center">
              Formations
            </Link>
            <a className="bg-slate-700 cursor-pointer  rounded text-white h-auto text-2xl px-10 py-10  w-full  text-center items-center">
              Rosters
            </a>
            <a className="bg-slate-700 cursor-pointer  rounded text-white h-auto text-2xl px-10 py-10  w-full  text-center items-center">
              Saved Set Plays
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Football;
