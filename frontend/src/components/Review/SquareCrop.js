import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Button,
  Center,
  Input,
  Stack
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const SquareCrop = ({ setFile }) => {
  const cropperRef = useRef(null);
  // User-uploaded image
  const [inputImage, setInputImage] = useState(null);
  // Cropped image with user-selected area
  const [croppedImage, setCroppedImage] = useState(null);
  // Flag to keep track of whether the cropper is open or closed
  const [isCropperOpen, setIsCropperOpen] = useState(false);

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
    <Stack spacing={4}>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setInputImage(URL.createObjectURL(e.target.files[0]));
          setIsCropperOpen(true);
        }}
      />

      {isCropperOpen && (
        <>
          <Cropper
            src={inputImage}
            aspectRatio={1}
            crop={onCrop}
            ref={cropperRef}
          />
          <Center><Button onClick={cropBtnClicked}>Crop</Button></Center>
        </>
      )}
      {(!isCropperOpen && croppedImage) && (
        <>
          <img src={croppedImage} width="150px" height="150px" />
          <Button onClick={recropBtnClicked} value="recrop">Recrop</Button>
        </>
      )}
    </Stack>
  );
};

export default SquareCrop;
