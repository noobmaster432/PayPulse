import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transferMoney } from "../utils/func";
import { toast } from "react-toastify";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  const id = searchParams.size != 0 && searchParams.get("id");
  const name = searchParams.size != 0 && searchParams.get("name");

  const handleTransfer = () => {
    transferMoney({ to: id, amount })
      .then(() => {
        navigate("/");
        toast.success("Money transferred successfully");
      })
      .catch((err) => {
        console.error("Error signing up:", err);
        toast.error("Error transferring money");
      });
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div className="w-1/2 flex items-center justify-center">
        <img src="/send2.jpg" alt="Sign in" className="w-2/3" />
      </div>
      <div className="w-1/2 flex items-center justify-start">
        <div className="rounded-lg shadow-xl bg-white border border-slate-100 w-3/4 text-center py-4 px-4">
          <div className="flex items-center justify-center p-6 pb-0">
            <h2 className="text-3xl font-semibold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4 pt-4 pb-8">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0]?.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2 flex flex-col items-start">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition duration-300 ease-in-out px-3 py-2 text-sm"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleTransfer}
                className="flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                <p>Initiate Transfer</p>
                <img src="/send.png" alt="" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
