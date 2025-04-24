export default function ProductDetails({ product }) {
  if (!product) {
    return <p className="text-gray-500">Product data is unavailable</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 space-y-6 md:space-y-0 p-4 md:p-8">
      {/* Gambar Produk */}
      <img
        src={product.image || "/default-image.jpg"}
        alt={product.name || "Product Image"}
        className="w-full max-w-xs md:w-80 h-auto object-contain rounded-lg"
      />

      {/* Informasi Produk */}
      <div className="space-y-3 text-center md:text-left">
        <h2 className="text-2xl font-semibold text-black">
          {product.name || "No Name"}
        </h2>
        <p className="text-lg font-bold text-black">
          {product.formattedPrice
            ? `IDR ${product.formattedPrice.toLocaleString()}`
            : "Price Unavailable"}
        </p>
        <p className="text-gray-600">Color: {product.color || "Unknown"}</p>
        <p className="text-gray-600">
          Suitable for: {product.suitable_for || "Unknown"}
        </p>

        <a
          href={product.marketplaceLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center px-5 py-2 border border-blue-500 text-blue-600 rounded-full font-medium hover:bg-blue-100 transition"
        >
          🛒 View on Marketplace
        </a>
      </div>
    </div>
  );
}
