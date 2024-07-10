import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Rating from "../../components/shared/Rating";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { user } = useAuth() || {};
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const bikemartToken = JSON.parse(localStorage.getItem("bikemartToken"));
  const location = useLocation();

  useEffect(() => {
    fetch(`https://bikemart-server-side.vercel.app/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedProduct(data?.data));
  }, [id]);
  const { img, title, price, rating, ratedBy, bikeType, description } =
    selectedProduct;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const order = {
      buyer: {
        userId: user._id,
        email: user.email,
        name: user.name,
        phone: data.phone,
        shippingAddress: data.address,
      },
      products: [
        {
          productId: selectedProduct._id,
          name: title,
          price: price,
          img: img,
          type: bikeType,
        },
      ],
      buyerMessage: data.message,
    };
    console.log(order);
    fetch("https://bikemart-server-side.vercel.app/api/v1/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${bikemartToken}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result?.status === "success") {
          toast.success(result?.message);
          reset();
          navigate("/placed-order");
        }
      });
  };
  return (
    <div>
      <Toaster />
      <div className="md:p-10 sm:p-6 p-3">
        {selectedProduct?.length == 0 ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-bounce text-stromboli mr-5 font-qsand font-medium">
              loading...
            </div>
            <div className=" animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
          </div>
        ) : (
          <div id="wrapper-div" className="grid grid-cols-5 gap-5">
            <div
              id="product-details"
              className={`${
                user?.email ? "md:col-span-3" : "col-span-5"
              } col-span-5 space-y-3`}
            >
              <img src={img} alt="product image" className="mx-auto" />
              <h2 className="text-xl font-medium font-roboto text-stromboli">
                {title}
              </h2>
              <div className="flex md:flex-row flex-col justify-between items-center">
                <div>
                  <p className="font-medium font-roboto text-gray-800">
                    Price: {price}
                  </p>
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
                </div>
                <p className="text-xl font-medium text-gray-800 font-qsand">
                  <i className="fas fa-biking text-stromboli"></i> Bike Type:{" "}
                  {bikeType}
                </p>
              </div>
              <p className="text-gray-500">{description}</p>
            </div>

            {user?.email && (
              <div id="order-form" className="md:col-span-2 col-span-5">
                <div className="text-center">
                  <h2 className="inline-block px-4 border-b-4 rounded mb-3 border-green-custom md:text-2xl text-xl text-center text-stromboli font-qsand font-medium mt-5">
                    Get Your Bike
                  </h2>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:p-5 pb-5 p-0 shadow-lg rounded mx-auto"
                >
                  <div className="w-full grid grid-cols-12 mb-3 md:px-4 px-2">
                    <label
                      htmlFor="productName"
                      className="col-span-3 font-medium text-gray-600"
                    >
                      Product
                    </label>
                    <input
                      {...register("productName")}
                      id="productName"
                      className="border col-span-9 px-3 py-1 bg-gray-50 mb-1 rounded"
                      value={title}
                      readOnly
                    />
                  </div>
                  <div className="w-full grid grid-cols-12 mb-3 md:px-4 px-2">
                    <label
                      htmlFor="customerName"
                      className="col-span-3 font-medium text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      {...register("customerName")}
                      id="customerName"
                      className="border col-span-9 px-3 py-1 bg-gray-50 mb-1 rounded"
                      placeholder="Name"
                      defaultValue={user.name}
                      readOnly
                      required
                    />
                  </div>
                  <div className="w-full grid grid-cols-12 mb-3 md:px-4 px-2">
                    <label
                      htmlFor="email"
                      className="col-span-3 font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className="border col-span-9 px-3 py-1 bg-gray-50 mb-1 rounded"
                      placeholder="Email"
                      defaultValue={user.email}
                      readOnly
                      required
                    />
                  </div>
                  <div className="w-full grid grid-cols-12 mb-3 md:px-4 px-2">
                    <label
                      htmlFor="phone"
                      className="col-span-3 font-medium text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      id="phone"
                      className="border col-span-9 px-3 py-1 bg-gray-50 mb-1 rounded"
                      placeholder="+8801777777777"
                      required
                    />
                  </div>
                  <div className="w-full grid grid-cols-12 mb-3 md:px-4 px-2">
                    <label
                      htmlFor="address"
                      className="col-span-3 font-medium text-gray-600"
                    >
                      Address
                    </label>
                    <input
                      {...register("address")}
                      id="address"
                      className="border col-span-9 px-3 py-1 bg-gray-50 mb-1 rounded"
                      placeholder="#H-32B, Neywork, USA"
                      required
                    />
                  </div>
                  <div className="w-full grid grid-cols-12 mb-3 md:px-4 px-2">
                    <label
                      htmlFor="message"
                      className="col-span-3 font-medium text-gray-600"
                    >
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows="4"
                      className="border col-span-9 px-3 py-1 bg-gray-50 mb-1 rounded"
                      placeholder="leave your message here..."
                    />
                  </div>
                  <input
                    type="submit"
                    className="px-8 md:py-2 py-1 bg-green-custom cursor-pointer hover:bg-white border-2 border-green-custom hover:border-green-custom text-lg font-medium font-mono text-white hover:text-green-custom transition rounded mt-5 block mx-auto"
                    value="Place Order"
                  />
                </form>
              </div>
            )}
            {!user?.email && (
              <Link
                to={"/login"}
                state={{ from: location }}
                className="col-span-5 mt-8 px-8 py-2 bg-green-custom text-white font-medium rounded max-w-fit mx-auto"
              >
                Login to purchase
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
