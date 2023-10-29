import './scss/Task.scss';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { CheckCircle, CheckCircleFill } from 'react-bootstrap-icons';

const Task = (props) => {

  const {text, id, handleDelete, handleEdit, completed, onCheck,list, withList } = props;
  const [checked, setChecked] = useState(completed)

  const handleCheck = () => {
    setChecked(!checked)
    onCheck(id)
  }

  useEffect(() => {
    setChecked(completed)
  }, [completed])

  return (<ListGroup.Item key={id} className="task">
    {checked ?  <CheckCircleFill size={25}  className="task-check-icon" onClick={() => handleCheck(id)}/> : <CheckCircle size={25} className="task-check-icon"  onClick={() => handleCheck(id)}/>}
    <label className={`task-text${checked ? ' strikethrough' : ''}`}>{text}</label>
    {withList && <label className={`task-text list`}>{list}</label>}
    <div className="task--spacer"/>
    <span className="task-buttons">
      <Button variant="light" onClick={() => handleEdit(id)}>Edit</Button>
      <Button variant="danger" onClick={() => handleDelete(id)}>Delete</Button>
    </span> 
  </ListGroup.Item>
   
  );  
}

export default Task;
