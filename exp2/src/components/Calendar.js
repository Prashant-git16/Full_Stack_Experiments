import { useState } from "react";
import Header from "./Header";
import EventModal from "./EventModal";
import "./Calendar.css";

function Calendar() {

    const months = [
        "January",
        "February",
        "March","April", "May","June","July","August","September","October","November","December"
    ];

    const weekDays = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState("");
    const [editEvent, setEditEvent] = useState(null);
    const [search, setSearch] = useState("");
    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();
    const firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();
    const prevMonth = () => {
        setCurrentDate(
            new Date(
                currentYear,
                currentMonth - 1,
                1
            )
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(
                currentYear,
                currentMonth + 1,
                1
            )
        );
    };

    const handleDateClick = (day) => {

        setSelectedDay(day);

        setEditEvent(null);

        setShowModal(true);

    };

    const handleEventClick = (event) => {

        setSelectedDay(event.day);

        setEditEvent(event);

        setShowModal(true);

    };

    const saveEvent = (data) => {

        if (editEvent) {

            const updatedEvents = events.map((event) => {

                if (event.id === editEvent.id) {

                    return {
                        ...event,
                        title: data.title,
                        platform: data.platform
                    };

                }

                return event;

            });

            setEvents(updatedEvents);

        } else {

            const newEvent = {

                id: Date.now(),

                day: selectedDay,

                month: currentMonth,

                year: currentYear,

                title: data.title,

                platform: data.platform

            };

            setEvents([...events, newEvent]);

        }

        setShowModal(false);

        setEditEvent(null);

    };

    const deleteEvent = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) {
            return;
        }

        const updatedEvents = events.filter(
            (event) => event.id !== id
        );

        setEvents(updatedEvents);

        setShowModal(false);

        setEditEvent(null);

    };

    const filteredEvents = events.filter((event) => {

        const title = event.title.toLowerCase();

        const searchText = search.trim().toLowerCase();

        return title.includes(searchText);

    });

    const getEventsForDay = (day) => {

        return filteredEvents.filter((event) => {

            return (
                event.day === day &&
                event.month === currentMonth &&
                event.year === currentYear
            );

        });

    };

    const clearSearch = () => {
        setSearch("");
    };

    return (

        <div className="calendar-container">

            <Header
                month={months[currentMonth]}
                year={currentYear}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />

            <div className="search-section">

                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                    <button
                        className="clear-search"
                        onClick={clearSearch}
                    >
                        Clear
                    </button>
                )}

            </div>

            {search && (
                <div className="search-result">

                    {filteredEvents.length > 0
                        ? `${filteredEvents.length} post found`
                        : "No matching posts"}

                </div>
            )}

            <div className="weekdays">

                {weekDays.map((day) => (

                    <div
                        key={day}
                        className="weekday"
                    >
                        {day}
                    </div>

                ))}

            </div>

            <div className="calendar-grid">

                {Array(firstDay)
                    .fill("")
                    .map((_, index) => (

                        <div
                            key={`empty-${index}`}
                            className="empty"
                        ></div>

                    ))}

                {Array.from(
                    { length: daysInMonth },
                    (_, index) => {

                        const day = index + 1;

                        const isToday =
                            day === today.getDate() &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear();

                        const dayEvents =
                            getEventsForDay(day);

                        return (

                            <div
                                key={day}
                                className={`date-box ${
                                    isToday ? "today" : ""
                                }`}
                                onClick={() =>
                                    handleDateClick(day)
                                }
                            >
                                <div className="date-number">
                                    {day}
                                </div>
                                {dayEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className={`event ${event.platform.toLowerCase()}`}
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleEventClick(event);

                                        }}
                                    >
                                        {event.title}
                                    </div>

                                ))}

                            </div>

                        );

                    }
                )}

            </div>

            <EventModal

                show={showModal}

                selectedDate={
                    `${months[currentMonth]} ${selectedDay}, ${currentYear}`
                }

                onSave={saveEvent}

                onDelete={deleteEvent}

                onClose={() => {

                    setShowModal(false);

                    setEditEvent(null);
                }}
                editEvent={editEvent}
            />

        </div>

    );

}
export default Calendar;