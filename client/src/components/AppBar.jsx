/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { logOut } from "../utils/func";

export const AppBar = ({user}) => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    logOut();
    navigate("/signin");
  };

  return (
    <div className="shadow-lg h-14 flex justify-between px-12">
      <div className="flex flex-col justify-center h-full">PayTM</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">{`${user?.firstName} ${user?.lastName}`}</div>
        <div className="rounded-full cursor-pointer mt-2 h-10 w-10 bg-slate-200 hover:bg-opacity-90 flex justify-center mr-4">
          <div className="flex flex-col justify-center h-full text-xl">
            {user?.firstName?.charAt(0)}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={logoutHandle}
            className="px-2 py-1 text-red-500 border rounded-md border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
