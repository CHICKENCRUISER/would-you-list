import React, { useState, useEffect } from "react";
import { getTodosByState } from "../../models/todos.js";
import TodoBlock from "./TodoBlock";
import { Stack, Accordion, Center } from "@chakra-ui/react";
import AddModal from "./TodoAddModal";
import { useSelector, useDispatch } from "react-redux";
import {} from "react-redux";
import { setTodosNotDone, setTodosDone } from "../../store.js";

//Todo 목록을 보여주는 컴포넌트
//Home => MainTabs => Todo
const Todo = ({ isDone }) => {
  //const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  let todosNotDone = useSelector((state) => state.todosNotDone);
  let todosDone = useSelector((state) => state.todosDone);

  //Todo 목록을 서버에서 받아오는 함수
  //isDone이 true면 완료된 Todo 목록을 받아오고 false면 완료되지 않은 Todo 목록을 받아옴
  // const refreshTodos = async () => {
  //   const res = await getTodosByState(isDone);
  //   setTodos(res);
  //   isDone ? dispatch(setTodosDone(res)) : dispatch(setTodosNotDone(res));
  // };

  const refreshTodos = async () => {
    const res1 = await getTodosByState("true");
    const res2 = await getTodosByState("false");
    dispatch(setTodosDone(res1));
    dispatch(setTodosNotDone(res2));
  };

  //Todo 목록을 받아올 때 사용할 변수
  //isDone이 true면 todosDone을, false면 todosNotDone을 사용
  let todos = isDone ? todosDone : todosNotDone;

  //최초 렌더링시 Todo 목록을 서버에서 받아오는 함수를 실행
  useEffect(() => {
    refreshTodos();
  }, []);

  return (
      <Stack spacing={5}>
        {todos.length ? (
            <Accordion allowToggle>
              {todos.map((todo) => (
                  <TodoBlock
                      key={todo.id}
                      todo={todo}
                      //setTodos={setTodos}
                      refreshTodos={refreshTodos}
                      isDone={isDone}
                  />
              ))}
            </Accordion>
        ) : (
            <Center>Empty</Center>
        )}
        {isDone ? null : <AddModal refreshTodos={refreshTodos} />}
      </Stack>
  );
};

export default Todo;