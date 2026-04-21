import { useRouter } from "next/router";
import React from "react";

const ErrorComponent = () => {
  const router = useRouter();

  const Back = () => {
    router.replace("/");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-gradient-primary">
      <div
        className="p-5 shadow-lg rounded-4 bg-white border-0"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-4">
          <span className="display-1 fw-bold text-primary">😵</span>
        </div>
        <h1 className="display-1 fw-bold text-danger mb-0">404</h1>

        <div className="alert alert-warning border-0 bg-transparent fs-4 fw-semibold mt-3">
          Oops! Page Not Found
        </div>

        <p className="text-muted mb-4">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>

        <button
          className="btn btn-primary btn-lg px-5 shadow-sm rounded-pill fw-bold"
          onClick={() => Back()}
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
