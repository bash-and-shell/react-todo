import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import AddTask from './AddTask';


test('matches snapshot', () => {
  const component = renderer.create(
    <AddTask enabled={false} onSubmit={jest.fn()}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('check button enables with typing', () => {
  render(    <AddTask enabled={false} onSubmit={jest.fn()}/>  )

  expect(screen.getByRole('button')).toHaveAttribute('disabled');
  
  fireEvent.change(screen.getByPlaceholderText("Enter task"), { target: {value: 'test'} })

  expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
})

test('expect onSubmit to be called', () => {
  const onSubmit = jest.fn()

  render(<AddTask enabled={false} onSubmit={onSubmit}/>  )
  
  fireEvent.change(screen.getByPlaceholderText("Enter task"), { target: {value: 'test'} })

  expect(screen.getByRole('button')).not.toHaveAttribute('disabled');

  fireEvent.click(screen.getByRole('button'))

  expect(onSubmit).toHaveBeenCalled()

})

test('expect onSubmit to not be called with no typing', () => {
  const onSubmit = jest.fn()

  render(<AddTask enabled={false} onSubmit={onSubmit}/>  )

  fireEvent.click(screen.getByRole('button'))

  expect(onSubmit).not.toHaveBeenCalled()

})