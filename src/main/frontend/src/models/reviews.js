import axios from "axios";
// const axios = require("axios");


const url = "http://localhost:8080";

const getReviews = async () => {
  const res = await axios.get(`${url}/review`);
  return res.data;
}

const createReview = async (review) => {
  const res = await axios.post(`${url}/review/new`, review, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
}

export { getReviews, createReview };