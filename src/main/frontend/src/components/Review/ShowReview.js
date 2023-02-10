import reviewDummyData from "./reviewDummyData";
import ReviewCard from "./ReviewCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const ShowReview = () => {
  let { id } = useParams();
  const [height, setHeight] = useState(0);
  const reviewCardRef = useRef(null);

  useEffect(() => {
    setHeight(70 + reviewCardRef.current.offsetHeight * (parseInt(id) - 1));
  }, []);

  const useScrollTo = (xpos, ypos) => {
    useEffect(() => {
      window.scrollTo(xpos, ypos);
    }, [height]);
  };
  useScrollTo(0, height);

  return (
    <div>
      {reviewDummyData.map((data) => {
        return (
          <div ref={reviewCardRef} key={data.todoId}>
            <ReviewCard data={data} />
          </div>
        );
      })}
    </div>
  );
};

export default ShowReview;
