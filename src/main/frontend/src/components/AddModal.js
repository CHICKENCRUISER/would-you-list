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
import NewTodo from "./NewTodo";

//투두리스트 추가하기 모달 컴포넌트
//Home => MainTabs => Todo => AddModal
function AddModal({ refreshTodos }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>투두 리스트 추가하기</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>투두리스트 추가하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewTodo closeModal={onClose} refreshTodos={refreshTodos} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModal;
