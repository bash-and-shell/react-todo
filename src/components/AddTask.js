import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './scss/AddTask.scss'

const AddTask = (props) => {
  return (
    <Form className="add-task" onSubmit={props.onSubmit}>
              <Form.Label>Enter New Task</Form.Label>

      <Form.Group controlId="addTask" className='add-task-group'>
        <Form.Control type="text" placeholder="Enter task" />
        <Button className="searchforbutton" variant="primary" type="submit">Add</Button>
      </Form.Group>
    </Form>
  );
}

export default AddTask;
