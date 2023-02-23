import React from "react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";


// ReviewCard의 CardFooter 부분 컴포넌트
// 아래 코드는 카드 하단 인데 사실 쓸모는 없지만 혹시 몰라서 남겨둠
const ReviewCardFooter = () => {
  return (
    <>
      <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
        Like
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
        Comment
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
        Share
      </Button>
    </>
  )
}

export default ReviewCardFooter;