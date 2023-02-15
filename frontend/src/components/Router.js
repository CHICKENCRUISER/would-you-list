import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../routes/Home";
import AddReview from "../routes/AddReview";
import ShowReview from "./Review/ShowReview";
import Header from "./Header";
import ReviewMain from "../routes/ReviewMain";
import TodoMain from "../routes/TodoMain";
import EditReview from "../routes/EditReview";


const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoMain />} />
          <Route path="/review" element={<ReviewMain />} />
          <Route path="/review/new/:id" element={<AddReview />} />
          <Route path="/review/edit/:id" element={<EditReview />} />
          <Route path="/review/:id" element={<ShowReview />} />
          <Route path="*" element={<div>없는페이지임</div>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
