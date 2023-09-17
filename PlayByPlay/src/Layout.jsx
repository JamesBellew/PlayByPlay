import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <Link to="/">
            <button className="bg-gray-700 p-1 text-white absolute right-10 w-10  rounded ">
              🏡
            </button>
          </Link>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
