import reviewDummyData from "./reviewDummyData";
import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const ReviewGrid = ({ reviewToggleEdit }) => {
  let navigate = useNavigate();

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
    >
      {reviewDummyData.map((data) => {
        return (
          <Card
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
