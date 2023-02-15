import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Box,
  Button,
  Center,
  IconButton,
  Image,
  Input,
  Stack
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";

const ReviewImgForm = ({ setFile }) => {

  const fileInput = useRef();
  const cropperRef = useRef(null);
  // User-uploaded image
  const [inputImage, setInputImage] = useState(null);
  // Cropped image with user-selected area
  const [croppedImage, setCroppedImage] = useState(null);
  // Flag to keep track of whether the cropper is open or closed
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // dataURL을 file 객체로 변환하는 함수. 서버로 전송 시 file 객체 형태여야 함
  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);   
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type:mime});
  }

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const resultURL = cropper.getCroppedCanvas().toDataURL()
    const resultFile = dataURLtoFile(resultURL, uuidv4());
    setCroppedImage(resultURL);
    setFile(resultFile);
  };
  const cropBtnClicked = () => {
    // save the croppedImage data URL however you need
    setIsCropperOpen(false);
  };
  const recropBtnClicked = () => {
    setIsCropperOpen(true);
  }

  return (
    <Box spacing={4}>
      <Input
        ref={fileInput}
        mb={4}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) { setInputImage(URL.createObjectURL(e.target.files[0])); }
          // setIsCropperOpen(true);
        }}
      />

      {(inputImage && !isCropperOpen && !croppedImage) ? (
        <>
          <Image src={inputImage} alt="selected image" width="150px" height="150px" mb={1} />
          <IconButton
            align="left"
            mr={1}
            colorScheme="red"
            icon={<SmallCloseIcon />}
            onClick={() => {
              setInputImage(null);
              fileInput.current.value = "";
            }}
          />
          <Button colorScheme="teal" onClick={() => { setIsCropperOpen(true); }}>Crop</Button>
        </>
      ) : null}

      {isCropperOpen && (
        <>
          <Cropper
            src={inputImage}
            aspectRatio={1}
            crop={onCrop}
            ref={cropperRef}
          />
          <Center mt={1}><Button onClick={cropBtnClicked}>Crop</Button></Center>
        </>
      )}
      {(!isCropperOpen && croppedImage) && (
        <>
          <Image src={croppedImage} width="150px" height="150px" mb={1} />
          <IconButton
            icon={<CheckIcon />}
            colorScheme="green"
            onClick={() => {
              setInputImage(croppedImage);
              setCroppedImage(null);
            }}
            mr={1}
          />
          <Button onClick={recropBtnClicked} value="recrop">Recrop</Button>
        </>
      )}
    </Box>
  );
};

export default ReviewImgForm;
