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
} from '@chakra-ui/react';
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { getTodos, deleteTodo, updateTodo } from "../models/todos";


const TodoBlock = ({ todo, func }) => {

  const [name, setName] = useState(todo.name);
  const [category, setCategory] = useState(todo.category);
  const [content, setContent] = useState(todo.content);
  const [edit, setEdit] = useState(false);
  
  const refreshTodos = async () => {
    const res = await getTodos();
    func(res);
  }
  const deleteBtnClicked = async () => {
    try {
      await deleteTodo(todo.id);
      refreshTodos();
    }
    catch (e) { console.error(e); }
  }
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  }
  const nameInputChanged = (e) => {
    setName(e.target.value);
  }
  const categoryInputChanged = (e) => {
    setCategory(e.target.value)
  }
  const contentInputChanged = (e) => {
    setContent(e.target.value);
  }
  const editFormSubmitted = async (e) => {
    e.preventDefault();
    const edittedTodo = {
      user: todo.user,
      date: todo.date,
      name,
      category,
      content
    }
    try {
      await updateTodo(todo.id, edittedTodo);
      refreshTodos();
    }
    catch (e) { console.error(e); }
    toggleEdit();
  }
  const cancleBtnClicked = () => {
    setName(todo.name);
    setCategory(todo.category);
    setContent(todo.content);
    toggleEdit();
  }


  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={editFormSubmitted}>
            <input
              type="text"
              placeholder="Todo"
              value={name}
              onChange={nameInputChanged}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={categoryInputChanged}
              required
            />
            <input
              type="text"
              placeholder="Content"
              value={content}
              onChange={contentInputChanged}
              required
            />
            <input type="submit" value="Done!" />
          </form>
          <button onClick={cancleBtnClicked}>Cancle</button>
        </>
      ) : (
        // <>
        //   <h3>{todo.name}</h3>
        //   <h6>{todo.category}</h6>
        //   <p>{todo.content}</p>
        //   <button onClick={toggleEdit}>Edit</button>
        //   <button onClick={deleteBtnClicked}>Delete</button>
        // </>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">{todo.name}</Box>
                <Tag>{todo.category}</Tag>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {todo.content}
            </AccordionPanel>
            <AccordionPanel>
              <Button
                leftIcon={<EditIcon />}
                onClick={toggleEdit}
                colorScheme='teal'
                size="xs"
              >Edit</Button>
              <Button
                leftIcon={<SmallCloseIcon />}
                onClick={deleteBtnClicked}
                colorScheme='red'
                size="xs"
              >Delete</Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}

export default TodoBlock