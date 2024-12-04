import React, { useState } from "react";
import axios from "axios";

type Review = {
  id: string;
  productId: string;
  rating: number;
  reviewerName: string;
  comment: string;
  createdAt: string;
};

const FetchReviews: React.FC = () => {
  const [productId, setProductId] = useState<string>("");
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://test-api.nova-techs.com/reviews/${productId}`
      );

      if (response.status === 200) {
        setReviews(response.data);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to fetch reviews."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setReviews(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) {
      fetchReviews();
    } else {
      setErrorMessage("Please provide a valid product ID.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Fetch Reviews by Product ID</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={handleInputChange}
            placeholder="Enter Product ID"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fetch Reviews
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
      )}

      {reviews && reviews.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border p-4 rounded-md bg-gray-50 shadow-sm">
                <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
                <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reviews && reviews.length === 0 && (
        <div className="mt-4 text-center">No reviews found for this product.</div>
      )}
    </div>
  );
};

export default FetchReviews;
