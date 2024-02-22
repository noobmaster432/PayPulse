/* eslint-disable react/prop-types */
export const Balance = ({ value }) => {
  return (
    <div className="flex my-4 px-12">
      <div className="font-semibold text-lg">Your balance</div>
      <div className="font-medium ml-4 text-lg">Rs {value}</div>
    </div>
  );
};
