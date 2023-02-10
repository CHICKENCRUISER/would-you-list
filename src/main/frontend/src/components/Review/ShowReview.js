import reviewDummyData from "./reviewDummyData";
import ReviewCard from "./ReviewCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

//모든 리뷰를 보여주는 컴포넌트
const ShowReview = () => {
  let { id } = useParams();
  const [height, setHeight] = useState(0);
  //리뷰 카드의 높이를 구하기 위한 ref
  const reviewCardRef = useRef(null);

  //리뷰 카드의 높이를 토대로 어디로 이동해야하는지 계산
  //참고로 70은 would you list 배너의 높이임
  useEffect(() => {
    setHeight(70 + reviewCardRef.current.offsetHeight * (parseInt(id) - 1));
  }, []);

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
