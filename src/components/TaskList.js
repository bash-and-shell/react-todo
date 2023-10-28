import React, {useState} from "react";
import { ListGroup } from "react-bootstrap";
import './scss/TaskList.scss'
const TaskList = (props) => {
  const { tasks, children, ...rest } = props;
  
  return(
    <ListGroup className="task-list">
     {children}
    </ListGroup>
  )
}

export default TaskList;