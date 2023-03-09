import React, { useState } from "react";
import { FormControl, Input, Select, Textarea } from "@chakra-ui/react";

import { createTodo } from "../../models/todos";


// todo 생성 모달의 내용 컴포넌트
const NewTodo = ({ closeModal, refreshTodos }) => {

  const now = new Date();

  // Format the date and time as a string in the required format
  const dateString = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}T${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const [todoName, setTodoName] = useState("");
  const [category, setCategory] = useState("");
  const [todoContent, setTodoContent] = useState("");
  const [planDate, setPlanDate] = useState(dateString);

  const dateInputChanged = (e) => {
    const {
      target: { value },
    } = e;
    console.log("this is value" + value);
    setPlanDate(value);
  };
  const todoFormSubmitted = async (e) => {
    closeModal();
    e.preventDefault();
    const newTodo = {
      user: "이동섭",
      planDate,
      todoName,
      category,
      todoContent,
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
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
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
          value={planDate}
          placeholder="2023-02-21T07:57"
          size="md"
          type="datetime-local"
          mb={4}
          required
        />

        <Textarea
          type="text"
          placeholder="content"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
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
