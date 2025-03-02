const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dayIndex: { type: Number, required: true }, // e.g., 0 for Sunday, 1 for Monday, etc.
  startHour: { type: Number, required: true },
  duration: { type: Number, required: true },
  participants: { type: [String], default: [] },
  color: { type: String, default: "#D3F1FF" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);
