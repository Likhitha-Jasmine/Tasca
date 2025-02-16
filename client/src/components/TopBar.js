import React, { useState } from 'react';

function TopBar({ toggleSidebar }) {
  const [view, setView] = useState('Month');

  return (
    <div className="topbar">
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <div>
        <button onClick={() => setView('Month')}>Month</button>
        <button onClick={() => setView('Week')}>Week</button>
        <button onClick={() => setView('Day')}>Day</button>
      </div>
      <span>Current View: {view}</span>
    </div>
  );
}

export default TopBar;
