import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8080";

const createReview = async (review) => {
  const res = await axios.post(`${url}/review/new`, review, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  console.log(res.data);
  return res.data;
}

export { createReview };