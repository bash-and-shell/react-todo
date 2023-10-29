import { ListGroup } from "react-bootstrap";
import './scss/TaskList.scss'

const TaskList = (props) => {
  const { children } = props;
  
  return(
    <ListGroup className="task-list">
     {children}
    </ListGroup>
  )
}

export default TaskList;