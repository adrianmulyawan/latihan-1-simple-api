const models = require('../databaseConfig/db/models');
const Todo = models.Todo;

const getAllTodo = async (req, res) => {
  try {
    const data = await Todo.findAll();
    console.info(data, '-> your data');

    // Pengecekan data masih kosong
    if (data.length < 1) {
      return res.status(200).json({
        statusCode: 200,
        message: 'Todo is Empty!'
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Data Todo!',
      data: data
    });
  } catch (error) {
    console.error(error.message, '=> ada error di getAllTodo');
    return res.status(400).json({
      statusCode: '400',
      message: 'Something Error!'
    });
  }
};

const insertTodo = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    console.info(title, description, deadline, '=> kirim data');

    const data = await Todo.create({
      title,
      description,
      deadline
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Success Add New Todo!',
      data: data
    });

  } catch (error) {
    console.error(error.message, '=> ada error di insertTodo');
    return res.status(400).json({
      statusCode: '400',
      message: 'Something Error!'
    });
  }
};

const getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Todo.findOne({
      where: {
        id: id
      }
    });

    if (data === null) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data Todo is Not Found!'
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Data Todo Found!',
      data: data
    });

  } catch (error) {
    console.info(error.message, '=> ada error di getSingleTodo');
    return res.status(400).json({
      statusCode: '400',
      message: 'Something Error!'
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline } = req.body;

    const data = await Todo.findByPk(id);

    if (data === null) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data Todo is Not Found!'
      });
    }

    const updateDataTodo = await data.update({
      title: title || data.title,
      description: description || data.description,
      deadline: deadline || data.deadline 
    });

    console.info(updateDataTodo, '=> update datanya')

    return res.status(200).json({
      statusCode: 200,
      message: 'Success Update Todo!',
      data: updateDataTodo
    });

  } catch (error) {
    console.info(error.message, '=> ada error di getSingleTodo');
    return res.status(400).json({
      statusCode: '400',
      message: 'Something Error!'
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const findTodo = await Todo.findOne({
      where: {
        id: id
      }
    });

    if (findTodo === null) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Todo is Not Found!'
      });
    }

    const deleteTodo = await Todo.destroy({
      where: {
        id: findTodo.id
      }
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Success Delete Todo!'
    });

  } catch (error) {
    console.info(error.message, '=> ada error di deleteTodo');
    return res.status(400).json({
      statusCode: '400',
      message: 'Something Error!'
    });
  }
};

module.exports = {
  getAllTodo,
  insertTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo
}