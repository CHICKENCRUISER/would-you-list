import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../routes/Home";
import AddReview from "../routes/AddReview";
import ShowReview from "./Review/ShowReview";
import Header from "./Header";
import ReviewGrid from "./Review/ReviewGrid";


const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<ReviewGrid />} />
          <Route path="/review/new/:id" element={<AddReview />} />
          <Route path="/review/:id" element={<ShowReview />} />
          <Route path="*" element={<div>없는페이지임</div>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
