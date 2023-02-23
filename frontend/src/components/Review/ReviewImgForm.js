import React, { useState, useRef } from "react";
import "cropperjs/dist/cropper.css";
import {
  Box,
  Button,
  Center,
  IconButton,
  Image,
  Input,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import Cropper from "react-cropper";
import { v4 as uuidv4 } from "uuid";


// 이미지 업로드 및 크롭 컴포넌트
const ReviewImgForm = ({ setFile, closeModal, inputImage, setInputImage }) => {

  const fileInput = useRef(null);
  const cropperRef = useRef(null);
  // User-uploaded image
  // Cropped image with user-selected area
  const [croppedImage, setCroppedImage] = useState(null);
  // Flag to keep track of whether the cropper is open or closed
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // dataURL을 file 객체로 변환하는 함수. 서버로 전송 시 file 객체 형태여야 함
  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // 크롭 버튼 클릭 시 실행되는 크롭 함수
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const resultURL = cropper.getCroppedCanvas().toDataURL();
    const resultFile = dataURLtoFile(resultURL, uuidv4());
    setCroppedImage(resultURL);
    setFile(resultFile);
  };

  //크롭 함수 실행 중인지 확인하는 함수들
  const cropBtnClicked = () => {
    // save the croppedImage data URL however you need
    setIsCropperOpen(false);
  };
  const recropBtnClicked = () => {
    setIsCropperOpen(true);
  };

  return (
    <Box spacing={4} mt={2}>

      {/* 이미지를 파일에서 선택하는 버튼 */}
      <Input
        ref={fileInput}
        mb={4}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setInputImage(URL.createObjectURL(e.target.files[0]));
            // setInputImage2(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
          }
          // setIsCropperOpen(true);
        }}
      />

      {/* 인풋이미지가 있고, 크롭이 열려있지 않고, 크롭된 이미지가 없다면 */}
      {inputImage && !isCropperOpen && !croppedImage ? (
        <>
          <Image
            src={inputImage}
            alt="selected image"
            width="150px"
            height="150px"
            mb={1}
          />

          {/* 이미지 크롭 버튼 */}
          {/* 만약 리뷰 수정인데 이미지가 있다면 크롭 버튼이 보이지 않음 */}
          {fileInput.current ? (
            <Button
              colorScheme="teal"
              mr={1}
              onClick={() => {
                setIsCropperOpen(true);
              }}
            >
              사진 자르기
            </Button>
          ) : null}

          {/* 이미지 업로드 완료 버튼 */}
          <IconButton icon={<CheckIcon />} colorScheme="green" onClick={closeModal} />

          {/* 이미지 삭제 버튼 */}
          <IconButton
            align="left"
            mr={1}
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={() => {
              setInputImage(null);
              fileInput.current.value = "";
            }}
          />
        </>
      ) : null}

      {/* 크롭중이라면 */}
      {isCropperOpen && (
        <>
          <Cropper
            src={inputImage}
            aspectRatio={1}
            crop={onCrop}
            ref={cropperRef}
          />

          <Center mt={1}>
            <Button onClick={cropBtnClicked}>Crop</Button>
          </Center>

        </>
      )}

      {!isCropperOpen && croppedImage && (
        <>
          <Image src={croppedImage} width="150px" height="150px" mb={1} />

          <Button onClick={recropBtnClicked} value="recrop" mr={1}>
            다시 자르기
          </Button>

          <IconButton
            icon={<CheckIcon />}
            colorScheme="green"
            onClick={() => {
              closeModal();
              setInputImage(croppedImage);
              setCroppedImage(null);
            }}
          />

          <IconButton
            align="left"
            mr={1}
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={() => {
              setCroppedImage(null);
              setInputImage(null);
              fileInput.current.value = "";
            }}
          />

        </>
      )}
    </Box>
  );
};

export default ReviewImgForm;
