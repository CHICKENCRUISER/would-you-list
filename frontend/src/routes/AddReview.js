import React, { useState } from "react";
import { createTodo } from "../models/todos";
import { createReview } from "../models/reviews";
import {
  FormControl,
  Input,
  Box,
  RadioGroup,
  Radio,
  Stack,
  Card,
  CardBody,
  Text,
  CardHeader,
  Heading,
  StackDivider,
  Checkbox,
  Textarea,
  Badge
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SquareCrop from "../components/Review/SquareCrop";

const AddReview = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [place, setPlace] = useState("");
  const [expression, setExpression] = useState("happy");
  const [file, setFile] = useState(null);
  const [imgSelect, setImgSelect] = useState(false);

  const tagColors = {
    FOOD: "gray",
    MOVIE: "red",
    DRAMA: "orange",
    ACTIVITY: "yellow",
    BOOK: "green",
    MUSIC: "teal",
    BAKING: "blue",
    SPORTS: "cyan",
  };

  let todosDone = useSelector((state) => state.todosDone);
  const todo = todosDone.find((todo) => todo.id === Number(id));

  // const imgInputChanged = (e) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const uploadFile = e.target.files[0];
  //     console.log(uploadFile);
  //     setFile(uploadFile);
  //   }
  // }

  let navigate = useNavigate();

  const imgCheckChanged = () => { setImgSelect(prev => !prev); }
  const reviewFormSubmitted = async (e) => {
    e.preventDefault();
    const newReview = new FormData();
    newReview.append("title", title);
    newReview.append("review", review);
    newReview.append("place", place);
    newReview.append("doneDate", Date.now());
    newReview.append("expression", expression);
    newReview.append("todoId", todo.id);
    newReview.append("file", file);
    
    await createReview(newReview);
    navigate("/review");
  };

  return (
    <Box m={4}>
      <Card>
        <CardHeader>
          <Heading size="md" textAlign={"center"}>
            "{todo.name}"에 대한 멋진 리뷰를 남겨 주세요!
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                review
              </Heading>
              <Text pt="2" fontSize="sm">
                {todo.review}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                CATEGORY
              </Heading>
              <Badge
                colorScheme={tagColors[todo.category]}
                textAlign="middle"
              >
                {todo.category}
              </Badge>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                REVIEW
              </Heading>
              <form onSubmit={reviewFormSubmitted}>
                <FormControl mt={4}>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    mb={4}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    mb={4}
                    required
                  />
                  <Textarea
                    type="text"
                    placeholder="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    mb={4}
                    required
                  />
                  <Card><CardBody><Stack>
                    <Checkbox onChange={imgCheckChanged}>이미지 추가하기</Checkbox>
                    {imgSelect ? <SquareCrop setFile={setFile} /> : null}
                  </Stack></CardBody></Card>
                  <RadioGroup
                    defaultValue="2"
                    m={4}
                    onChange={setExpression}
                    value={expression}
                  >
                    <Stack spacing={5} direction="row">
                      <Radio colorScheme="green" value="happy">
                        😃
                      </Radio>
                      <Radio colorScheme="red" value="sad">
                        😭
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Stack spacing={2}>
                    <Input type="submit" value="Done!" />
                    <Input type="button" value="Cancle" onClick={() => navigate("/")} />
                  </Stack>
                  
                </FormControl>
              </form>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AddReview;
