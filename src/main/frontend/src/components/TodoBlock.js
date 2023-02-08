import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tag,
  Button,
  Checkbox,
  CheckboxGroup,
  Badge,
  FormControl,
  Input,
  Select,
} from "@chakra-ui/react";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { getTodos, deleteTodo, updateTodo } from "../models/todos";

const TodoBlock = ({ todo, func }) => {
  const [name, setName] = useState(todo.name);
  const [category, setCategory] = useState(todo.category);
  const [content, setContent] = useState(todo.content);
  const [edit, setEdit] = useState(false);
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

  const refreshTodos = async () => {
    const res = await getTodos();
    func(res);
  };
  const deleteBtnClicked = async () => {
    try {
      await deleteTodo(todo.id);
      refreshTodos();
    } catch (e) {
      console.error(e);
    }
  };
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };
  const nameInputChanged = (e) => {
    setName(e.target.value);
  };
  const categoryInputChanged = (e) => {
    setCategory(e.target.value);
  };
  const contentInputChanged = (e) => {
    setContent(e.target.value);
  };
  const editFormSubmitted = async (e) => {
    e.preventDefault();
    const edittedTodo = {
      user: todo.user,
      date: todo.date,
      name,
      category,
      content,
    };
    try {
      await updateTodo(todo.id, edittedTodo);
      refreshTodos();
    } catch (e) {
      console.error(e);
    }
    toggleEdit();
  };
  const cancleBtnClicked = () => {
    setName(todo.name);
    setCategory(todo.category);
    setContent(todo.content);
    toggleEdit();
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Checkbox mr={2}></Checkbox>
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
        <div>
          {edit ? (
            <>
              <form onSubmit={editFormSubmitted}>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Todo"
                    value={name}
                    onChange={nameInputChanged}
                    mb={4}
                    required
                  />
                  <Select
                    placeholder="Select option"
                    value={category}
                    onChange={categoryInputChanged}
                    mb={4}
                    required
                  >
                    <option value="FOOD">FOOD</option>
                    <option value="MOVIE">MOVIE</option>
                    <option value="DRAMA">DRAMA</option>
                    <option value="ACTIVITY">ACTIVITY</option>
                    <option value="BOOK">BOOK</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="BAKING">BAKING</option>
                    <option value="SPORTS">SPORTS</option>
                  </Select>
                  <Input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={contentInputChanged}
                    mb={4}
                    required
                  />

                  <Input type="submit" value="Done!" />
                </FormControl>
              </form>
              <button onClick={cancleBtnClicked}>Cancle</button>
            </>
          ) : (
            <>
              <div> {todo.content}</div>
              <Button
                leftIcon={<EditIcon />}
                onClick={toggleEdit}
                colorScheme="teal"
                size="xs"
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
            </>
          )}
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TodoBlock;
