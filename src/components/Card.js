// src/components/Card.js
import React from "react";
import "./Card.css";
import {BiSolidTagAlt} from 'react-icons/bi'
import { FaBeer } from 'react-icons/fa';

const Card = ({ user, ticket,priorityLabel}) => {
    console.log("Fuccking ticket", ticket)
  return (
    <div className="card">
     {priorityLabel}
      <div className="text">
      <div>{ticket.id}</div>
        <h4 className="card-title">{ticket.title}</h4>
        <div className="card-info">
          <BiSolidTagAlt/> <span></span>{ticket.tag[0]}
        </div>
      </div>

      {user && (
        <p className="card-info">
          <strong>Assigned to:</strong> {user.name}
        </p>
      )}
    </div>
  );
};

export default Card;
