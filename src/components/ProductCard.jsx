import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="bg-white p-4 h-72 flex flex-col justify-between rounded-lg border-2 border-[#DADADA]">
        <p className="text-gray-500">Product data is unavailable</p>
      </div>
    );
  }

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white p-4 h-72 flex flex-col justify-between rounded-lg border-2 border-[#DADADA] cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        {/* Gambar Produk */}
        <img
          src={product.image || "/default-image.jpg"}
          alt={product.name || "No Name"}
          className="h-40 w-40 object-contain"
        />
        {/* Nama dan Harga Produk */}
        <div className="mt-8 w-full">
          <h3 className="text-left text-normal text-black">
            {(product.name || "No Name").length > 15
              ? product.name.slice(0, 24) + "..."
              : product.name || "No Name"}
          </h3>
          <p className="text-lg font-bold text-left text-black">
            {/* {product.price ? `Rp ${product.price.toLocaleString()}` : "Price Unavailable"} */}
            {product.formattedPrice}
          </p>
        </div>
      </div>
    </div>
  );
}
