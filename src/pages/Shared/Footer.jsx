import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Footer = () => {
  const emailRef = useRef(null);
  const handleSubscribe = async () => {
    const email = emailRef.current.value;
    if (!validateEmail(email)) {
      toast.error("Please provide a valid email address.");
    } else {
      try {
        const res = await axios.post(
          "https://bikemart-server-side.vercel.app/api/v1/newsletter",
          { email }
        );
        if (res.status === 200) {
          toast.success("Thanks for subscribing.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  return (
    <div className="bg-gray-800 py-2 p-6">
      <Toaster />
      <div className="grid md:grid-cols-3 sm:grid-cols-1 md:gap-x-2 md:gap-y-0 gap-y-3 pb-4 border-b">
        <div id="logo-and-address">
          <Link to="/">
            <h2 className="text-coral text-2xl pb-2">BikeMart</h2>
          </Link>
          <p className="text-indigo-100 font-medium">Address : </p>
          <p className="text-green-100">
            &emsp;<i>#302H, 2B, Dhaka, Bangladesh</i>
          </p>
          <p className="text-green-100">
            &emsp;<i>#101H, 5B, Chittagong, Bangladesh</i>
          </p>
        </div>
        <div id="useful-links" className="flex flex-col text-white">
          <h2 className="font-medium text-white text-2xl">Useful Links</h2>
          <Link to="/" className="underline text-blue-200 px-4">
            <FontAwesomeIcon icon={faLink} className="pr-1" />
            Home
          </Link>
          <Link to="/explore" className="underline text-blue-200 px-4">
            <FontAwesomeIcon icon={faLink} className="pr-1" />
            Explore
          </Link>
          <Link to="/dashboard" className="underline text-blue-200 px-4">
            <FontAwesomeIcon icon={faLink} className="pr-1" />
            Dashboard
          </Link>
        </div>
        <div className="subscribe-our-newsletetr space-y-2">
          <h2 className="md:text-2xl text-xl text-yellow font-medium">
            Subscribe our Newsletter
          </h2>
          <input
            type="email"
            ref={emailRef}
            className="bg-gray-100 rounded px-3 py-1 block md:w-5/6 w-full"
            placeholder="abc@gmail.com"
          />
          <button
            className="bg-green-custom rounded py-1 px-4 block text-white"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
      <p className="text-center text-gray-300">
        &copy; All rights reserved. Nasir {new Date(Date.now()).getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
