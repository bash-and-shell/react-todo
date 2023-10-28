import './scss/Task.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';

const Task = (props) => {

  const {text, index, handleDelete, handleEdit, ...rest} = props;

  return (<ListGroup.Item key={index} className="task">
 <div className='task-text'>
      {props.text}
    </div>
    <span className="task-buttons">
      <Button variant="light" onClick={() => handleEdit(index)}>Edit</Button>
      <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
    </span> 
  </ListGroup.Item>
   
  );  
}

export default Task;
