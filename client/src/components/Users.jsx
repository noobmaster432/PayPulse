/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../utils/func";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    searchUser(filter)
    .then((res) => {
      setUsers(res.users);
    })
  }, [filter])

  return (
    <div className="px-12">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 text-sm border rounded border-slate-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition duration-300 ease-in-out"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="my-4 space-y-3">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          label={"Send Money"}
          onClick={() =>
            navigate(`/send?id=${user.id}&name=${user.firstName}`)
          }
        />
      </div>
    </div>
  );
}
