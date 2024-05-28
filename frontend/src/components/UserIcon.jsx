/* eslint-disable react/prop-types */


const UserIcon = ({ user }) => {
  // console.log(user)
  const bgColorClass = user?.available ? "bg-yellow-400" : "bg-gray-400";
  const initials = user?.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4 bg-blue-800 rounded-full dark:bg-pink-600">
      <span
        className={`bottom-0 left-3 absolute w-2 h-2 ${bgColorClass} border-2 border-white dark:border-gray-800 rounded-full`}
      ></span>
      <span className="font-medium text-white text-[8px]">{initials}</span>
    </div>
  );
};

export default UserIcon;
