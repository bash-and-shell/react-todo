import './scss/Task.scss';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const Task = () => {
  return (
    <Form>
       {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check // prettier-ignore
            type={type}
            id={`default-${type}`}
            label={`default ${type}`}
          />
        </div>
      ))}
    </Form>
  );
}

export default Task;
