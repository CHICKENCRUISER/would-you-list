import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";

import { deleteTodo } from "../../models/todos";

// 개별 Todo 컴포넌트의 내용 및 수정/삭제/리뷰작성 버튼 부분 컴포넌트
const TodoBlockOptions = ({ todo, refreshTodos, toggleEdit, isDone }) => {
  const deleteBtnClicked = async () => {
    try {
      await deleteTodo(todo.id);
      refreshTodos();
    } catch (e) {
      console.error(e);
    }
  };

  let navigate = useNavigate();

  const data = {
    todo: todo,
    title: "",
    review: "",
    place: "",
    expression: "happy",
    file: null,
    photo: null,
  };

  return (
    <>
      <div align="left"> {todo.todoContent}</div>

      <Box align="right">
        {isDone ? (
          <Button
            leftIcon={<EditIcon />}
            onClick={() =>
              navigate(`/review/new/${todo.id}`, { state: { data } })
            }
            colorScheme="blue"
            size="xs"
            mr={1}
          >
            리뷰 작성
          </Button>
        ) : null}

        <Button
          leftIcon={<EditIcon />}
          onClick={toggleEdit}
          colorScheme="teal"
          size="xs"
          mr={1}
        >
          Edit
        </Button>

        <Button
          leftIcon={<SmallCloseIcon />}
          onClick={deleteBtnClicked}
          colorScheme="red"
          size="xs"
        >
          Delete
        </Button>
      </Box>
    </>
  );
};
export default TodoBlockOptions;
