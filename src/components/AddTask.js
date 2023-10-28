import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './scss/AddTask.scss'
import { useState } from 'react';

const AddTask = (props) => {

  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit(value);
  }

  return (
    <Form className="add-task" onSubmit={handleSubmit}>
              <Form.Label>Enter New Task</Form.Label>

      <Form.Group controlId="addTask" className='add-task-group'>
        <Form.Control type="text" placeholder="Enter task" onChange={e => setValue(e.target.value)} value={value} />
        <Button variant="primary" type="submit">Add</Button>
      </Form.Group>
    </Form>
  );
}

export default AddTask;
