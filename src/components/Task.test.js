import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Task from './Task';



test('matches snapshot', () => {
  const component = renderer.create(<Task />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('checks task', () => {

  const task = {
    id:0,
    list: 'test list',
    completed: false
  }

  const deleteTask = jest.fn();
  const editTask = jest.fn();
  const completeItem = jest.fn();

const {rerender} = render(<Task 
  id={task.id} 
  key={0} 
  list={task.list} 
  text={task.value} 
  handleDelete={deleteTask} 
  handleEdit={editTask} 
  completed={task.completed} 
  onCheck={completeItem}
  />)

  expect(screen.getByTestId('check')).toBeInTheDocument();

  rerender(<Task 
    id={task.id} 
    key={0} 
    list={task.list} 
    text={task.value} 
    handleDelete={deleteTask} 
    handleEdit={editTask} 
    completed={true} 
    onCheck={completeItem}
    />)

    expect(screen.getByTestId('filled-check')).toBeInTheDocument();

})
