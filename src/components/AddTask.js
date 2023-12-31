import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import './scss/AddTask.scss'
import { useState } from 'react';

const AddTask = (props) => {

  const { onSubmit, ...rest } = props;
  const [value, setValue] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(props.enabled);
  }, [props.enabled])

  useEffect(() => {
    if(value === '' || value.trim() === '') {
      setEnabled(false)
    }
    else {
      setEnabled(true)
    }
  },[value])

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  }

  return (
    <Form className="add-task" onSubmit={handleSubmit}>
              <Form.Label>Enter New Task</Form.Label>

      <Form.Group controlId="addTask" className='add-task-group'>
        <Form.Control type="text" placeholder="Enter task" onChange={e => setValue(e.target.value)} value={value} />
        <Button disabled={!enabled} variant="primary" type="submit">Add</Button>
      </Form.Group>
    </Form>
  );
}

export default AddTask;
