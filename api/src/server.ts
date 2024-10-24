import express from 'express'
import payload from 'payload'

require('dotenv').config()
const app = express()
app.use(express.json());

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})


// Custom POST endpoint to create a task
app.post('/api/tasks',  async (req, res) => {
  console.log(req.body);
  
  try {
    const newTask = await payload.create({
      collection: 'tasks',
      data: req.body,
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: 'Failed to create task', details: err });
  }
});

// Custom GET endpoint to retrieve all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await payload.find({
      collection: 'tasks',
      where: {}, // You can customize the query here
      user: req.user,
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err });
  }
});

// Custom PUT endpoint to update a specific task by ID
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await payload.update({
      collection: 'tasks',
      id: req.params.id,
      data: req.body,
    });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err });
  }
});

// Custom DELETE endpoint to delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await payload.delete({
      collection: 'tasks',
      id: req.params.id,
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err });
  }
});


const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000)
}

start()
