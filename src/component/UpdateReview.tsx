import React, { useState } from "react";
import axios from "axios";

type ReviewUpdate = {
  rating?: number;
  reviewerName?: string;
  comment?: string;
};

const UpdateReview: React.FC = () => {
  const [id, setProductId] = useState<string>("");
  const [formData, setFormData] = useState<ReviewUpdate>({
    rating: undefined,
    reviewerName: "",
    comment: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://test-api.nova-techs.com/reviews/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Review updated successfully!");
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error updating review:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to update review."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-4xl w-full md:w-3/4 lg:w-2/3 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Update Review</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Review ID</label>
          <input
            type="text"
            name="reviewId"
            value={id}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Review ID"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating || ""}
            onChange={handleInputChange}
            placeholder="Enter Rating"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={1}
            max={5}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reviewer Name</label>
          <input
            type="text"
            name="reviewerName"
            value={formData.reviewerName || ""}
            onChange={handleInputChange}
            placeholder="Enter Reviewer Name"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            name="comment"
            value={formData.comment || ""}
            onChange={handleInputChange}
            placeholder="Enter Comment"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Review
          </button>
        </div>
      </form>

      {successMessage && (
        <div className="text-green-500 mt-4 text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
      )}
    </div>
  );
};

export default UpdateReview;
