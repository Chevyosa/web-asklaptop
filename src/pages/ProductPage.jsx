import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // Import ikon dari lucide-react

import ProductDetails from "../components/ProductDetails";
import ProductDescription from "../components/ProductDescription";
import ProductSpecifications from "../components/ProductSpesifications";
import { useProduct } from "../context/ProductContext";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { recommendedProducts } = useProduct();
  const product = recommendedProducts.find((item) => String(item.id) === id);

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Product Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
          >
            Back
          </button>
        </div>

        {/* Product Details Component */}
        <ProductDetails product={product} />

        {/* Teks "Product information & specifications" */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800">
            Product Information & Specifications
          </h2>
          <div className="w-full h-[1.5px] bg-[#DADADA] mt-2"></div>
        </div>

        {/* Product Description & Specifications dalam satu baris */}
        <div className="mt-8 flex flex-col md:flex-row gap-20">
          {/* Product Description di sebelah kiri (60%) */}
          <div className="md:w-3/5">
            <ProductDescription product={product} />
          </div>

          {/* Product Specifications di sebelah kanan (40%) */}
          <div className="md:w-2/5">
            <ProductSpecifications product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
