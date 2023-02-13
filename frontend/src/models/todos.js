import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8080";

const getTodos = async () => {
  const response = await axios.get(`${url}/todo`);
  return response.data;
}

const getTodosByState = async (state) => {
  let response;
  if (!state) { response = await axios.get(`${url}/todo`); }
  else { response = await axios.get(`${url}/doneTodo`) }
  return response.data;
}

const createTodo = async (todo) => {
  const response = await axios.post(`${url}/todo/new`, todo);
  return response.data;
}

const deleteTodo = async (id) => {
  const response = await axios.delete(`${url}/todo/${id}`);
  return response.data;
}

const updateTodo = async (id, todo) => {
  const response = await axios.put(`${url}/todo/${id}`, todo);
  return response.data;
}

const toggleTodoState = async (id) => {
  const response = await axios.put(`${url}/todo/${id}/toggle`);
  return response.data;
}

export {
  getTodos,
  getTodosByState,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleTodoState
};