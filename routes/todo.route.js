const express = require('express');
const router = express.Router();
const { getAllTodo, insertTodo, getSingleTodo, updateTodo, deleteTodo } = require('../controllers/index');

router.get('/api/v1/todo', getAllTodo);
router.get('/api/v1/todo/detail/:id', getSingleTodo);
router.post('/api/v1/todo/add', insertTodo);
router.patch('/api/v1/todo/edit/:id', updateTodo);
router.delete('/api/v1/todo/delete/:id', deleteTodo);

module.exports = router;