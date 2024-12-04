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

const CreateProduct: React.FC = () => {
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
    timestamp: "2024-12-02T12:00:00Z",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = productSchema.parse(formData);
      console.log("Submitting Data:", validatedData);

      const response = await axios.post(
        "https://test-api.nova-techs.com/products",
        validatedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Product created successfully!");
        setErrorMessage(null);
        setFormData({
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
          timestamp: "2024-12-02T12:00:00Z",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Failed to create product.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 w-full md:w-3/4 lg:w-2/3 bg-gray-50 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Description", name: "description", type: "textarea" },
          { label: "Price", name: "price", type: "number" },
          { label: "Category", name: "category", type: "text" },
          { label: "Tags (comma-separated)", name: "tags", type: "text" },
          { label: "Use", name: "use", type: "text" },
          { label: "Minimum Quantity", name: "minimumQuantity", type: "number" },
          { label: "Selling Price", name: "sellingPrice", type: "number" },
          { label: "Added By", name: "addedBy", type: "text" },
          { label: "Quantity on Hand", name: "quantityOnHand", type: "number" },
          { label: "Reserved Quantity", name: "reservedQuantity", type: "number" },
          { label: "Discount", name: "discount", type: "number" },
          { label: "Image URLs (comma-separated)", name: "imageUrls", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={type === "text" ? formData[name as keyof FormData] : formData[name as keyof FormData]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Product
        </button>
      </form>
      {successMessage && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
