import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './scss/EditLists.scss';

const EditLists = (props) => {

  const { onSubmit, type, currentList } = props;

  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(props.enabled);
  }, [props.enabled])

  const handleSubmit = () => {
    if(value === '' && value.trim() !== '') {
      setErrorMessage('Please enter a name')
      setError(true)
      return;
    }

    if(onSubmit(value) === false) {
      setErrorMessage('This list name is already in use')
      setError(true)
      return;
    }

    setValue('')
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
  
  const buttonVariant = () => {
    if(type === 'New') return 'success'
    if(type === 'Edit') return 'primary'
    if(type === 'Delete') return 'danger'
  }

  if( type === 'New' || type === 'Edit' )return(
    <>
      <Button variant={buttonVariant()} onClick={handleOpen} disabled={type ==='New' ? false : !enabled}>
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
  )

  if( type === 'Delete' )return(
    <>
      <Button variant={buttonVariant()} onClick={handleOpen} disabled={!enabled}>
        Delete List
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