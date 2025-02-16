import React, { useState } from 'react';
import axios from 'axios';

function MeetingSchedulerComponent() {
  const [suggestion, setSuggestion] = useState(null);

  const scheduleMeeting = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/meeting', { /* meeting details */ });
      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="meeting-scheduler">
      <h2>Intelligent Meeting Scheduler</h2>
      <button onClick={scheduleMeeting}>Schedule Meeting</button>
      {suggestion && (
        <div>
          <p>Suggested Time: {suggestion.time}</p>
          <p>Suggested Location: {suggestion.location}</p>
        </div>
      )}
    </div>
  );
}

export default MeetingSchedulerComponent;
