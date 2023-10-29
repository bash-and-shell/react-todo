import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

const task = {
  id: 0,
  list: 'Test List 1',
  value: 'Test task 1',
  completed: false
}

test('matches snapshot', () => {

  const component = renderer.create(<App 
     task={[task]}
     lists={['All', 'Test List 1']}
     tabKey={'Test List 1'}
     canChange={true} 
  />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('adds element', () => {
  render(<App 
    task={[task]}
    lists={['All', 'Test List 1']}
    tabKey={'Test List 1'}
    canChange={true} 
 />)

  fireEvent.change(screen.getByPlaceholderText("Enter task"), { target: {value: 'hello'} })
  fireEvent.click(screen.getByText("Add"))

  expect(screen.getAllByText('hello')[0]).toBeInTheDocument()
})

test('deletes element', () => {
  render(<App 
    task={[task]}
    lists={['All', 'Test List 1']}
    tabKey={'Test List 1'}
    canChange={true} 
 />)

  fireEvent.click(screen.getAllByText("Delete")[0])
  expect(screen.queryByText('Test task 1')).not.toBeInTheDocument()

})

test('adds list', () => {
  render(<App 
    task={[task]}
    lists={['All', 'Test List 1']}
    tabKey={'Test List 1'}
    canChange={true} 
 />)

  fireEvent.click(screen.getByText("New List"))
  fireEvent.change(screen.getByPlaceholderText("Enter name here"), { target: {value: 'Test List 2'} })

  fireEvent.click(screen.getByText("Save Changes"))

  expect(screen.queryByText('Test List 2')).toBeInTheDocument()
})

test('deletes list', () => {
  render(<App 
    task={[task]}
    lists={['All', 'Test List 1']}
    tabKey={'Test List 1'}
    canChange={true} 
 />)

  fireEvent.click(screen.getByText("Delete List"))

  fireEvent.click(screen.getAllByText("Delete")[2])

  expect(screen.queryByText('Test List 1')).not.toBeInTheDocument()
})

test('edits list', () => {
  render(<App 
    task={[task]}
    lists={['All', 'Test List 1']}
    tabKey={'Test List 1'}
    canChange={true} 
 />)

  fireEvent.click(screen.getByText("Edit List"))
  fireEvent.change(screen.getByPlaceholderText("Enter name here"), { target: {value: 'Test List 2'} })

  fireEvent.click(screen.getByText("Save Changes"))

  expect(screen.queryAllByText('Test List 2')[0]).toBeInTheDocument()
})