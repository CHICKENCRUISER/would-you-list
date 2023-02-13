import React, { useState, useEffect } from "react";
import { getReviews } from "../../models/reviews";


const Review = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await getReviews();
      setReviews(res);
    }
    f();
  }, []);

  return (
    <div>
      {reviews ? (
        reviews.map((review) => <div key={review.doneDate}>{review.title}</div>)
      ) : (
        <div>리뷰를 작성해보세요!</div>
      )}
    </div>
  )
}


export default Review;