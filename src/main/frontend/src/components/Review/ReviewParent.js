import { useState } from "react";
import ShowReview from "./ShowReview";
import ReviewGrid from "./ReviewGrid";

const ReviewParent = () => {
  let [reviewToggle, setReviewToggle] = useState(true);
  const reviewToggleEdit = () => {
    setReviewToggle((prev) => !prev);
  };
  return (
    <>
      {reviewToggle ? (
        <ReviewGrid reviewToggleEdit={reviewToggleEdit} />
      ) : (
        <ShowReview />
      )}
    </>
  );
};

export default ReviewParent;
