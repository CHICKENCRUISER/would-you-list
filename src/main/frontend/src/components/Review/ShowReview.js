import ReviewCard from "./ReviewCard";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { getReviews } from "../../models/reviews";

const ShowReview = () => {

  const [reviews, setReviews] = useState([]);

  let { id } = useParams();
  const [height, setHeight] = useState(0);
  const reviewCardRef = useRef(null);

  useEffect(() => {
    const f = async () => {
      const res = await getReviews();
      setReviews(res);
      console.log(res);
    }
    f();
  }, []);
  useEffect(() => {
    if (reviewCardRef.current) {
      setHeight(70 + reviewCardRef.current.offsetHeight * (parseInt(id) - 1));
    }
  }, []);

  const useScrollTo = (xpos, ypos) => {
    useEffect(() => {
      window.scrollTo(xpos, ypos);
    }, [height]);
  };
  useScrollTo(0, height);

  return (
    <div>
      {reviews.map((review) => (
          <div ref={reviewCardRef} key={review.todo.id}>
            <ReviewCard data={review} />
          </div>
        )
      )}
    </div>
  );
};

export default ShowReview;
