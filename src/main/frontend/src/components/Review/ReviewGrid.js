// import reviewDummyData from "./reviewDummyData";
import React, { useState, useEffect } from "react";
import { getReviews } from "../../models/reviews";
import { SimpleGrid, Card, CardBody, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//그리드 형식으로 리뷰를 보여주는 컴포넌트
//화면 너비에 따라서 카드의 갯수가 달라짐
const ReviewGrid = ({ reviewToggleEdit }) => {

  const [reviews, setReviews] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await getReviews();
      setReviews(res);
    }
    f();
  }, []);

  return (
    // 이 친구가 화면 너비에 따라서 카드의 갯수가 달라지는 친구임
    <div>
      {reviews.length ? (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        >
      {/* reviewDummyData 를 진짜 데이터로 바꿔야함 */}
          {reviews.map((review) => (
            <Card
            // 카드 클릭하면 ShowReview로 이동
            // data.todoId는 입맛에 맛게 바꿔야함
            //아마 총 리뷰의 개수를 구한다음애 몇번째 리뷰인지를 나타내는 숫자를 보내야할듯
              key={review.todo.id}
              onClick={() => { navigate("/review/" + review.todo.id); }}
              style={{ width: "150px", height: "150px" }}
            >
              <CardBody style={{ padding: "0", justifyContent: "center" }}>
                <Image objectFit="cover" src={review.photo} width="150px" height="150px" />
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

export default ReviewGrid;
