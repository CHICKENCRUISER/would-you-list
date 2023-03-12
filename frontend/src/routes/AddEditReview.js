import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

import ReviewAddModal from "../components/Review/ReviewAddModal";

import { createReview, updateReview } from "../models/reviews";

// 리뷰 추가와 리뷰 수정을 처리하는 컴포넌트
const AddEditReview = () => {
  // 기본 이미지 url
  const defaultImg =
    "https://wouldyoulistfile.s3.ap-northeast-2.amazonaws.com/images/97c08004-fb34-4fb1-ad4c-4100524d3957defaultPhoto.jpeg";

  // 상위 컴포넌트에서 useNavigate로 넘겨받은 데이터
  // -> 리뷰 추가이면 빈 객체(단, todo데이터는 들어있음), 리뷰 수정이면 수정할 리뷰 데이터
  const location = useLocation();
  const {
    state: { data },
  } = location;

  // 리뷰 생성인지 수정인지 구분하는 변수
  // -> 리뷰 추가이면 false, 리뷰 수정이면 true
  let isEdit = data.title ? true : false;

  // const [imgSelect, setImgSelect] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [review, setReview] = useState(data.review);
  const [place, setPlace] = useState(data.place);
  const [expression, setExpression] = useState(data.expression);
  const [file, setFile] = useState(null);
  // 데이터 속 이미지가 defaultImg와 같으면 inputImage를 null, 아니면 이미지 경로를 넣어줌
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

  let navigate = useNavigate();

  // done버튼을 누르면 데이터베이스로 데이터를 보냄
  const reviewFormSubmitted = async (e) => {
    // 날짜 포맷을 바꿔줌
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

    // 리뷰 추가이면 createReview, 리뷰 수정이면 updateReview
    if (!isEdit) {
      await createReview(newReview);
      navigate("/review");
    } else {
      let state = data.photo !== inputImage;
      newReview.append("isDeleted", state);
      await updateReview(data.todo.id, newReview);
      navigate(`/review/${data.id}`);
    }
  };

  return (
    <Box m={4}>
      <Card>
        {/* Header */}
        <CardHeader>
          <Heading size="md" textAlign={"center"}>
            "{data.todo.todoName}"에 대한 멋진 리뷰를 남겨 주세요!
            {console.log(data)}
          </Heading>
        </CardHeader>

        {/* Body */}
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {/* Todo 정보 */}
            <Box>
              <Heading size="xs" textTransform="uppercase">
                TODO
              </Heading>
              <Text pt="2" fontSize="sm">
                {data.todo.todoName}
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

            {/* Review 양식 */}
            <Box>
              <Heading size="xs" textTransform="uppercase">
                REVIEW
              </Heading>
              <form onSubmit={reviewFormSubmitted}>
                <FormControl mt={4}>
                  {/* 제목/장소/내용 */}
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

                  {/* 이미지 */}
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
                      </Stack>
                    </CardBody>
                  </Card>

                  {/* 평가 */}
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

                  {/* 버튼 */}
                  <Stack spacing={2}>
                    <Input type="submit" value="Done!" />
                    <Input
                      type="button"
                      value="Cancle"
                      onClick={() => {
                        if (!isEdit) {
                          navigate("/todo");
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
