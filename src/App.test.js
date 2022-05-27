import { render, screen } from '@testing-library/react';
import App from './App';

test('renders list of pinned or not pinned tasks', () => {
  const { container } = render(<App />);
  const TaskBox = screen.getByText(/Taskbox/i);
  expect(TaskBox).toBeInTheDocument();
  expect(container.getElementsByClassName('list-item')).toBeDefined();
});
