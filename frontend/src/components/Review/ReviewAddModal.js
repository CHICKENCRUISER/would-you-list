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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import ReviewImgForm from "./ReviewImgForm";

//투두리스트 추가하기 모달 컴포넌트
//Home => MainTabs => Todo => AddModal
function ReviewAddModal({ setFile, inputImage, setInputImage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        {inputImage ? "사진 변경하기" : "사진 추가하기"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사진 추가하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReviewImgForm
              setFile={setFile}
              closeModal={onClose}
              inputImage={inputImage}
              setInputImage={setInputImage}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReviewAddModal;
