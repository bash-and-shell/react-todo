import './scss/Task.scss';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Modal, Form } from 'react-bootstrap';
import { CheckCircle, CheckCircleFill } from 'react-bootstrap-icons';


const Task = (props) => {

  const {text, id, handleDelete, handleEdit, completed, onCheck,list, withList } = props;
  const [checked, setChecked] = useState(completed)

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleCheck = () => {
    setChecked(!checked)
    onCheck(id)
  }

  const handleSubmit = () => {
      if(value === '' && value.trim() !== '') {
      setErrorMessage('Please enter task edit')
      setError(true)
      return;
    }

    handleEdit(id, value)
    setValue('')
    handleClose();
    setError(false);
  }

  useEffect(() => {
    setChecked(completed)
  }, [completed])

  
  return (<><ListGroup.Item key={id} className="task">
    {checked ?  <CheckCircleFill size={25}  className="task-check-icon" onClick={() => handleCheck(id)}/> : <CheckCircle size={25} className="task-check-icon"  onClick={() => handleCheck(id)}/>}
    <label className={`task-text${checked ? ' strikethrough' : ''}`}>{text}</label>
    {withList && <label className={`task-text list`}>{list}</label>}
    <div className="task--spacer"/>
    <span className="task-buttons">
      <Button variant="light" onClick={handleOpen}>Edit</Button>
      <Button variant="danger" onClick={() => handleDelete(id)}>Delete</Button>
    </span> 
  </ListGroup.Item>

  <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      Edit Task
    </Modal.Header>
    <Modal.Body>
       <Form onSubmit={handleEdit}>
            <Form.Group controlId="edit-task">

              <Form.Label>Edit task here</Form.Label>
              <Form.Control autoFocus type="text" onChange={e => setValue(e.target.value)} value={value} />
            {error && <p className="error">{errorMessage}</p>}
            </Form.Group>
            </Form>
    </Modal.Body>
     <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
  </Modal>

   </>
  );  
}

export default Task;
