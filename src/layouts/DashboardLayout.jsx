import { useRef } from "react";
import DashboardHeader from "../pages/Dashboard/DashboardHeader";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faCartArrowDown,
  faEdit,
  faHome,
  faSignOut,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

const DashboardLayout = () => {
  const { admin, logOut } = useAuth() || {};
  const btn = useRef();
  const menu = useRef();
  const gridArea = useRef();
  let isOpen;

  const handleSideMenu = () => {
    menu.current.classList.toggle("hidden");
    menu.current.classList.toggle("absolute");
    gridArea.current.classList.toggle("grid-cols-12");
    isOpen = menu.current.classList.contains("absolute");
  };

  const handleMenu = (e) => {
    if (e.currentTarget !== e.target && isOpen === true) {
      menu.current.classList.toggle("hidden");
      menu.current.classList.toggle("absolute");
      isOpen = false;
    }
    e.stopPropagation();
  };

  const drawer = (
    <div
      className="flex flex-col text-white space-y-2 md:pb-6 pb-10"
      style={{ height: "91.5vh" }}
    >
      <div className="flex">
        {!admin ? (
          <div className="flex flex-col text-white space-y-2">
            <Link
              to={`/dashboard/myorders`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="uppercase px-4 flex items-center gap-x-1 justify-start">
                <FontAwesomeIcon icon={faCartArrowDown} />
                My Orders
              </button>
            </Link>
            <Link
              to={`/dashboard/payment`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="uppercase px-4 flex items-center gap-x-1 justify-start">
                <FontAwesomeIcon icon={faPaypal} />
                Payment
              </button>
            </Link>
            <Link
              to={`/dashboard/review`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="uppercase px-4 flex items-center gap-x-1 justify-start">
                <FontAwesomeIcon icon={faEdit} />
                Review
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col text-white md:space-y-3 space-y-2">
            <Link
              to={`/dashboard/make-admin`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="xl:uppercase lg:capitalize uppercase lg:px-3 px-5 flex items-center gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{" "}
                Make Admin
              </button>
            </Link>
            <Link
              to={`/dashboard/add-product`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="xl:uppercase lg:capitalize uppercase lg:px-3 px-5 flex items-center gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  />
                </svg>{" "}
                Add A Product
              </button>
            </Link>
            <Link
              to={`/dashboard/manage-products`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="xl:uppercase lg:capitalize uppercase lg:px-3 md:px-3 px-5 flex font-medium items-center gap-x-1 2xl:text-base text-sm font-qsand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Manage Products
              </button>
            </Link>
            <Link
              to={`/dashboard/manage-orders`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="xl:uppercase lg:capitalize uppercase lg:px-3 px-5 flex items-center font-medium gap-x-1 font-qsand 2xl:text-base text-sm">
                <FontAwesomeIcon icon={faTruckFast} />
                Manage Orders
              </button>
            </Link>
            <Link
              to={`/dashboard/manage-reviews`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="xl:uppercase lg:capitalize uppercase lg:px-3 px-5 flex items-center font-medium gap-x-1 font-qsand 2xl:text-base text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>{" "}
                Manage Reviews
              </button>
            </Link>
            <Link
              to={`/dashboard/add-blog`}
              className="bg-gray-500 rounded py-1 transition duration-200 hover:bg-blue-400"
            >
              <button className="xl:uppercase lg:capitalize uppercase lg:px-3 px-5 flex items-center font-medium gap-x-1 font-qsand 2xl:text-base text-sm">
                <FontAwesomeIcon icon={faEdit} /> Add A Blog
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end flex-auto items-start uppercase space-y-1">
        <Link
          to="/explore"
          className="transition duration-200 flex w-full items-center py-1 gap-x-1 hover:bg-gray-500 px-2 rounded"
        >
          <FontAwesomeIcon
            icon={faBicycle}
            className="h-5 w-5 p-1 bg-gray-100 text-gray-700 rounded-full"
          />{" "}
          Explore
        </Link>
        <Link
          to="/"
          className="transition duration-200 flex py-1 items-center hover:bg-gray-500 px-2 w-full rounded gap-x-1"
        >
          <FontAwesomeIcon
            icon={faHome}
            className="h-5 w-5 p-1 bg-gray-100 text-gray-700 rounded-full"
          />
          Home
        </Link>
        <button
          className="hover:bg-coral transition duration-200 px-2 w-full py-1 rounded flex gap-x-1 items-center group uppercase text-white"
          onClick={logOut}
        >
          <FontAwesomeIcon
            icon={faSignOut}
            className="h-5 w-5 p-1 bg-gray-100 text-gray-700 rounded-full"
          />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <DashboardHeader
        btn={btn}
        handleSideMenu={handleSideMenu}
      ></DashboardHeader>
      <div ref={gridArea} className="grid grid-cols-12 relative">
        <div
          id="side-menu"
          onClick={handleMenu}
          ref={menu}
          className="md:flex hidden justify-center lg:col-span-2 col-span-3 bg-gray-600 text-center md:px-0 px-12 pt-5"
          style={{ height: "92vh" }}
        >
          <div className="flex flex-col items-center">{drawer}</div>
        </div>
        <div className="lg:col-span-10 md:col-span-9 col-span-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
