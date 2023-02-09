import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8080/todo";

const getTodos = async () => {
  const response = await axios.get(url);
  return response.data;
}

const getTodosByState = async (state) => {
  const response = await getTodos();
  let result;
  if (state) {
    result = response.filter(todo => {
      return todo.state;
    });
  } else {
    result = response.filter(todo => {
      return !todo.state;
    });
  }
  return result;
}

const createTodo = async (todo) => {
  const response = await axios.post(`${url}/new`, todo);
  return response.data;
}

const deleteTodo = async (id) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
}

const updateTodo = async (id, todo) => {
  const response = await axios.put(`${url}/${id}`, todo);
  return response.data;
}

export { getTodos, getTodosByState, createTodo, deleteTodo, updateTodo };