import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  name: string;
  image: string[];
  price: string;
  description: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, name, image, price, description }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <Link to={`/product/${id}`}>
        {/* Product Image */}
        <img
          src={image[0]}
          alt={name}
          className="w-full h-40 object-cover rounded-t-lg mb-3"
        />

        {/* Product Info */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{name}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Price */}
        <div className="text-xl font-bold text-blue-600">${price}</div>
      </Link>
    </div>
  );
};

export default BookCard;
