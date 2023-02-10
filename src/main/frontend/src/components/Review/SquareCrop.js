import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@chakra-ui/react";

const SquareCrop = () => {
  const cropperRef = useRef(null);
  // User-uploaded image
  const [inputImage, setInputImage] = useState(null);
  // Cropped image with user-selected area
  const [croppedImage, setCroppedImage] = useState(null);
  // Flag to keep track of whether the cropper is open or closed
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  const handleFinishClick = () => {
    // save the croppedImage data URL however you need
    setIsCropperOpen(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setInputImage(URL.createObjectURL(e.target.files[0]));
          setIsCropperOpen(true);
        }}
      />
      <Button onClick={handleFinishClick}>Finish</Button>

      {isCropperOpen && (
        <Cropper
          src={inputImage}
          aspectRatio={1}
          crop={onCrop}
          ref={cropperRef}
        />
      )}
      {!isCropperOpen && <img src={croppedImage} />}
    </div>
  );
};

export default SquareCrop;
