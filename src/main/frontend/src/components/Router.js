import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "../routes/Home";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import Navigation from "../components/Navigation";
import AddReview from "./AddReview";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review/new/:id" element={<AddReview />} />
        <Route path="*" element={<div>없는페이지임</div>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
