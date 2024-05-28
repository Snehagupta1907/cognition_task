import { FaRegCircle } from "react-icons/fa6";
import { MdOutlineCircle } from "react-icons/md";
import { LuCircleDashed } from "react-icons/lu";
import { IoMdPie } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const Todo = ({ status, size  }) => {
  let IconComponent;

  switch (status) {
    case "Todo":
      IconComponent = MdOutlineCircle;
      break;
    case "Backlog":
      IconComponent = LuCircleDashed;
      break;
    case "In progress":
      IconComponent = IoMdPie;
      break;
    case "Done":
      IconComponent = IoIosCheckmarkCircle;
      break;
    case "Cancelled":
      IconComponent = IoIosCloseCircle;
      break;
    default:
      IconComponent = FaRegCircle; 
      break;
  }

  return <IconComponent size={size} className={`${IconComponent===IoMdPie? 'text-yellow-400':''} ${IconComponent===IoIosCheckmarkCircle?'text-blue-700':''} ${IconComponent!== IoMdPie && IconComponent!== IoIosCheckmarkCircle ?'dark:text-white':''}`} />;
};

export default Todo;
