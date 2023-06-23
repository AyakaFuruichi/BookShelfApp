import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../utils/config";

const InputBookRating = ({ rating, onChange }) => {
  return (
    <>
      <div className="sub-title">Book Review</div>
      <div className="form__stars">
        {
          <Rating
            emptySymbol={
              <FontAwesomeIcon icon={faStar} color={COLORS.star.empty} />
            }
            fullSymbol={
              <FontAwesomeIcon icon={faStar} color={COLORS.star.full} />
            }
            value={rating}
            fractions={2} 
            initialRating={rating} 
            onChange={onChange}
          />
        }
      </div>
    </>
  );
};

export default InputBookRating;
