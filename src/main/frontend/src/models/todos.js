import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8080";

const getTodos = async () => {
  const response = await axios.get(`${url}/todo`);
  return response.data;
}

const getTodosByState = async (state) => {
  let result;
  let response;

  switch (state) {
    case "false":
      result = await axios.get(`${url}/todo`);
      return result.data;
    case "true":
      response = await axios.get(`${url}/doneTodo`);
      result = response.data.filter((todo) => {
        if (todo.review) { return false; }
        else { return true; }
      });
      return result;
    case "reviewed":
      response = await axios.get(`${url}/doneTodo`);
      result = response.data.filter((todo) => {
        if (todo.review) { return true; }
        else { return false; }
      });
      return result;
  }
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