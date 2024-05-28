/* eslint-disable react/prop-types */
import { useCardContext } from "../context/CardContext";
import PriorityIcon from "./PriorityIcon";
import UserIcon from "./UserIcon";
import Todo from "./Todo";
import { FaCircle } from "react-icons/fa";

const TicketCard = ({ id, title, priority, tag, userId, status }) => {
  const { data, grouping } = useCardContext();
  const { users } = data;

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId) || { name: "Unknown" };
  };

  return (
    <>
      <div className="w-full md:max-w-[250px] bg-white border border-gray-200 rounded-lg shadow p-2 md:p-4 dark:bg-gray-900 dark:border-gray-700 text-gray-500 mb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 sm:text-lg dark:text-gray-400">{id}</h1>
          {grouping !== "User" && <UserIcon user={getUserById(userId)} />}
          {/* {console.log(getUserById(userId))} */}
        </div>
        <div className="flex">
          {grouping !== "Status" && (
            <div className="mt-1 mr-2">
              <Todo status={status} size="12px" />
            </div>
          )}
          <p className="mb-5 font-medium text-black text-sm dark:text-white">{title}</p>
        </div>
        <div className="flex items-center">
          {grouping !== "Priority" && <PriorityIcon priority={priority} />}

          <div className="border border-gray-300 ml-2 px-2 text-sm flex flex-row items-center dark:text-gray-400">
            <FaCircle className="mr-2 w-2.5 dark:text-gray-400" />
            {tag}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
