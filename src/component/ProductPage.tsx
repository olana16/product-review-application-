import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FetchReviews from "./FetchReviews";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrls: string[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://test-api.nova-techs.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setError("Failed to load product. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return <div className="text-center py-10 text-lg text-gray-600">Loading product details...</div>;
  if (error)
    return <div className="text-center py-10 text-lg text-red-500">{error}</div>;

  if (!product)
    return <div className="text-center py-10 text-lg text-gray-500">Product not found.</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-5 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-300"
      >
        &larr; Back
      </button>

      {/* Product Image */}
      <div className="flex justify-between items-start gap-28">
      {product.imageUrls && product.imageUrls.length > 0 ? (
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="w-full max-w-md mx-auto rounded-lg shadow-md mb-6"
        />
      ) : (
        <p className="text-center text-gray-500 mb-6">No image available</p>
      )}

      {/* Product Details */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <div className="flex justify-center items-center gap-6">
          <span className="text-lg font-semibold text-gray-700">
            Price: <span className="text-blue-600">${product.price}</span>
          </span>
          <span className="text-lg font-semibold text-gray-700">
            Rating: <span className="text-yellow-500">{product.rating}</span>
          </span>
        </div>
        <div className="flex gap-4 px-20 py-6">

        <Link
            to="/createreviews"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Reviews
          </Link>
      <Link
            to="/updatereviews"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Reviews
          </Link>
      <Link
            to="/deletereviews"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Delete Reviews
          </Link>

        </div>
        <FetchReviews/>
      </div>
      </div>
    </div>
  );
};

export default ProductPage;
