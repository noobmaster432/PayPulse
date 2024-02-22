/* eslint-disable react/prop-types */
export const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <label className="text-sm font-medium text-left">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="-mt-2 w-full text-sm bg-[#f9fafb] rounded-md p-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition duration-300 ease-in-out"
      />
    </div>
  );
};
