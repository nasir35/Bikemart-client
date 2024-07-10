import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Timer from "../../components/shared/Timer";

const ConfirmAccount = () => {
  const { email } = useParams();
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [resendMessage, setResendMessage] = useState("");
  const [timeRemainingInSec, setTimeRemainingInSec] = useState(0);

  useEffect(() => {
    const fetchTokenExpiry = async () => {
      try {
        const response = await axios.get(
          `https://bikemart-server-side.vercel.app/api/v1/users/signup/token-expiry/${email}`
        );
        setTokenCount(response.data.confirmationTokenRequestCount);
        const expiryTime = response.data.expiryTime;
        const now = new Date(Date.now());
        const expiryDate = new Date(expiryTime);
        const differenceInMilliseconds = expiryDate.getTime() - now.getTime();

        if (differenceInMilliseconds <= 0) {
          setTimeRemainingInSec(0);
        } else {
          setTimeRemainingInSec(differenceInMilliseconds / 1000);
        }
        setCanResend(differenceInMilliseconds <= 0);
        setIsLoading(false);
      } catch (error) {
        setStatusMessage(error.response?.data?.message || "An error occurred");
        setIsLoading(false);
      }
    };

    fetchTokenExpiry();
  }, [email]);

  useEffect(() => {
    if (timeRemainingInSec > 0) {
      const timer = setInterval(() => {
        setTimeRemainingInSec((prev) => prev - 1);
        if (timeRemainingInSec <= 1) {
          setCanResend(true);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemainingInSec]);

  const handleResend = async () => {
    try {
      setIsSending(true);
      setResendMessage("");
      const response = await axios.get(
        `https://bikemart-server-side.vercel.app/api/v1/users/signup/resend-verification/${email}`
      );

      setResendMessage(response.data.message);
      if (tokenCount < 3) setTimeRemainingInSec(600);
      else setTimeRemainingInSec(24 * 60 * 60);
      setCanResend(false);
    } catch (error) {
      setResendMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            Account Verification
          </h2>
          <p className="text-center mb-6">
            A verification link has been sent to your email address. Please
            check your inbox and click the link to activate your account. If you
            did not receive the email, you can request a new verification link.
          </p>
          {statusMessage && (
            <p className="text-center text-red-500 mb-4">{statusMessage}</p>
          )}
          <div className="text-center mb-6">
            {timeRemainingInSec > 0 ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-green-custom">
                  You can request a new link in{" "}
                </p>
                <Timer timeRemainingInSec={timeRemainingInSec} />
              </div>
            ) : (
              <p className="text-green-500">
                You can request a new verification link now
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              onClick={handleResend}
              className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                timeRemainingInSec > 0 || resendMessage.includes("maximum")
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                timeRemainingInSec > 0 || resendMessage.includes("maximum")
              }
            >
              {isSending ? "Processing.." : "Resend Verification Link"}
            </button>
            {resendMessage && (
              <p className="mt-4 text-center text-orange-500">
                {resendMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmAccount;
