import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const Rating = ({
  start = 1,
  stop = 5,
  step = 1,
  initialRating = 0,
  readonly = false,
  quiet = false,
  direction = "ltr", // Left-to-right or right-to-left
  emptySymbol = "text-coral sm:text-lg text-base",
  fullSymbol = "text-coral sm:text-lg text-base",
  placeholderSymbol = "text-coral sm:text-lg text-base",
  onClick,
  onChange,
  onHover,
}) => {
  const [rating, setRating] = React.useState(initialRating);

  const handleClick = (newRating) => {
    if (!readonly) {
      setRating(newRating);
      if (onClick) onClick(newRating);
    }
  };

  const handleHover = (newRating) => {
    if (!readonly && onHover) onHover(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = start; i <= stop; i += step) {
      const symbolInfo = calculateSymbol(i);
      const key = `star-${i}`;
      stars.push(
        <span
          key={key}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={() => handleHover(null)}
          style={{ direction: direction === "rtl" ? "rtl" : "ltr" }}
        >
          <FontAwesomeIcon
            icon={
              symbolInfo.symbol === "emptySymbol"
                ? faStarEmpty
                : symbolInfo.symbol === "fullSymbol"
                ? faStar
                : faStarHalfAlt
            }
            className={symbolInfo.val}
          />
        </span>
      );
    }
    return stars;
  };

  const calculateSymbol = (value) => {
    if (value <= rating) {
      return { symbol: "fullSymbol", val: fullSymbol };
    } else if (value > rating && value <= rating + 1) {
      return rating % 1 !== 0
        ? { symbol: "halfSymbol", val: emptySymbol }
        : { symbol: "emptySymbol", val: emptySymbol };
    } else {
      return { symbol: "emptySymbol", val: emptySymbol };
    }
  };

  return <div className="rating">{renderStars()}</div>;
};

export default Rating;
