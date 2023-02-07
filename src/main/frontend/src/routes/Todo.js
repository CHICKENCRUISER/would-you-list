import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos } from "../models/todos.js";
import TodoBlock from "../components/TodoBlock";
import { Button } from '@chakra-ui/react'


const Todo = () => {
  const navigate = useNavigate();

  // States
  const [todos, setTodos] = useState([]);

  const f = async () => {
    const res = await getTodos();
    setTodos(res);
  }
  useEffect(() => { 
    f();
  }, []);

  const func = (newTodos) => { setTodos(newTodos); }

  // Event listeners
  const createBtnClicked = () => {
    navigate("/newTodo");
  }

  // Return
  return (
    <div>
      {todos.map((todo) => <TodoBlock key={todo.id} todo={todo} func={func} />)}
      <Button
        onClick={createBtnClicked}
        colorScheme='teal'
        size="xs"
      >Create Todo</Button>
    </div>
  )
}

export default Todo;