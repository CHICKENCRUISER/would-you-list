import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../models/todos";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";

const NewTodo = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const nameInputChanged = (e) => {
    setName(e.target.value);
  };
  const categoryInputChanged = (e) => {
    setCategory(e.target.value);
  };
  const contentInputChanged = (e) => {
    setContent(e.target.value);
  };
  const todoFormSubmitted = async (e) => {
    console.log("submitted");
    closeModal();
    e.preventDefault();
    const newTodo = {
      user: "이동섭",
      date: Date.now(),
      name,
      category,
      content,
    };
    try {
      await createTodo(newTodo);
    } catch (e) {
      console.error(e);
    }
    // navigate("/todo");
  };

  return (
    <>
      <form onSubmit={todoFormSubmitted}>
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
            placeholder="Select category"
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
            placeholder="content"
            value={content}
            onChange={contentInputChanged}
            mb={4}
            required
          />

          <Input type="submit" value="Done!" />
        </FormControl>
      </form>
    </>
  );
};

export default NewTodo;
