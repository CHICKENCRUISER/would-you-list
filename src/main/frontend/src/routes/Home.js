import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const todoBtnClicked = () => { navigate("/todo"); }
  const reviewBtnClicked = () => { navigate("/review"); }

  return (
    <div>
      <button onClick={todoBtnClicked}>Todo</button>
      <button onClick={reviewBtnClicked}>Review</button>
    </div>
  )
}

export default Home;