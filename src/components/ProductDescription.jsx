import React from "react";

const ProductDescription = ({ product }) => {
  return (
    <div>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
};

export default ProductDescription;
