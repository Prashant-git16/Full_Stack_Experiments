import React, { useState, useMemo, useCallback } from 'react';
import EventCard from './EventCard';
import Header from './Header';       
import EventModal from './EventModal'; 
import './Calendar.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: '2026-08-18', platform: 'Facebook' },
    { id: 2, title: 'Project Deadline', date: '2026-08-20', platform: 'LinkedIn' },
    { id: 3, title: 'Project Review', date: '2026-08-20', platform: 'Twitter' }
  ]);
  const [selectedDay, setSelectedDay] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setEditingEvent(null); 
    setShowModal(true);
  };

  const handleEventClick = (e, event) => {
    e.stopPropagation(); 
    setSelectedDay(event.date);
    setEditingEvent(event); 
    setShowModal(true);
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setEvents(events.map(ev => 
        ev.id === editingEvent.id ? { ...ev, ...eventData } : ev
      ));
    } else {
      
      setEvents([...events, { id: Date.now(), date: selectedDay, ...eventData }]);
    }
    setShowModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(ev => ev.id !== eventId));
    setShowModal(false);
  };

  // --- EXISTING: DRAG AND DROP LOGIC ---
  const handleDragStart = useCallback((e, eventId) => {
    e.dataTransfer.setData("eventId", eventId);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e, targetDate) => {
    e.preventDefault();
    const draggedEventId = parseInt(e.dataTransfer.getData("eventId"), 10);
    
    setEvents(prevEvents =>
      prevEvents.map(ev =>
        ev.id === draggedEventId ? { ...ev, date: targetDate } : ev
      )
    );
  }, []);

  const getFormatDate = (day) => {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${currentYear}-${monthStr}-${dayStr}`;
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const targetDate = getFormatDate(i);
      const dayEvents = events.filter(e => e.date === targetDate);
      days.push(
        <div
          key={i}
          className="calendar-day date-box" // ADDED date-box class for your CSS styles
          onClick={() => handleDayClick(targetDate)} // UPDATED to open modal
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, targetDate)}
        >
          <div className="date-number">{i}</div>
          {dayEvents.map(event => (
            // Added wrapper div to handle click for editing
            <div key={event.id} onClick={(e) => handleEventClick(e, event)}>
              <EventCard
                event={event}
                onDragStart={handleDragStart}
              />
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      
    
      <Header 
        month={monthNames[currentMonth]} 
        year={currentYear} 
        prevMonth={prevMonth} 
        nextMonth={nextMonth} 
      />

      {/* ADDED WEEKDAYS HEADER to match your grid layout css */}
      <div className="weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {renderDays()}
      </div>

      {/* ADDED EVENT MODAL to handle UI popups */}
      <EventModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSave={handleSaveEvent} 
        onDelete={handleDeleteEvent} 
        selectedDate={selectedDay} 
        editEvent={editingEvent} 
      />
      
    </div>
  );
}
export default Calendar;