import React from "react";
import { useNavigate } from "react-router-dom";
import MainTabs from "../components/MainTabs";

const Home = () => {
  const navigate = useNavigate();

  const todoBtnClicked = () => {
    navigate("/todo");
  };
  const reviewBtnClicked = () => {
    navigate("/review");
  };

  return (
    <div>
      <MainTabs />
      {/* <button onClick={todoBtnClicked}>Todo</button>
      <button onClick={reviewBtnClicked}>Review</button> */}
    </div>
  );
};

export default Home;
