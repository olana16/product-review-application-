import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";

// Define the Zod schema for product validation
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  use: z.string().min(1, "Use is required"),
  minimumQuantity: z.number().positive("Minimum quantity must be a positive number"),
  sellingPrice: z.number().positive("Selling price must be a positive number"),
  addedBy: z.string().min(1, "Added by field is required"),
  expiresAt: z.string().optional(),
  quantityOnHand: z.number().positive("Quantity on hand must be a positive number"),
  reservedQuantity: z.number().nonnegative("Reserved quantity must be non-negative"),
  discount: z.number().nonnegative("Discount must be non-negative"),
  imageUrls: z.array(z.string().url()),
  timestamp: z.string().optional(),
});

// Define the type for the form data based on the Zod schema
type FormData = z.infer<typeof productSchema>;

const UpdateProduct: React.FC = () => {
  const [productId, setProductId] = useState<string>(""); // Track the product ID for updating
  const [formData, setFormData] = useState<FormData>({
    name: "Sample Product",
    description: "A description",
    price: 10,
    category: "Category Name",
    tags: ["tag1", "tag2"],
    use: "for_rent",
    minimumQuantity: 10,
    sellingPrice: 15,
    addedBy: "Kaleb",
    quantityOnHand: 100,
    reservedQuantity: 10,
    discount: 5,
    imageUrls: ["https://example.com/image.jpg"],
    timestamp: "2024-12-02T12:00:00Z", // Example timestamp
  });

  // const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "sellingPrice" ? Number(value) : value,
    }));
  };

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      setErrorMessage("Product ID is required to update a product.");
      return;
    }
    try {
      // Validate the form data using Zod
      const validatedData = productSchema.parse(formData);

      console.log("Submitting Data for Update:", validatedData);

      // Make the API request using Axios
      const response = await axios.patch(
        `https://test-api.nova-techs.com/products/${productId}`,
        validatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Product updated successfully!");
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Failed to update product.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-4xl w-full md:w-3/4 lg:w-2/3 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={handleProductIdChange}
            placeholder="Enter Product ID"
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleChange}
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Use</label>
          <input
            type="text"
            name="use"
            value={formData.use}
            onChange={handleChange}
            className="border rounded-md w-full p-3 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Include other fields as needed */}

        <div className="flex justify-center">
          <button type="submit" className="mt-6 p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update Product
          </button>
        </div>
      </form>

      {successMessage && <div className="text-green-500 mt-4 text-center">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 mt-4 text-center">{errorMessage}</div>}
    </div>
  );
};

export default UpdateProduct;
