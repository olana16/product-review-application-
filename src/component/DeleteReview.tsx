import React, { useState } from "react";
import axios from "axios";

const DeleteReview: React.FC = () => {
  const [reviewId, setReviewId] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://test-api.nova-techs.com/reviews/${reviewId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Review deleted successfully!");
        setErrorMessage(null);
        setReviewId("");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to delete review."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-4xl w-full md:w-3/4 lg:w-2/3 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Delete Review</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Review ID</label>
          <input
            type="text"
            name="reviewId"
            value={reviewId}
            onChange={(e) => setReviewId(e.target.value)}
            placeholder="Enter Review ID"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleDelete}
            className="mt-6 p-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Review
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="text-green-500 mt-4 text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
      )}
    </div>
  );
};

export default DeleteReview;
