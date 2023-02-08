import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos } from "../models/todos.js";
import TodoBlock from "../components/TodoBlock";
import { Button, Box, Accordion } from "@chakra-ui/react";
import AddModal from "../components/AddModal";

const Todo = () => {
  const navigate = useNavigate();

  // States
  const [todos, setTodos] = useState([]);

  const f = async () => {
    const res = await getTodos();
    setTodos(res);
  };
  useEffect(() => {
    f();
  }, []);

  const func = (newTodos) => {
    setTodos(newTodos);
  };

  // Event listeners
  const createBtnClicked = () => {
    navigate("/newTodo");
  };

  // Return
  return (
    <Box m={0}>
      <Accordion allowToggle>
        {todos.map((todo) => (
          <TodoBlock key={todo.id} todo={todo} func={func} />
        ))}
      </Accordion>
      <AddModal />
    </Box>
  );
};

export default Todo;
