import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../models/todos";


const Home = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const nameInputChanged = (e) => {
    setName(e.target.value);
  }
  const categoryInputChanged = (e) => {
    setCategory(e.target.value)
  }
  const contentInputChanged = (e) => {
    setContent(e.target.value);
  }
  const todoFormSubmitted = async (e) => {
    e.preventDefault();
    const newTodo = {
      user: "이동섭",
      date: Date.now(),
      name,
      category,
      content
    }
    try {
      await createTodo(newTodo);
    } catch (e) { console.error(e); }
    navigate("/todo");
  }

  return (
    <>
      <form onSubmit={todoFormSubmitted}>
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
    </>
  );
}

export default Home;