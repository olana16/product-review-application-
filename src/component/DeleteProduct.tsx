import React, { useState } from "react";
import axios from "axios";

const DeleteProduct: React.FC = () => {
  const [productId, setProductId] = useState<string>(""); // Track the product ID for deletion
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) {
      setErrorMessage("Product ID is required to delete a product.");
      return;
    }

    try {
      const response = await axios.delete(
        `https://test-api.nova-techs.com/products/${productId}`
      );

      if (response.status === 200 || response.status === 204) {
        setSuccessMessage("Product deleted successfully!");
        setErrorMessage(null);
        setProductId(""); // Clear the input field after successful deletion
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to delete product."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-4xl w-full md:w-3/4 lg:w-2/3 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Delete Product</h1>
      <form onSubmit={handleDelete} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={handleProductIdChange}
            placeholder="Enter Product ID"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 p-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Product
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

export default DeleteProduct;
