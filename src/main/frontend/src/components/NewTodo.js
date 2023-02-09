import React, { useState } from "react";
import { createTodo } from "../models/todos";
import {
  FormControl,
  Input,
  Select
} from "@chakra-ui/react";
import { getTodos } from "../models/todos";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


const NewTodo = ({ closeModal, setTodos }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  // const [date, setDate] = useState(new Date());

  const todoFormSubmitted = async (e) => {
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
      setTodos(await getTodos());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={todoFormSubmitted}>
      <FormControl>
        <Input
          type="text"
          placeholder="Todo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={4}
          required
        />
        <Select
          placeholder="Select category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          onChange={(e) => setContent(e.target.value)}
          mb={4}
          required
        />
        {/* <DatePicker selected={date} onChange={date => setDate(date)} /> */}
        <Input type="submit" value="Done!" />
      </FormControl>
    </form>
  );
};

export default NewTodo;
