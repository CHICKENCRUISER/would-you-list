import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";

import fetchCompletion from "../../models/getAnswerAi.js";
const ReviewAiModal = ({ todoName, category, setReview }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keywords, setKeywords] = useState("");
  const [aiReview, setAiReview] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReview = async () => {
    const content = `
    1.this is writing review about what user did
    2.i will give you title, category, and keywords
        title: ${todoName}
        category: ${category} 
        words:${keywords}
    3.based on the words, you should write colorful review
    4. only return review
    5.return korean review
    `;
    if (keywords === "") {
      alert("키워드를 입력해주세요!");
      return;
    }
    setLoading(true);
    const res = await fetchCompletion(content, 0.7);
    setLoading(false);
    setAiReview(res.trim());
    console.log(res.trim());
  };
  const applyReview = () => {
    setReview(aiReview);
    onClose();
  };

  return (
    <>
      <Button mb={4} variant="outline" onClick={onOpen}>
        키워드로 리뷰 자동 생성
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>리뷰 자동 생성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading mb={4} size="xs" textTransform="uppercase">
              키워드들을 입력해주세요!
            </Heading>
            <Textarea
              type="text"
              placeholder="예시) 아바타 재밌네 ㅋㅋ cg도 잘 만들고 ㅋㅋ 나 나중에 또 볼거임. 님들도 꼭 보셈 ㅋ"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              mb={4}
              required
            />
            <Textarea
              disabled={aiReview ? false : true}
              type="text"
              placeholder="Ai가 제목과 키워드들을 바탕으로 리뷰를 생성해줄게요!"
              value={aiReview}
              onChange={(e) => setAiReview(e.target.value)}
              mb={4}
              required
            />
            <Button onClick={generateReview}>
              {loading ? <Spinner /> : aiReview ? "다시 생성" : "리뷰 생성"}
            </Button>
            {aiReview ? (
              <Button onClick={applyReview}>리뷰 적용 하기</Button>
            ) : null}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewAiModal;
