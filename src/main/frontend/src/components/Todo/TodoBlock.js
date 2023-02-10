import React, { useState } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import EditForm from "./TodoEditForm";
import ShowTodoContent from "./TodoBlockOptions";
import { toggleTodoState } from "../../models/todos";

//Todo 한블럭 생성 컴포넌트
//Home => MainTabs => Todo => TodoBlock
const TodoBlock = ({ todo, refreshTodos, isDone }) => {
  //Todo 블럭의 edit 상태를 관리하는 state
  const [edit, setEdit] = useState(false);

  //tag 색상 관리 변수
  const tagColors = {
    FOOD: "gray",
    MOVIE: "red",
    DRAMA: "orange",
    ACTIVITY: "yellow",
    BOOK: "green",
    MUSIC: "teal",
    BAKING: "blue",
    SPORTS: "cyan",
  };

  //edit 상태를 변경하는 함수
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };
  const toggleState = async () => {
    await toggleTodoState(todo.id);
    refreshTodos();
    // window.location.replace("/");
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Checkbox
            mr={2}
            isChecked={todo.state}
            onChange={toggleState}
          ></Checkbox>
          <Box as="span" flex="1" textAlign="left">
            {todo.name}
          </Box>
          <Badge
            colorScheme={tagColors[todo.category]}
            w="90px"
            textAlign="middle"
            fontSize="lg"
          >
            {todo.category}
          </Badge>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {edit ? (
          <EditForm
            refreshTodos={refreshTodos}
            todo={todo}
            toggleEdit={toggleEdit}
          />
        ) : (
          <ShowTodoContent
            todo={todo}
            refreshTodos={refreshTodos}
            toggleEdit={toggleEdit}
            isDone={isDone}
          />
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TodoBlock;
