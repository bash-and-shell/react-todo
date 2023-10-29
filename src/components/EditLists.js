import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './scss/EditLists.scss';

const EditLists = (props) => {

  const { onSubmit, type, currentList } = props;

  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleSubmit = () => {
    setValue('')

    if(onSubmit(value) === false) {
      setError(true)
      return;
    }

    handleClose();
    setError(false);
  }

  const handleDelete = () => {
    if(onSubmit(value) === false) {
      setError(true)
      return;
    }

    handleClose();
    setError(false);
  }
  

  //TODO: error checking

  const buttonVariant = () => {
    if(type === 'New') return 'success'
    if(type === 'Edit') return 'primary'
    if(type === 'Delete') return 'danger'
  }

  if( type === 'New' || type === 'Edit' )return(
    <>
      <Button variant={buttonVariant()} onClick={handleOpen}>
        {type} List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          { type === 'New' ? 'Enter List Name' : 'Change List Name' }
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="new-list-name">

              <Form.Label>Enter {type === 'Edit' && 'new '}name here</Form.Label>
              <Form.Control autoFocus type="text" onChange={e => setValue(e.target.value)} value={value} />
            {error && <p className="error">This list name already exists</p>}
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

  if( type === 'Delete' )return(
    <>
      <Button variant={buttonVariant()} onClick={handleOpen}>
        {type} List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          Are you sure you want to delete your {currentList} list
        </Modal.Header>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" type="submit" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  )
}

export default EditLists;