import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import NotFound from "../pages/Shared/NotFound";
import Blog from "../pages/Home/Blog-section/Blog";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Pay from "../pages/Dashboard/ForUser/Pay";
import MakeAdmin from "../pages/Dashboard/ForAdmin/MakeAdmin";
import MyOrders from "../pages/Dashboard/ForUser/MyOrders";
import GiveReview from "../pages/Dashboard/ForUser/GiveReview";
import AddProduct from "../pages/Dashboard/ForAdmin/AddProduct";
import ManageProducts from "../pages/Dashboard/ForAdmin/ManageProducts";
import AllOrders from "../pages/Dashboard/ForAdmin/AllOrders";
import AllReviews from "../pages/Dashboard/ForAdmin/AllReviews";
import AddBlog from "../pages/Home/Blog-section/AddBlog";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "../pages/Login/AdminRoute";
import PrivateRoute from "../pages/Login/PrivateRoute";
import ProductDetails from "../pages/PlaceOrder/ProductDetails";
import ConfirmAccount from "../pages/Login/ConfirmAccount";
import VerificationSuccess from "../pages/Login/VerificationSuccess";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import BlogDetails from "../pages/Blog/BlogDetails";
import PublicRoute from "../pages/Login/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/placed-order",
        element: <PlaceOrder />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/register/confirmation/:email",
        element: <ConfirmAccount />,
      },
      {
        path: "/verify/:token",
        element: <VerificationSuccess />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Pay />
          </PrivateRoute>
        ),
      },
      {
        path: "make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "myorders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "review",
        element: (
          <PrivateRoute>
            <GiveReview />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <AdminRoute>
            <AllReviews />
          </AdminRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
