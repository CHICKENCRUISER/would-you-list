import ReviewCard from "./ReviewCard";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { getReviews } from "../../models/reviews";

//모든 리뷰를 보여주는 컴포넌트
const ShowReview = () => {

  const [reviews, setReviews] = useState([]);

  let { id } = useParams();
  const [height, setHeight] = useState(0);
  //리뷰 카드의 높이를 구하기 위한 ref
  const reviewCardRef = useRef(null);

  //리뷰 카드의 높이를 토대로 어디로 이동해야하는지 계산
  //참고로 70은 would you list 배너의 높이임
  useEffect(() => {
    const f = async () => {
      const res = await getReviews();
      setReviews(res);
    }
    f();
  }, []);
  useEffect(() => {
    if (reviewCardRef.current) {
      setHeight(70 + reviewCardRef.current.offsetHeight * (parseInt(id) - 1));
    }
  });

  //즉시 이동
  useEffect(() => {
    window.scrollTo({
      top: height,
      left: 0,
      behavior: "instant",
    });
  }, [height]);

  return (
    <div>
      {reviews.map((review) => (
        <div ref={reviewCardRef} key={review.todo.id}>
          <ReviewCard data={review} />
        </div>
      ))}
    </div>
  );
};

export default ShowReview;
