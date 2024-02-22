import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transferMoney } from "../utils/func";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  const id = searchParams.size!=0 && searchParams.get("id");
  const name = searchParams.size!=0 && searchParams.get("name");

  const handleTransfer = () => {
    transferMoney({ to: id, amount })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error signing up:", err);
      });
  }

  return (
    <div className="bg-slate-100 h-screen flex flex-col justify-center items-center">
      <div className="rounded-lg shadow-lg bg-white w-1/3 text-center py-4 px-4">
        <div className="flex flex-col space-y-1.5 p-6 pb-0">
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
              className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMoney