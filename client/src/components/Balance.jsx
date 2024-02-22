/* eslint-disable react/prop-types */
export const Balance = ({ value }) => {
  return (
    <div className="grid grid-cols-4 gap-4 px-12 my-8">
      <div className="p-5 rounded-lg text-white bg-orange-500">
        <div className="font-semibold text-2xl">Balance Left</div>
        <div className="font-medium text-4xl">₹{value}</div>
      </div>
      <div className="p-5 rounded-lg text-white bg-blue-500">
        <div className="font-semibold text-2xl">Total Spendings</div>
        <div className="font-medium text-4xl">₹{Math.floor(100000 * Math.random())}</div>
      </div>
      <div className="p-5 rounded-lg text-white bg-green-500">
        <div className="font-semibold text-2xl">Money Received</div>
        <div className="font-medium text-4xl">₹{Math.floor(10000 * Math.random())}</div>
      </div>
      <div className="p-5 rounded-lg text-white bg-red-600">
        <div className="font-semibold text-2xl">Pending Bills</div>
        <div className="font-medium text-4xl">₹{Math.floor(1000 * Math.random())}</div>
      </div>
    </div>
  );
};
