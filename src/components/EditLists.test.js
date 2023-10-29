import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import EditLists from './EditLists';



test('matches snapshot', () => {
  const component = renderer.create(
    <EditLists type="New" onSubmit={jest.fn()}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('opens modal', () => {
  render( <EditLists type="New" onSubmit={jest.fn()}/>)

  //shouldnt be there
  expect(screen.queryByText('Enter List Name')).not.toBeInTheDocument()

  fireEvent.click(screen.getByRole('button'))

  //modal popped up
  expect(screen.queryByText('Enter List Name')).toBeInTheDocument()

})
;