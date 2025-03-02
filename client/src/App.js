import React, { useState } from "react";
import "./App.css";

function App() {
  // For simplicity, let's assume the main calendar shows a single week: Sunday 16 -> Saturday 22
  // You can make this dynamic based on selectedDate or viewMode.
  const weekDays = [
    { dayName: "Sunday", date: 16 },
    { dayName: "Monday", date: 17 },
    { dayName: "Tuesday", date: 18 },
    { dayName: "Wednesday", date: 19 },
    { dayName: "Thursday", date: 20 },
    { dayName: "Friday", date: 21 },
    { dayName: "Saturday", date: 22 },
  ];

  // VIEW MODE: "month", "week", or "day"
  const [viewMode, setViewMode] = useState("week");

  // MINI-CALENDAR: Store the current month & year in state
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date(2023, 11, 1)); // December 2023
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 11, 16)); // By default, pick Dec 16

  // EVENTS: each event has a dayIndex (0 = Sunday, 1 = Monday, etc.), startHour, duration, etc.
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Design Review",
      dayIndex: 0, // Sunday
      startHour: 9,
      duration: 2, // hours
      participants: ["John", "Lucy"],
      color: "#FFD3E2",
    },
    {
      id: 2,
      title: "Development Sprint",
      dayIndex: 2, // Tuesday
      startHour: 14,
      duration: 1.5,
      participants: ["Mark", "Jane"],
      color: "#D3F1FF",
    },
    {
      id: 3,
      title: "Personal Project",
      dayIndex: 4, // Thursday
      startHour: 16,
      duration: 1,
      participants: [],
      color: "#F8F8D3",
    },
  ]);

  // MODAL & NEW EVENT FORM
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    dayIndex: 0,
    startHour: 9,
    duration: 1,
    participants: "",
    color: "#D3F1FF",
  });

  // Handle switching between Month/Week/Day
  const changeViewMode = (mode) => {
    setViewMode(mode);
  };

  // MINI-CALENDAR: Get days in the currently selected month/year
  const year = miniCalendarDate.getFullYear();
  const month = miniCalendarDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const miniCalendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Navigate mini-calendar
  const prevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setMiniCalendarDate(newDate);
  };
  const nextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setMiniCalendarDate(newDate);
  };

  // Select a day in the mini-calendar
  const handleDayClick = (day) => {
    const newSelected = new Date(year, month, day);
    setSelectedDate(newSelected);
  };

  // FORM HANDLERS
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const parsedDayIndex = Number(newEvent.dayIndex);
    const parsedStartHour = Number(newEvent.startHour);
    const parsedDuration = Number(newEvent.duration);

    const newId = events.length ? events[events.length - 1].id + 1 : 1;
    const participantsList = newEvent.participants
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p !== "");

    const eventToAdd = {
      id: newId,
      title: newEvent.title,
      dayIndex: parsedDayIndex,
      startHour: parsedStartHour,
      duration: parsedDuration,
      participants: participantsList,
      color: newEvent.color,
    };

    setEvents([...events, eventToAdd]);
    closeModal();
    // Reset form
    setNewEvent({
      title: "",
      dayIndex: 0,
      startHour: 9,
      duration: 1,
      participants: "",
      color: "#D3F1FF",
    });
  };

  // Render
  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="user-info">
          <img
            src="https://via.placeholder.com/40"
            alt="User avatar"
            className="user-avatar"
          />
          <div>
            <h2>Antonio Lorenzo</h2>
            <p>My Calendars</p>
          </div>
        </div>

        {/* MINI CALENDAR */}
        <div className="mini-calendar">
          <div className="mini-calendar-header">
            <button className="nav-button" onClick={prevMonth}>
              &lt;
            </button>
            <h3>
              {miniCalendarDate.toLocaleString("default", { month: "long" })}{" "}
              {year}
            </h3>
            <button className="nav-button" onClick={nextMonth}>
              &gt;
            </button>
          </div>
          <div className="mini-calendar-days">
            {miniCalendarDays.map((day) => (
              <div
                key={day}
                className={`mini-calendar-day ${
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === month &&
                  selectedDate.getFullYear() === year
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Extra Section - e.g. "Meat Gabriel" from the screenshot or placeholders */}
        <div className="extra-section">
          <h4>Meat Gabriel In Paris</h4>
          <p>Reading Book</p>
        </div>

        {/* Categories */}
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li>Health</li>
            <li>Work</li>
            <li>Personal</li>
          </ul>
        </div>
      </aside>

      {/* MAIN CALENDAR */}
      <main className="main-calendar">
        {/* HEADER (Month/Week/Day Toggle, Current Month/Year, etc.) */}
        <header className="calendar-header">
          <div className="calendar-navigation">
            {/* If you want to display selectedDate's month/year or a fixed date: */}
            <h2>
              {selectedDate.toLocaleString("default", { month: "long" })},{" "}
              {selectedDate.getFullYear()}
            </h2>
            <div className="view-buttons">
              <button
                className={viewMode === "month" ? "active" : ""}
                onClick={() => changeViewMode("month")}
              >
                Month
              </button>
              <button
                className={viewMode === "week" ? "active" : ""}
                onClick={() => changeViewMode("week")}
              >
                Week
              </button>
              <button
                className={viewMode === "day" ? "active" : ""}
                onClick={() => changeViewMode("day")}
              >
                Day
              </button>
            </div>
          </div>

          {/* Example row of days: Sunday 16 -> Saturday 22 (static) */}
          {viewMode === "week" && (
            <div className="weekdays">
              {weekDays.map((d, index) => (
                <div key={index} className="weekday">
                  {d.dayName}
                  <span>{d.date}</span>
                </div>
              ))}
            </div>
          )}
          {viewMode === "month" && (
            <div className="month-view-placeholder">
              <p>Month view layout goes here</p>
            </div>
          )}
          {viewMode === "day" && (
            <div className="day-view-placeholder">
              <p>Day view layout goes here</p>
            </div>
          )}
        </header>

        {/* CALENDAR BODY (Time Slots & Events) - Show only if Week or Day */}
        {(viewMode === "week" || viewMode === "day") && (
          <div className="calendar-body">
            {/* TIME SLOTS (7am -> 19pm, for example) */}
            <div className="time-slots">
              {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
                <div key={hour} className="time-slot">
                  {hour}:00
                </div>
              ))}
            </div>

            {/* WEEK GRID - 7 columns if in "week" mode, or 1 column if in "day" mode */}
            <div
              className={`events-grid ${
                viewMode === "week" ? "seven-columns" : "one-column"
              }`}
            >
              {Array.from(
                { length: viewMode === "week" ? 7 : 1 },
                (_, colIndex) => {
                  // Each column represents a day in "week" mode
                  // or the single selected day in "day" mode
                  return (
                    <div key={colIndex} className="day-column">
                      {/* Position events that belong to this column's day */}
                      {events
                        .filter((ev) =>
                          viewMode === "week"
                            ? ev.dayIndex === colIndex
                            : ev.dayIndex === 0
                        )
                        .map((ev) => {
                          // top offset: (ev.startHour - 7) * 60
                          const top = (ev.startHour - 7) * 60;
                          const height = ev.duration * 60;
                          return (
                            <div
                              key={ev.id}
                              className="event"
                              style={{
                                top: `${top}px`,
                                height: `${height}px`,
                                backgroundColor: ev.color,
                              }}
                            >
                              <div className="event-time">
                                {ev.startHour}:00 -{" "}
                                {ev.startHour + ev.duration}:00
                              </div>
                              <div className="event-title">{ev.title}</div>
                              {ev.participants.length > 0 && (
                                <div className="event-participants">
                                  {ev.participants.join(", ")}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* FLOATING BUTTON */}
        <button className="add-event-button" onClick={openModal}>
          Add Event
        </button>

        {/* MODAL for "Add New Event" */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Event</h3>
              <form onSubmit={handleAddEvent}>
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleNewEventChange}
                    required
                  />
                </div>
                <div>
                  <label>Day Index (0=Sun,1=Mon,...6=Sat):</label>
                  <input
                    type="number"
                    name="dayIndex"
                    min="0"
                    max="6"
                    value={newEvent.dayIndex}
                    onChange={handleNewEventChange}
                    required
                  />
                </div>
                <div>
                  <label>Start Hour (7-19):</label>
                  <input
                    type="number"
                    name="startHour"
                    min="7"
                    max="19"
                    value={newEvent.startHour}
                    onChange={handleNewEventChange}
                    required
                  />
                </div>
                <div>
                  <label>Duration (hours):</label>
                  <input
                    type="number"
                    step="0.5"
                    name="duration"
                    value={newEvent.duration}
                    onChange={handleNewEventChange}
                    required
                  />
                </div>
                <div>
                  <label>Participants (comma separated):</label>
                  <input
                    type="text"
                    name="participants"
                    value={newEvent.participants}
                    onChange={handleNewEventChange}
                  />
                </div>
                <div>
                  <label>Color:</label>
                  <input
                    type="color"
                    name="color"
                    value={newEvent.color}
                    onChange={handleNewEventChange}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit">Add Event</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} Tasca - Intelligent Task Manager</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
