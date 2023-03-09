import React, { useState, useEffect } from "react";
import { SimpleGrid, Card, CardBody, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { getReviews } from "../models/reviews";


// Review 기본 화면
// 그리드 형식으로 리뷰를 보여주는 컴포넌트로, 화면 너비에 따라서 카드의 갯수가 달라짐
const ReviewMain = () => {

  const [reviews, setReviews] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await getReviews();
      setReviews(res);
    };
    f();
  }, []);


  return (
    <div>
      {/* review 데이터 존재 여부에 따라 분기 */}
      {reviews.length ? (
        // 이 친구가 화면 너비에 따라서 카드의 갯수가 달라지는 친구임
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        >
          {/* 모든 review에 대해 Card 제작 */}
          {reviews.map((review) => (
            // 각각의 Card를 클릭하면, ShowReview로 이동
            <Card
              key={review.todo.id}
              onClick={() => {
                navigate(`/review/${review.id}`);
              }}
              style={{ width: "150px", height: "150px" }}
            >
              <CardBody style={{ padding: "0", justifyContent: "center" }}>
                <Image
                  objectFit="cover"
                  src={review.reviewPhoto}
                  width="150px"
                  height="150px"
                />
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <div>리뷰를 작성해보세요!</div>
      )}
    </div>
  );
};

export default ReviewMain;
