import React, { useState } from "react";
import { FormControl, Input, Select, Textarea } from "@chakra-ui/react";

import { updateTodo } from "../../models/todos";


// Todo 수정 컴포넌트
const EditForm = ({ refreshTodos, todo, toggleEdit }) => {

  const [name, setName] = useState(todo.name);
  const [category, setCategory] = useState(todo.category);
  const [content, setContent] = useState(todo.content);
  const [date, setDate] = useState(todo.date);

  const dateInputChanged = (e) => {
    const { target: { value }} = e;
    setDate(value);
  }

  // EditForm에서 입력받은 값을 서버에 업데이트하는 함수
  const editFormSubmitted = async (e) => {
    e.preventDefault();
    const edittedTodo = {
      user: todo.user,
      date,
      name,
      category,
      content,
    };
    try {
      await updateTodo(todo.id, edittedTodo);
      refreshTodos();
    } catch (e) { console.error(e); }
    toggleEdit();
  };

  return (
      <form onSubmit={editFormSubmitted}>
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
              placeholder="Select option"
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
              value={date}
              onChange={dateInputChanged}
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              mb={4}
              required
          />
          <Textarea
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              mb={4}
              required
          />
          <Input type="submit" value="Done!" mb={2} />
          <Input
            type="submit"
            value="Cancle"
            onClick={(e) => {
              e.preventDefault();
              toggleEdit();
            }}
          />
        </FormControl>
      </form>
  );
};

export default EditForm;
