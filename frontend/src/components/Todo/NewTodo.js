import React, { useState } from "react";
import { createTodo } from "../../models/todos";
import { FormControl, Input, Select, Textarea } from "@chakra-ui/react";

const NewTodo = ({ closeModal, refreshTodos }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(null);

  const dateInputChanged = (e) => {
    const { target: { value }} = e;
    console.log(value);
    // const arr = value.match(/\d+/g);
    // const result = `${Number(arr[1])}월 ${Number(arr[2])}일 ${arr[3]>=12 ? "오후" : "오전"} ${arr[3]}:${arr[4]}`;
    setDate(value);
  }
  const todoFormSubmitted = async (e) => {
    closeModal();
    e.preventDefault();
    const newTodo = {
      user: "이동섭",
      date,
      name,
      category,
      content,
    };
    try {
      await createTodo(newTodo);
    } catch (e) {
      console.error(e);
    }
    refreshTodos();
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
              onChange={dateInputChanged}
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              mb={4}
              required
          />
          <Textarea
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