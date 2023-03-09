import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Image,
} from "@chakra-ui/react";

import ReviewCardHeader from "./ReviewCardHeader";
import ReviewCardFooter from "./ReviewCardFooter";



//리뷰 카드 컴포넌트
// prop의 data는 review 객체
const ReviewCard = ({ data }) => {

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card mb={4} style={{ maxWidth: "600px" }}>

        {/* Header */}
        <CardHeader>
          <ReviewCardHeader data={data} />
        </CardHeader>

        {/* Body */}
        <CardBody>
          <Text>{data.reviewContent}</Text>
        </CardBody>
        <Image
          objectFit="cover"
          src={data.reviewPhoto}
          alt="Chakra UI"
          width="600px"
          height="600px"
        />

        {/* Footer */}
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <ReviewCardFooter />
        </CardFooter>

      </Card>
    </div>
  );
};

export default ReviewCard;
