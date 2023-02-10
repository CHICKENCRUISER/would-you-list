import reviewDummyData from "./reviewDummyData";
import { SimpleGrid, Card, CardBody, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//그리드 형식으로 리뷰를 보여주는 컴포넌트
//화면 너비에 따라서 카드의 갯수가 달라짐
const ReviewGrid = ({ reviewToggleEdit }) => {
  let navigate = useNavigate();

  return (
    // 이 친구가 화면 너비에 따라서 카드의 갯수가 달라지는 친구임
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
    >
      {/* reviewDummyData 를 진짜 데이터로 바꿔야함 */}
      {reviewDummyData.map((data) => {
        return (
          <Card
            // 카드 클릭하면 ShowReview로 이동
            // data.todoId는 입맛에 맛게 바꿔야함
            //아마 총 리뷰의 개수를 구한다음애 몇번째 리뷰인지를 나타내는 숫자를 보내야할듯
            onClick={() => {
              navigate("/review/" + data.todoId);
            }}
            style={{ width: "150px", height: "150px" }}
            key={data.todoId}
          >
            <CardBody style={{ padding: "0", justifyContent: "center" }}>
              <Image objectFit="cover" src={data.file} />
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
export default ReviewGrid;
