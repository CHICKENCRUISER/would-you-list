import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import AddReview from "../routes/AddReview";
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
