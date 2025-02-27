import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { id, hash } = useParams();
  const [verificationStatus, setVerificationStatus] = useState({
    verified: false,
    loading: true,
    error: null,
    message: "",
  });
  const [resendStatus, setResendStatus] = useState({
    sent: false,
    loading: false,
    error: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id && hash) {
      verifyEmail(id, hash);
    }
  }, [id, hash]);

  const verifyEmail = async (id, hash) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/login/email/verify/${id}/${hash}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setVerificationStatus({
        verified: true,
        loading: false,
        message: "Your email has been successfully verified!",
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setVerificationStatus({
        verified: false,
        loading: false,
        error:
          error.response?.data?.message ||
          "Verification failed. The link may be invalid or expired.",
      });
    }
  };

  const handleResendVerification = async () => {
    setResendStatus({ sent: false, loading: true, error: null });
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/login/email/verification-notification",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResendStatus({
        sent: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setResendStatus({
        sent: false,
        loading: false,
        error:
          error.response?.data?.message ||
          "Failed to resend verification email. Please try again later.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>

          {verificationStatus.loading ? (
            <div className="mt-4">
              <div className="w-8 h-8 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-gray-600">Processing verification...</p>
            </div>
          ) : verificationStatus.verified ? (
            <div className="mt-4 text-sm text-green-600">
              <svg
                className="w-10 h-10 mx-auto text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="mt-2">{verificationStatus.message}</p>
            </div>
          ) : (
            <div className="mt-4">
              {verificationStatus.error ? (
                <div className="mb-4 text-sm text-red-600">
                  <svg
                    className="w-10 h-10 mx-auto text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p className="mt-2">{verificationStatus.error}</p>
                </div>
              ) : (
                <p className="mb-4 text-sm text-gray-600">{verificationStatus.message}</p>
              )}

              <div className="mt-6">
                <button
                  onClick={handleResendVerification}
                  disabled={resendStatus.loading || resendStatus.sent}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    resendStatus.loading || resendStatus.sent
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }`}
                >
                  {resendStatus.loading
                    ? "Sending..."
                    : resendStatus.sent
                    ? "Verification Email Sent!"
                    : "Resend Verification Email"}
                </button>

                {resendStatus.error && (
                  <p className="mt-2 text-sm text-red-600">{resendStatus.error}</p>
                )}

                {resendStatus.sent && (
                  <p className="mt-2 text-sm text-green-600">
                    Verification link has been sent to your email. Please check your inbox.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;