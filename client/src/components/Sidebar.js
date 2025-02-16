import React from 'react';
import Calendar from './Calendar';
import Categories from './Categories';
import UpcomingTasks from './UpcomingTasks';
import AboutUser from './AboutUser';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Tasca Sidebar</h2>
      <Calendar />
      <Categories />
      <UpcomingTasks />
      <AboutUser />
    </div>
  );
}

export default Sidebar;
