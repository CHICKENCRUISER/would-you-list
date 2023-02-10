// import reviewDummyData from "./reviewDummyData";
import React, { useState, useEffect } from "react";
import { getReviews } from "../../models/reviews";
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
    <div>
      {reviews.length ? (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        >
          {reviews.map((review) => (
            <Card
              key={review.todo.id}
              onClick={() => { navigate("/review/" + review.todo.id); }}
              style={{ width: "150px", height: "150px" }}
            >
              <CardBody style={{ padding: "0", justifyContent: "center" }}>
                <Image objectFit="cover" src={review.file} />
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
