import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";

const VerificationSuccess = () => {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(
          `https://bikemart-server-side.vercel.app/api/v1/users/signup/verify/${token}`
        );
        if (response.status === 200) {
          setVerified(true);
        }

        toast.success("Your account verified successfully.");

        setEmail(response.data?.data?.email);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
        setVerified(false);
        setEmail(error.response.data.email);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccount();
  }, []);

  return (
    <>
      <Toaster />
      {isLoading && <LoadingSpinner />}
      {verified ? (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Verification Successful
            </h2>
            <p className="mb-6">
              Your account has been successfully verified. You can now log in
              and start using our services.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 transition duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[70vh] bg-gray-100">
          <div className="bg-red-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
              Verification Failed
            </h2>
            <p className="text-center text-red-600 mb-6">Token Expired</p>
            <div className="text-center">
              <Link
                to={`/register/confirmation/${email}`}
                className="inline-block bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-600"
              >
                Resend Verification Link
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationSuccess;
