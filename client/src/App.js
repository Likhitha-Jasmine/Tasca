import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Mock data for the side mini calendar
  const miniCalendar = {
    month: "July",
    year: 2022,
    days: Array.from({ length: 31 }, (_, i) => i + 1), // 1..31
  };

  // Mock data for the main calendar
  const events = [
    {
      id: 1,
      title: "Design Review",
      time: "10:00 AM - 11:00 AM",
      participants: ["John", "Lucy"],
      color: "#FFD3E2",
    },
    {
      id: 2,
      title: "Development Sprint",
      time: "2:00 PM - 3:30 PM",
      participants: ["Mark", "Jane"],
      color: "#D3F1FF",
    },
    {
      id: 3,
      title: "Personal project",
      time: "4:00 PM - 5:00 PM",
      participants: [],
      color: "#F8F8D3",
    },
    // ... Add more if needed
  ];

  const handleDayClick = (day) => {
    // handle selecting a day from the mini calendar
    setSelectedDate(new Date(miniCalendar.year, 6, day)); // July is month index 6
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
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

        {/* Mini Calendar */}
        <div className="mini-calendar">
          <div className="mini-calendar-header">
            <h3>{miniCalendar.month} {miniCalendar.year}</h3>
          </div>
          <div className="mini-calendar-days">
            {miniCalendar.days.map((day) => (
              <div
                key={day}
                className={`mini-calendar-day ${
                  selectedDate.getDate() === day ? "selected" : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Categories or additional lists */}
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li>Health</li>
            <li>Work</li>
            <li>Personal</li>
            {/* Add more as needed */}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-calendar">
        {/* Top bar with month/week/day toggle */}
        <header className="calendar-header">
          <div className="calendar-navigation">
            <h2>December, 2023</h2>
            <div className="view-buttons">
              <button>Month</button>
              <button>Week</button>
              <button>Day</button>
            </div>
          </div>
          <div className="weekdays">
            <div className="weekday">Sunday <span>16</span></div>
            <div className="weekday">Monday <span>17</span></div>
            <div className="weekday">Tuesday <span>18</span></div>
            <div className="weekday">Wednesday <span>19</span></div>
            <div className="weekday">Thursday <span>20</span></div>
            <div className="weekday">Friday <span>21</span></div>
            <div className="weekday">Saturday <span>22</span></div>
          </div>
        </header>

        {/* Calendar schedule area */}
        <div className="calendar-body">
          {/* Time slots on the left */}
          <div className="time-slots">
            {Array.from({ length: 12 }, (_, i) => i + 7).map((hour) => (
              <div key={hour} className="time-slot">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="events-container">
            {events.map((event) => (
              <div
                key={event.id}
                className="event"
                style={{ backgroundColor: event.color }}
              >
                <div className="event-time">{event.time}</div>
                <div className="event-title">{event.title}</div>
                {event.participants.length > 0 && (
                  <div className="event-participants">
                    {event.participants.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Button to open "Add Event" Modal */}
        <button className="add-event-button" onClick={openModal}>
          Add Event
        </button>

        {/* Example of a popup/modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Meet with Jonson Rider!</h3>
              <p>Tuesday, 10 December</p>
              <p>Park Lane Office</p>
              <div className="modal-actions">
                <button onClick={closeModal}>Close</button>
                <button>Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
