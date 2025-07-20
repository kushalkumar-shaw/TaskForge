const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(auth, getTasks)
  .post(auth, createTask);

router.route('/:id')
  .put(auth, updateTask)
  .delete(auth, deleteTask);

module.exports = router;