// src/components/Board.js
import React, { useState, useEffect } from "react";
import fetchData from "../api"; // Import the fetchData function
import Column from "./Column";
import "./Board.css";

const Board = () => {
  const [data, setData] = useState(null);

  const savedGroupingOption =
    localStorage.getItem("groupingOption") || "By Status";
  const savedSortingOption =
    localStorage.getItem("sortingOption") || "Priority";

  const [groupingOption, setGroupingOption] = useState(savedGroupingOption);
  const [sortingOption, setSortingOption] = useState(savedSortingOption);

  useEffect(() => {
    fetchData().then((fetchedData) => {
      setData(fetchedData);
    });

    // Save grouping and sorting options to localStorage
    localStorage.setItem("groupingOption", groupingOption);
    localStorage.setItem("sortingOption", sortingOption);
  }, [groupingOption, sortingOption]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { tickets } = data;
  const statuses = ["Todo", "In progress", "Backlog"];

  const { users } = data;
  console.log("User is ", users);

  const groupByUser = () => {
    const groupedByUser = {};
    tickets.forEach((ticket) => {
      const user = users.find((user) => user.id === ticket.userId);
      if (!groupedByUser[user.name]) {
        groupedByUser[user.name] = {
          user,
          tickets: [],
        };
      }
      groupedByUser[user.name].tickets.push(ticket);
    });
    return groupedByUser;
  };

  const groupByPriority = () => {
    const groupedByPriority = {};
    tickets.forEach((ticket) => {
      if (!groupedByPriority[ticket.priority]) {
        groupedByPriority[ticket.priority] = [];
      }
      groupedByPriority[ticket.priority].push(ticket);
    });
    return groupedByPriority;
  };

  const sortTickets = (tickets, sortingOption) => {
    return [...tickets].sort((a, b) => {
      if (sortingOption === "Priority") {
        return b.priority - a.priority;
      } else if (sortingOption === "Title") {
        return a.title.localeCompare(b.title);
      }
    });
  };

  return (
    <div className="board">
      <div className="options">
        <label>
          Display:{" "}
          <select
            value={groupingOption}
            onChange={(e) => setGroupingOption(e.target.value)}
          >
            <option value="By Status">By Status</option>
            <option value="By User">By User</option>
            <option value="By Priority">By Priority</option>
          </select>
        </label>
        <label>
          Order by:{" "}
          <select
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </label>
      </div>
      <div className="main-board board">
    
      {groupingOption === "By Status" &&
        statuses.map((status) => {
          const filteredTickets = tickets.filter(
            (ticket) => ticket.status === status
          );
          const sortedTickets = sortTickets(filteredTickets, sortingOption);
          return (
            <Column
              key={status}
              title={status}
              tickets={sortedTickets}
              groupingOption={groupingOption}
              sortingOption={sortingOption}
            />
          );
        })}

      {groupingOption === "By User" &&
        Object.entries(groupByUser()).map(([userName, userData]) => {
          const sortedTickets = sortTickets(userData.tickets, sortingOption);
          return (
            <Column
              key={userName}
              title={`${userName}`}
              user={userData.user}
              tickets={sortedTickets}
              groupingOption={groupingOption}
              sortingOption={sortingOption}
            />
          );
        })}

      {groupingOption === "By Priority" &&
        Object.entries(groupByPriority()).map(([priority, priorityTickets]) => {
          const sortedTickets = sortTickets(priorityTickets, sortingOption);
          return (
            <Column
              key={priority}
              title={`Priority ${priority}`}
              tickets={sortedTickets}
              groupingOption={groupingOption}
              sortingOption={sortingOption}
            />
          );
        })}
        </div>
    </div>
  );
};

export default Board;
