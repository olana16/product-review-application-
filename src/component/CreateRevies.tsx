import React, { useState } from "react";
import axios from "axios";

const CreateReview: React.FC = () => {
  const [formData, setFormData] = useState({
    productId: "",
    rating: 0,
    reviewerName: "",
    comment: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://test-api.nova-techs.com/reviews",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Review created successfully!");
        setErrorMessage(null);

        // Reset the form fields
        setFormData({
          productId: "",
          rating: 0,
          reviewerName: "",
          comment: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to create review."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-4xl w-full md:w-3/4 lg:w-2/3 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Review</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            placeholder="Enter Product ID"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter Rating"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reviewer Name</label>
          <input
            type="text"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
            placeholder="Enter Reviewer Name"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Enter Comment"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Review
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

export default CreateReview;
