const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const meetingSchedulerRoutes = require('./routes/meetingScheduler');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/scheduler', meetingSchedulerRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/tasca', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
// At the top with the other routes:
const eventRoutes = require('./routes/events');

// Then use the route, e.g.:
app.use('/api/events', eventRoutes);
