import React from 'react';
import './Calendar.css'; // Assuming you add styling here

// Apply React.memo for Component level Optimization
const EventCard = React.memo(({ event, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      className="event-card"
      style={{ padding: '5px', margin: '5px 0', backgroundColor: '#e0e0e0', cursor: 'grab', borderRadius: '4px' }}
    >
      {event.title}
    </div>
  );
});
export default EventCard;