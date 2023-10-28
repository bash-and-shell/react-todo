import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('matches snapshot', () => {
  const component = renderer.create(<App />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('adds element', () => {
  render(<App />)

  fireEvent.change(screen.getByPlaceholderText("Enter task"), { target: {value: 'hello'} })
  fireEvent.click(screen.getByText("Add"))

  expect(screen.getByText('hello'))
})

test('deletes element', () => {
  render(<App />)

  fireEvent.change(screen.getByPlaceholderText("Enter task"), { target: {value: 'hello'} })
  fireEvent.click(screen.getByText("Add"))

  const item = screen.getByText('hello')
  expect(item)

  fireEvent.click(screen.getByText("Delete"))

  expect(item).not.toBeInTheDocument()
})

