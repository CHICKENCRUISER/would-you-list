import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8080";

const getTodos = async () => {
  const res = await axios.get(`${url}/todo`);
  return res.data;
}

const getTodosByState = async (state) => {
  let res;
  if (!state) { res = await axios.get(`${url}/todo`); }
  else { res = await axios.get(`${url}/doneTodo`) }
  return res.data;
}

const createTodo = async (todo) => {
  const res = await axios.post(`${url}/todo/new`, todo);
  return res.data;
}

const deleteTodo = async (id) => {
  const res = await axios.delete(`${url}/todo/${id}`);
  return res.data;
}

const updateTodo = async (id, todo) => {
  const res = await axios.put(`${url}/todo/${id}`, todo);
  return res.data;
}

const toggleTodoState = async (id) => {
  const res = await axios.put(`${url}/todo/${id}/toggle`);
  return res.data;
}

export {
  getTodos,
  getTodosByState,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleTodoState
};