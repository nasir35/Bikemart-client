import { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import toast from "react-hot-toast";

const MyOrders = () => {
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
    fetch("https://bikemart-server-side.vercel.app/api/v1/orders/myorders", {
      headers: {
        authorization: `Bearer ${bikemartToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAction = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to cancel the order?"
    );
    if (proceed) {
      const url = `https://bikemart-server-side.vercel.app/api/v1/orders/myorder/${id}`;
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${bikemartToken}`,
        },
        body: JSON.stringify({ status: "Request Cancel" }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.status === "success") {
            toast.success("Order Cancellation request placed successfully!");
            fetchOrders();
          }
        });
    }
  };

  return (
    <div className="p-3 lg:px-12 md:px-6">
      <div id="title-div" className="pb-5">
        <h2 className="md:text-2xl text-xl pb-4 font-qsand md:font-bold font-medium text-stromboli text-center">
          <span className="text-coral md:inline-block block">
            Welcome Chief!
          </span>{" "}
          You have made {orders?.length} orders
        </h2>
        <p className="text-gray-700 md:text-base text-sm text-center">
          Your all order will be appear here! You can see your order information
          and take action on cancelling order.
        </p>
      </div>
      <div className="space-y-3">
        {orders?.map((order) => (
          <SingleOrder
            key={order._id}
            singleOrder={order}
            action={handleAction}
          ></SingleOrder>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
