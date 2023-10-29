import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const NewList = (props) => {

  const { onSubmit } = props;

  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleSubmit = () => {
    setValue('')
    onSubmit(value);
    handleClose();
  }


  return(
    <>
      <Button variant='success' onClick={handleOpen}>
        New List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          Enter List Name
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="new-list-name">

              <Form.Label>Enter name here</Form.Label>
              <Form.Control autoFocus type="text" onChange={e => setValue(e.target.value)} value={value} />
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
  )
}

export default NewList;