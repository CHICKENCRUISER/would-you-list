import React from "react";
import { FormControl, Input, Select } from "@chakra-ui/react";
import { updateTodo } from "../../models/todos";
import { useState } from "react";

//EditForm 컴포넌트
//Home => MainTabs => Todo => TodoBlock => EditForm
const EditForm = ({ refreshTodos, todo, toggleEdit }) => {
  //EditForm에서 입력받은 값을 state에 저장
  //타이핑을 할 때마다 state가 업데이트되고, state가 업데이트되면 화면이 다시 렌더링된다.
  const [name, setName] = useState(todo.name);
  const [category, setCategory] = useState(todo.category);
  const [content, setContent] = useState(todo.content);

  //EditForm에서 입력받은 값을 서버에 업데이트하는 함수
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
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          mb={4}
          required
        />

        <Input type="submit" value="Done!" />
      </FormControl>
      <button onClick={toggleEdit}>Cancle</button>
    </form>
  );
};

export default EditForm;
