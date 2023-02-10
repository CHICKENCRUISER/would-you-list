import reviewDummyData from "./reviewDummyData";
import ReviewCard from "./ReviewCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const ShowReview = () => {
  let { id } = useParams();

  const useScrollTo = (xpos, ypos) => {
    useEffect(() => {
      window.scrollTo(xpos, ypos);
    }, []);
  };
  useScrollTo(0, 70 + 808 * (id - 1));

  return (
    <div>
      {reviewDummyData.map((data) => {
        return <ReviewCard data={data} key={data.todoId} />;
      })}
    </div>
  );
};

export default ShowReview;
