import React, { useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TaskManager from "./components/TaskManager";
import MeetingSchedulerComponent from "./components/MeetingSchedulerComponent";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="app-container">
      {sidebarOpen && <Sidebar />}
      <div className="main-content">
        <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-area">
          <TaskManager />
          <MeetingSchedulerComponent />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
