import React from "react";
import toast, { Toaster } from "react-hot-toast";

const SingleOrder = ({ singleOrder, action }) => {
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
  const { name } = singleOrder.buyer;
  const { name: productName, price, img } = singleOrder.products[0];

  const allowedTransitions = {
    "Out for Delivery": "Delivered",
    Processing: "Request Cancel",
    "Request Cancel": "Processing",
  };
  let nextAction = allowedTransitions[singleOrder.status];
  return (
    <div>
      <Toaster />
      <div
        id="order-items-container"
        className="grid grid-cols-12 bg-gray-100 py-1 items-center shadow rounded"
      >
        <div
          id="order-img-title-container"
          className="lg:col-span-6 col-span-8 sm:pl-3 pt-1 sm:flex hidden sm:space-x-2 space-x-1 items-center"
        >
          <img src={img} alt="" className="h-16 rounded object-cover" />
          <div className="flex flex-col flex-grow lg:space-y-2 space-y-1">
            <h2 className="xl:text-xl text-lg font-qsand font-semibold">
              {productName}
            </h2>
            <div className="flex justify-between font-medium">
              <p>{price}</p>
            </div>
          </div>
        </div>
        <div
          id="order-status-container"
          className="lg:col-span-3 px-2 col-span-12 flex lg:flex-col justify-between lg:border-0 border-b-2 border-gray-300"
        >
          <p
            className={`font-qsand ${
              singleOrder.status?.includes("Processing")
                ? "text-coral"
                : "text-green-custom"
            }`}
          >
            {singleOrder.status}
          </p>
          <p className="font-roboto sm:block hidden">Placed by: {name}</p>
        </div>

        {/* this section re-written for mobile devices */}
        <h2 className="col-span-12 px-2 font-qsand font-medium sm:hidden block justify-start">
          {productName}
        </h2>
        <div className="col-span-8 sm:hidden px-1 flex items-center">
          <img
            src={img}
            alt=""
            className="h-16 rounded object-cover sm:hidden inline-block"
          />
          <div className="inline-block pl-2">
            <p className="text-gray-800 font-medium">{price}</p>
            <p className="font-qsand text-coral">
              qty : {singleOrder.products.length}
            </p>
          </div>
        </div>
        {/* end of duplicate codes */}

        <div
          id="action-div"
          className="lg:col-span-3 col-span-4 flex xl:flex-row justify-end gap-x-2 flex-col items-end md:pr-5 pr-2 py-1 space-y-2 text-right"
        >
          <button
            className={`sm:px-3 px-2 sm:text-base text-sm ${
              singleOrder.status === "Request Cancel"
                ? "bg-gray-400"
                : "bg-red-400"
            }  xl:w-auto w-3/4 text-gray-800 rounded font-medium py-1`}
            onClick={() => action(singleOrder._id)}
            disabled={singleOrder.status === "Request Cancel"}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
