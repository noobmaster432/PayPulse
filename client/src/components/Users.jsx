/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import send from '/send.png';
import { useNavigate } from "react-router-dom";
import { searchUser } from "../utils/func";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const colors = [
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
  ];

  useEffect(() => {
    searchUser(filter)
    .then((res) => {
      setUsers(res.users);
    })
  }, [filter])

  return (
    <div className="w-1/2 px-6 py-4 bg-slate-50 rounded-lg">
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 text-sm border rounded-md border-slate-50 focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent transition duration-300 ease-in-out"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="my-4 space-y-1">
        {users.map((user, i) => (
          <User key={user._id} user={user} color={colors[i%7]} />
        ))}
      </div>
    </div>
  );
};

function User({ user, color }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between hover:bg-slate-100 p-3 rounded-lg">
      <div className="flex flex-grow">
        <div
          className={`rounded-full h-10 w-10 ${color} flex justify-center mt-1 mr-2`}
        >
          <div className="flex font-title text-white font-semibold flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <button
          onClick={() => navigate(`/send?id=${user.id}&name=${user.firstName}`)}
          type="button"
          className="w-full flex gap-2 justify-between items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <p>Send Money</p>
          <img src={send} alt="" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
