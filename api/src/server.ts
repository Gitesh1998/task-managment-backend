import express from 'express'
import payload from 'payload'
import cors from 'cors'

require('dotenv').config()
const app = express()
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})



const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  const router = express.Router()

  router.post('/auth/register', async (req, res) => {
    try {
      const newUser = await payload.create({
        collection: 'users',
        data: req.body,
      });

      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Registration failed', details: err });
    }
  });

  // Login endpoint
  router.post('/auth/login', async (req, res) => {
    try {
      const user = await payload.login({
        collection: 'users',
        data: req.body, // Expecting { email, password }
      });

      res.status(200).json(user);
    } catch (err) {
      res.status(401).json({ error: 'Login failed', details: err });
    }
  });

  router.use(payload.authenticate) 

  // Custom POST endpoint to create a task
  router.post('/api/tasks', async (req, res) => {
    console.log(req.body);

    try {
      const newTask = await payload.create({
        collection: 'tasks',
        data: req.body,
      });

      res.status(201).json(newTask);
    } catch (err) {
      console.log("err123: ", 123);

      res.status(500).json({ error: 'Failed to create task', details: err });
    }
  });

  // Custom GET endpoint to retrieve all tasks
  router.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await payload.find({
        collection: 'tasks',
        where: {}, // You can customize the query here
      });
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks', details: err });
    }
  });

  // Custom PUT endpoint to update a specific task by ID
  router.put('/api/tasks/:id', async (req, res) => {
    console.log("req.body: ", req.body);

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
  router.delete('/api/tasks/:id', async (req, res) => {
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

  app.listen(3000)
}

start()
