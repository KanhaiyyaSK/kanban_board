import React from "react";
import Card from "./Card";
import "./Column.css";
import { BiSolidUserCircle } from "react-icons/bi";
import { useState } from "react";
import { TitleOutlined } from "@mui/icons-material";

const getPriorityLabel = (priority) => {
  console.log("p", priority);

  if (priority === 0) {
    return "No Priority";
  } else if (priority === 1) {
    return "Urgent";
  } else if (priority === 2) {
    return "High";
  } else if (priority === 3) {
    return "Medium";
  } else if (priority === 4) {
    return "Low";
  }
};

const Column = ({ title, user, tickets, sortingOption }) => {
  const [newPriority, setPriority] = useState("");
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortingOption === "Priority") {
      return b.priority - a.priority;
    } else if (sortingOption === "Title") {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="column">
      <div className="column-title">
        <h3>{title}</h3>
        <h3>{getPriorityLabel({ title })}</h3>
      </div>

      {sortedTickets.map((ticket) => (
        <Card
          key={ticket.id}
          ticket={ticket}
          priorityLabel={getPriorityLabel(ticket.priority)}
        />
      ))}
    </div>
  );
};

export default Column;
