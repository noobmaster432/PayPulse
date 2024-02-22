/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../utils/func";
import logo from "/icon.png";

export const AppBar = ({ user }) => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    logOut();
    navigate("/signin");
  };

  return (
    <div className="shadow-lg h-14 flex justify-between px-12">
      <Link to="/">
        <div className="flex items-center justify-center gap-2 h-full cursor-pointer">
          <img src={logo} alt="Pay Pulse" className="h-8 w-8" />
          <h1 className="font-title text-2xl font-medium">Pay Pulse</h1>
        </div>
      </Link>
      <div className="flex gap-4">
        <div className="flex items-center justify-center font-sans my-2 px-4 bg-slate-100 rounded-3xl">{`${user?.firstName} ${user?.lastName}`}</div>
        <div className="rounded-full border border-blue-300 cursor-pointer mt-2 h-10 w-10 bg-indigo-400 text-white hover:bg-opacity-90 flex justify-center">
          <div className="flex flex-col justify-center font-title font-semibold h-full text-xl">
            {user?.firstName?.charAt(0)}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={logoutHandle}
            className="px-2 py-1 hover:text-red-600 hover:bg-white border rounded-md hover:border-red-600 bg-red-500 text-white font-mono cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
