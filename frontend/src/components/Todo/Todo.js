import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Accordion, Center, Card } from "@chakra-ui/react";

import TodoBlock from "./TodoBlock";
import TodoAddModal from "./TodoAddModal";

import { getTodosByState } from "../../models/todos.js";
import { setTodosNotDone, setTodosDone } from "../../store.js";


// isDone에 따라 미완료된 todo 목록 또는 완료된 todo 목록을 시각화
const Todo = ({ isDone }) => {

  const dispatch = useDispatch();
  let todosNotDone = useSelector((state) => state.todosNotDone);
  let todosDone = useSelector((state) => state.todosDone);

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
    <>
      <Stack spacing={5}>

        <Card minHeight="500px" pxvariant="filled" bgColor="whitesmoke">
          {todos.length ? (
            <Accordion allowToggle>
              {todos.map((todo) => (
                <TodoBlock
                  key={todo.id}
                  todo={todo}
                  refreshTodos={refreshTodos}
                  isDone={isDone}
                />
              ))}
            </Accordion>
          ) : (
            <Center textColor="white" fontSize="2xl" height="500px">
              Empty
            </Center>
          )}
        </Card>

        {isDone ? null : <TodoAddModal refreshTodos={refreshTodos} />}
        
      </Stack>
    </>
  );
};

export default Todo;
