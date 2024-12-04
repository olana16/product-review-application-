import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';

// Define the interface for the product data
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  use: string;
  minimumQuantity: number;
  sellingPrice: string;
  addedBy: string;
  expiresAt: string;
  quantityOnHand: string;
  reservedQuantity: string;
  discount: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

const MainContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Initialize the products state
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [categories, setCategories] = useState<string[]>([]); // For categories filter
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products
  const [searchTerm, setSearchTerm] = useState<string>(''); // For search filter
  const [minPrice, setMinPrice] = useState<string>(''); // For minimum price filter
  const [maxPrice, setMaxPrice] = useState<string>(''); // For maximum price filter

  // Fetch data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://test-api.nova-techs.com/products');
        const result = await response.json();

        // Ensure result.data is correctly typed as an array of Product
        if (Array.isArray(result.data)) {
          const productsData: Product[] = result.data;

          // Set products and filtered products
          setProducts(productsData);
          setFilteredProducts(productsData);

          // Extract unique categories from the products
          const uniqueCategories = [
            ...new Set(productsData.map((product) => product.category)),
          ];

          // Set the unique categories
          setCategories(uniqueCategories);
        } else {
          setError('No products found.');
        }
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected criteria
  useEffect(() => {
    let filtered = products;

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (minPrice && maxPrice) {
      filtered = filtered.filter(
        (product) =>
          Number(product.price) >= Number(minPrice) &&
          Number(product.price) <= Number(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Sidebar */}
      <div className="md:w-1/4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Search by name */}
        <div className="mb-4">
          <label className="block mb-2">Search by Name</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search by product name"
          />
        </div>

        {/* Filter by Category */}
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            onChange={(e) => {
              const category = e.target.value;
              const filtered = category
                ? products.filter((product) => product.category === category)
                : products;
              setFilteredProducts(filtered);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Price */}
        <div className="mb-4">
          <label className="block mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        

        <div className='flex gap-2 sm:flex-col'>

        <Link
            to="/createproduct"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Product
          </Link>
      <Link
            to="/updateproduct"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Product
          </Link>
      <Link
            to="/deleteproduct"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Delete Product
          </Link>


        </div>
        
      </div>

      {/* Main content */}
      <div className="md:w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              image={product.imageUrls}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>

        <div className="mt-6">
        
        </div>
      </div>
    </div>
  );
};

export default MainContent;
