import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import toast, { Toaster } from "react-hot-toast";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));

  const fetchReviews = () => {
    fetch("https://bikemart-server-side.vercel.app/api/v1/reviews", {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${bikemartToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data.data));
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdate = (id, payload) => {
    const proceedToUpdate = window.confirm(
      `Are you sure about updating the review status to ${payload}?`
    );
    if (proceedToUpdate) {
      const url = `https://bikemart-server-side.vercel.app/api/v1/reviews/${id}`;
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${bikemartToken}`,
        },
        body: JSON.stringify({ reviewStatus: payload }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success("Successfully updated the status.");
            fetchReviews();
          }
        })
        .catch((err) => {
          toast.error("An error occured!");
          console.log(err);
        });
    }
  };
  const handleDelete = (id) => {
    const proceedToUpdate = window.confirm(
      "Are you sure about deleting the review?"
    );
    if (proceedToUpdate) {
      const url = `https://bikemart-server-side.vercel.app/api/v1/reviews/${id}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${bikemartToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success("Successfully deleted the review.");
            fetchReviews();
          }
        })
        .catch((err) => {
          toast.error("An error occured!");
          console.log(err);
        });
    }
  };
  return (
    <div className="text-center bg-gray-100 pt-5 pb-8">
      <Toaster />
      <div className="text-center my-5">
        <h2 className="inline-block sm:border-b-4 border-b-2 sm:px-4 px-2 border-coral rounded text-stromboli font-qsand md:font-bold font-medium md:text-2xl text-xl">
          What Client say About Us
        </h2>
      </div>
      {reviews?.length === 0 ? (
        <div className="flex justify-center items-center py-6">
          <div className="animate-bounce text-stromboli mr-5 font-qsand font-medium">
            loading...
          </div>
          <div className=" animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:p-8 md:pb-4 sm:p-10 sm:pb-3 pb-2 p-5 gap-3">
          {reviews?.map((review) => (
            <SingleReview
              reviewObj={review}
              key={review._id}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            ></SingleReview>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
