import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi"; // Icon for unauthorized access

const NotAuth = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center flex flex-col items-center justify-center">
        <HiOutlineLockClosed className="w-24 h-24 text-gray-600 mb-4" />

        <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-8">
          You don't have permission to view this page. Please log in with the
          proper credentials.
        </p>

        <button
          onClick={handleGoBack}
          className="inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-950 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotAuth;
