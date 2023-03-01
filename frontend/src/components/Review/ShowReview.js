import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import ReviewCard from "./ReviewCard";

import { getReviews } from "../../models/reviews";


// 리뷰를 스크롤 형식으로 보여주는 컴포넌트
const ShowReview = () => {

  const [reviews, setReviews] = useState([]);
  const [height, setHeight] = useState(0);

  // 리뷰 카드의 높이를 구하기 위한 ref
  const reviewCardRef = useRef(null);

  let idOrder = 0;
  let { id } = useParams();

  // 리뷰 데이터 수신
  useEffect(() => {
    const f = async () => {
      const res = await getReviews();
      setReviews(res);
    };
    f();
  }, []);
  // 리뷰 카드의 높이를 토대로 스크롤 위치 계산
  useEffect(() => {
    if (reviewCardRef.current) {
      idOrder = reviews.findIndex((review) => review.id === parseInt(id));
      setHeight(70 + reviewCardRef.current.offsetHeight * idOrder);
      // ** 70: would you list 배너(헤더)의 높이임
    }
  })
  // 계산된 스크롤 위치로 즉시 이동: height 값이 변경될 때마다 실행됨
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
