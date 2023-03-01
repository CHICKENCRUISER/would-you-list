import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "../routes/Home";
import ShowReview from "./Review/ShowReview";
import ReviewMain from "../routes/ReviewMain";
import TodoMain from "../routes/TodoMain";
import AddEditReview from "../routes/AddEditReview";


const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoMain />} />
          <Route path="/review" element={<ReviewMain />} />
          <Route path="/review/new/:id" element={<AddEditReview />} />
          <Route path="/review/edit/:id" element={<AddEditReview />} />
          <Route path="/review/:id" element={<ShowReview />} />
          <Route path="*" element={<div>여기 아니에요</div>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
