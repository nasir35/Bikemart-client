import {
  faComment,
  faUserCircle,
  faCalendarAlt,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SingleBlog = ({ blog }) => {
  const { title, img, post } = blog;
  return (
    <div className="border-2 rounded">
      <div className="col-span-2 relative">
        <p className="absolute bottom-0 right-0 bg-green-800 font-medium rounded-tl text-white px-2">
          <FontAwesomeIcon icon={faCalendarAlt} /> 25 october, 2021
        </p>
        <img src={img} className="rounded-t" alt="" />
      </div>
      <div className="col-span-4 mx-4 py-2 space-y-1">
        <h2 className="md:text-xl text-lg font-roboto font-medium text-stromboli">
          {title}
        </h2>
        <div className="flex justify-between md:text-base text-sm">
          <p className="text-gray-700 font-medium">
            <FontAwesomeIcon icon={faUserCircle} className="text-coral" />{" "}
            Salman Khan
          </p>
          <p className="text-gray-700 font-medium">
            <FontAwesomeIcon icon={faComment} className="text-coral" /> (9)
            comments
          </p>
        </div>
        <p className="font-roboto md:text-base text-sm pt-2">
          {post.slice(0, 110).concat("...")}{" "}
          <button className="font-medium">See more</button>
        </p>
      </div>
    </div>
  );
};

export default SingleBlog;
