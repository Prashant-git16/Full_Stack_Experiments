import { render, screen } from '@testing-library/react';
import Calendar from './components/Calendar';
import EventCard from './components/EventCard';


test('renders event title in EventCard', () => {
  const mockEvent = { id: 1, title: 'Meeting', date: '2026-08-18' };

  render(<EventCard event={mockEvent} onDragStart={() => {}} />);

  expect(screen.getByText('Meeting')).toBeInTheDocument();
});

test('renders Calendar component', () => {
  render(<Calendar />);
  expect(screen.getByText(/Calendar -/i)).toBeInTheDocument();
});