import  { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { VscEllipsis } from "react-icons/vsc";
import Todo from "./Todo";
import UserIcon from "./UserIcon";
import PriorityIcon from "./PriorityIcon";
import TicketCard from "./TicketCard";
import { useCardContext } from "../context/CardContext";



const TicketList = () => {
  const { data, grouping, ordering} = useCardContext();
  
  const [orderedTickets, setOrderedTickets] = useState([]);

  useEffect(() => {
    const groupedTickets = groupTickets(data.tickets, grouping, data.users, ordering);
    setOrderedTickets(groupedTickets);
  }, [data.tickets, grouping, ordering]);

  const getUserById = (userId) => {
    return data.users.find((user) => user.id === userId) || { name: "Unknown" };
  };

  const priorities = [
    { key: 0, value: 'No Priority' },
    { key: 1, value: 'Low' },
    { key: 2, value: 'Medium' },
    { key: 3, value: 'High' },
    { key: 4, value: 'Urgent' },
  ];

  const groupTickets = (tickets, grouping, users, ordering) => {
    let grouped = [];

    switch (grouping) {
      case "Status":
        grouped = groupByStatus(tickets, ordering);
        break;
      case "User":
        grouped = groupByUser(tickets, users, ordering);
        break;
      case "Priority":
        grouped = groupByPriority(tickets, ordering);
        break;
      default:
        break;
    }

    return grouped;
  };

  const groupByStatus = (tickets, ordering) => {
    const grouped = {};
    const customStatuses = ["Todo", "Backlog", "In progress", "Done", "Cancelled"];

    customStatuses.forEach((customStatus) => {
      grouped[customStatus] = { key: customStatus, tickets: [] };
    });
  
    tickets.forEach((ticket) => {
      const status = ticket.status || "Unknown";
      const title = ticket.title;
  
      if (!grouped[status]) {
        grouped[status] = { key: status, tickets: [] };
      }
  
      grouped[status].tickets.push({ ...ticket, title });
    });
  
    Object.values(grouped).forEach((group) => {
      group.tickets.sort((a, b) => {
        if (ordering === "Priority") {
          return b.priority - a.priority;
        } else if (ordering === "Title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });
  
    return Object.values(grouped);
  };
  

  const groupByUser = (tickets, users, ordering) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const user = ticket.userId ? ticket.userId : "Unknown";
      const userName = users.find((u) => u.id === user)?.name || "Unknown";
      const title = ticket.title;
      if (!grouped[user]) {
        grouped[user] = { key: userName, tickets: [],userId: user };
      }
      grouped[user].tickets.push({ ...ticket, title });
    });

    Object.values(grouped).forEach((group) => {
      group.tickets.sort((a, b) => {
        if (ordering === "Priority") {
          return b.priority - a.priority;
        } else if (ordering === "Title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });

    return Object.values(grouped);
  };

  const groupByPriority = (tickets, ordering) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const priority = ticket.priority || 0;
      const title = ticket.title;
      if (!grouped[priority]) {
        grouped[priority] = { key: priority, tickets: [] };
      }
      grouped[priority].tickets.push({ ...ticket, title });
    });

    Object.values(grouped).forEach((group) => {
      group.tickets.sort((a, b) => {
        if (ordering === "Priority") {
          return b.priority - a.priority;
        } else if (ordering === "Title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });

    return Object.values(grouped);
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 dark:bg-black min-h-screen bg-gray-300 pt-6 px-9">
      {orderedTickets.map((group) => (
        <div key={group.key}>
          <div className="flex items-center justify-between  md:max-w-[250px] pb-2">
            <div className="flex items-center">
              {grouping === "Status" && <Todo status={group.key} />}
              {grouping === "User" && <UserIcon user={getUserById(group.userId)} />}
              {console.log(group.userId)}
              {grouping === "Priority" && <PriorityIcon priority={group.key} />}
              {grouping === "Priority" ? (
                <h2 className="text-lg text-gray-500 font-medium pl-1 dark:text-white">
                  {priorities.find((item) => item.key === group.key)?.value}
                </h2>
              ) : (
                <h2 className="text-lg text-gray-500 font-medium pl-1 dark:text-white">{group.key}</h2>
              )}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {group.tickets.length}
              </span>
            </div>
            <div className="flex items-center">
              <IoAdd className="mr-1 text-gray-500" />
              <VscEllipsis className="mr-1 text-gray-500" />
            </div>
          </div>
          {group.tickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicketList;
