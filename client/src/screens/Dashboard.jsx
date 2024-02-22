import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { getBalance } from "../utils/func";

const Dashboard = () => {
  const [val, setVal] = useState(0);
  const [UserInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
  });

  useEffect(() => {
    getBalance()
      .then((res) => {
        setVal(parseInt(res.balance));
        setUserInfo({
          firstName: res.account?.userId.firstName,
          lastName: res.account?.userId.lastName,
        });
      })
      .catch((err) => {
        console.error("Error signing up:", err);
      });
  }, []);

  return (
    <div>
      <AppBar user={UserInfo} />
      <Balance value={val} />
      <div className="flex mx-12 mb-12">
        <Users />
        <img src="/confirm.jpg" alt="Users" className="w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export default Dashboard;
