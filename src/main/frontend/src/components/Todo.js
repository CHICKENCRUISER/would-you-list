import React, { useState, useEffect } from "react";
import { getTodos } from "../models/todos.js";
import TodoBlock from "./TodoBlock";
import { Box, Accordion } from "@chakra-ui/react";
import AddModal from "./AddModal";

//Todo 목록을 보여주는 컴포넌트
//Home => MainTabs => Todo
const Todo = () => {
  const [todos, setTodos] = useState([]);

  //Todo 목록을 서버에서 받아오는 함수
  const refreshTodos = async () => {
    const res = await getTodos();
    setTodos(res);
  };

  //최초 렌더링시 Todo 목록을 서버에서 받아오는 함수를 실행
  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <Box m={0}>
      <Accordion allowToggle>
        {todos.map((todo) => (
          <TodoBlock
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            refreshTodos={refreshTodos}
          />
        ))}
      </Accordion>
      <AddModal />
    </Box>
  );
};

export default Todo;
