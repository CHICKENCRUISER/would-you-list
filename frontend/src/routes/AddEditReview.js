import React, { useState } from "react";
import { createTodo } from "../models/todos";
import { updateReview } from "../models/reviews";
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
  Textarea,
  Badge,
  Image,
} from "@chakra-ui/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReviewAddModal from "../components/Review/ReviewAddModal";

const AddEditReview = () => {
  const defaultImg =
    "https://wouldyoulistfile.s3.ap-northeast-2.amazonaws.com/images/97c08004-fb34-4fb1-ad4c-4100524d3957defaultPhoto.jpeg";
  const location = useLocation();
  const {
    state: { data },
  } = location;
  console.log(data);
  //리뷰 추가이면 false, 리뷰 수정이면 true
  let isEdit = data.title ? true : false;

  let { id } = useParams();
  const [title, setTitle] = useState(data.title);
  const [review, setReview] = useState(data.review);
  const [place, setPlace] = useState(data.place);
  const [expression, setExpression] = useState(data.expression);
  const [file, setFile] = useState(null);
  const [imgSelect, setImgSelect] = useState(false);
  const [inputImage, setInputImage] = useState(
    data.photo === defaultImg ? null : data.photo
  );

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

  //   let todosDone = useSelector((state) => state.todosDone);
  //   const todo = todosDone.find((todo) => todo.id === Number(id));

  // const imgInputChanged = (e) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const uploadFile = e.target.files[0];
  //     console.log(uploadFile);
  //     setFile(uploadFile);
  //   }
  // }

  let navigate = useNavigate();

  //   const imgCheckChanged = () => {
  //     setImgSelect((prev) => !prev);
  //   };
  const reviewFormSubmitted = async (e) => {
    const now = new Date();
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = now.toLocaleString("ko-KR", options);

    e.preventDefault();
    const newReview = new FormData();
    newReview.append("title", title);
    newReview.append("review", review);
    newReview.append("place", place);
    newReview.append("doneDate", formattedDate);
    newReview.append("expression", expression);
    newReview.append("todoId", data.todo.id);
    newReview.append("file", file);
    if (!isEdit) {
      await createReview(newReview);
      navigate("/review");
    } else {
      let state = data.photo !== inputImage;
      console.log(state);
      newReview.append("isDeleted", state);
      await updateReview(data.todo.id, newReview);
      navigate(`/review/${data.id}`);
    }
  };

  return (
    <Box m={4}>
      <Card>
        <CardHeader>
          <Heading size="md" textAlign={"center"}>
            "{data.todo.name}"에 대한 멋진 리뷰를 남겨 주세요!
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                TODO
              </Heading>
              <Text pt="2" fontSize="sm">
                {data.todo.name}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                CATEGORY
              </Heading>
              <Badge
                colorScheme={tagColors[data.todo.category]}
                textAlign="middle"
              >
                {data.todo.category}
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

                  <Card>
                    <CardBody>
                      <Stack>
                        {/* 사진을 추가하는 모달창 */}
                        <ReviewAddModal
                          setFile={setFile}
                          inputImage={inputImage}
                          setInputImage={setInputImage}
                        />
                        {/* 추가한 사진이 있다면 사진을 보여주기 */}
                        {inputImage ? (
                          <Image
                            src={inputImage}
                            alt="selected image"
                            width="150px"
                            height="150px"
                            mb={1}
                          />
                        ) : null}
                        {/* <Checkbox
                          defaultChecked={false}
                          onChange={imgCheckChanged}
                        >
                          사진 추가하기
                        </Checkbox>
                        {imgSelect ? <ReviewImgForm setFile={setFile} /> : null} */}
                      </Stack>
                    </CardBody>
                  </Card>

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
                    <Input
                      type="button"
                      value="Cancle"
                      onClick={() => {
                        if (!isEdit) {
                          navigate("/review");
                        } else {
                          navigate(`/review/${data.id}`);
                        }
                      }}
                    />
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

export default AddEditReview;
