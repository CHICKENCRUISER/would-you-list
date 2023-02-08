import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
// import Navigation from "../components/Navigation";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/newTodo" element={<NewTodo />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
