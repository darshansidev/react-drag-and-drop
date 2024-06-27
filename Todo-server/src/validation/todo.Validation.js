const Joi = require('joi');

// Schema for creating a new todo
const createTodo = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('Pending', 'Progress', 'Review', 'Done').required() 
});

// Schema for updating an existing todo
const updateTodo = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('Pending', 'Progress', 'Review', 'Done').optional() 
});

module.exports = { createTodo, updateTodo };
