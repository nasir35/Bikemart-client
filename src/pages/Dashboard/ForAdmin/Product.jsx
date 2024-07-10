import React from "react";
import Rating from "../../../components/shared/Rating";
import toast, { Toaster } from "react-hot-toast";

const Product = ({ product }) => {
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
  const { img, title, price, rating, ratedBy, description, bikeType } = product;

  //DELETE an order
  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to Delete the product?"
    );
    if (proceed) {
      const url = `https://bikemart-server-side.vercel.app/api/v1/products/${id}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${bikemartToken}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "success") {
            toast.success("Product Deleted Successfully!");
          }
        });
    }
  };

  return (
    <div className="p-3 border rounded shadow-inset bg-white space-y-2">
      <Toaster />
      <img src={img} alt="" className="max-h-[180px]" />
      <h2 className="text-xl font-medium font-roboto text-coral">{title}</h2>
      <div className="flex justify-between sm:text-base text-sm">
        <p className="font-medium text-stromboli">
          <b>Price: {price}</b>
        </p>
        <p className="font-medium text-stromboli">
          <i className="fas fa-biking mr-1"></i> {bikeType}
        </p>
      </div>
      <p>
        {description
          .split(" ")
          .slice(0, 12)
          .toString()
          .replace(/,/g, " ")
          .concat("...")}
      </p>
      <div className="flex justify-between sm:text-base text-sm">
        <div>
          <Rating
            initialRating={rating}
            emptySymbol="far fa-star text-coral sm:text-lg text-base"
            fullSymbol="fas fa-star text-coral sm:text-lg text-base"
            readonly
          ></Rating>
          <span className="sm:text-lg text-base text-gray-700">
            {" "}
            ({ratedBy})
          </span>
        </div>
        <button
          className="px-5 py-1 bg-green-custom text-white rounded"
          onClick={() => handleDelete(product._id)}
        >
          <i className="far fa-paper-plane"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
