import { useEffect, useState } from "react";
import Order from "./Order";
import toast, { Toaster } from "react-hot-toast";

const AllOrders = () => {
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
    fetch("https://bikemart-server-side.vercel.app/api/v1/orders", {
      headers: {
        authorization: `Bearer ${bikemartToken}`,
      },
    })
      .then((res) => res.json())
      .then((allOrders) => setOrders(allOrders.data));
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  //UPDATE order status
  const handleUpdate = (id, update) => {
    const proceedToUpdate = window.confirm(
      "Are you sure about updating the order status?"
    );
    if (proceedToUpdate) {
      const url = `https://bikemart-server-side.vercel.app/api/v1/orders/${id}`;
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${bikemartToken}`,
        },
        body: JSON.stringify(update),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Order updated successfully!");
          fetchOrders();
        })
        .catch((err) => {
          toast.error("An error occured!");
          console.log(err);
        });
    }
  };

  //DELETE an order
  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to cancel the order?"
    );
    if (proceed) {
      const url = `https://bikemart-server-side.vercel.app/api/v1/orders/${id}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${bikemartToken}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "success") {
            toast.success("Order cancelled Successfully!");
            fetchOrders();
          }
        })
        .catch((err) => {
          toast.error("An error occured!");
          console.log(err);
        });
    }
  };

  return (
    <div className="p-3 lg:px-12 md:px-6">
      <Toaster />
      <div id="title-div" className="pb-5">
        <h2 className="md:text-2xl text-xl pb-4 font-qsand md:font-bold font-medium text-stromboli text-center">
          <span className="text-coral md:inline-block block">Hello Sir!</span>{" "}
          We have {orders?.length} orders to manage
        </h2>
        <p className="text-gray-700 md:text-base text-sm text-center">
          All order will be appear here! You can see order information and take
          action on cancelling order or changing the order status.
        </p>
      </div>
      <div className="space-y-3">
        {orders?.map((order) => (
          <Order
            key={order._id}
            singleOrder={order}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          ></Order>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
