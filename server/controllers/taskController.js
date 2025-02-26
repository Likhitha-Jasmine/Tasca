// Placeholder for task management endpoints
exports.getTasks = (req, res) => {
    res.json([{ id: 1, title: "Sample Task", description: "This is a sample task." }]);
  };
  
  exports.addTask = (req, res) => {
    res.json({ message: "Task added", task: req.body });
  };
  
  exports.updateTask = (req, res) => {
    res.json({ message: "Task updated", id: req.params.id });
  };
  
  exports.deleteTask = (req, res) => {
    res.json({ message: "Task deleted", id: req.params.id });
  };
  