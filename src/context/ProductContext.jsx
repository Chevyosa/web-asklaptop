import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showProductList, setShowProductList] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        recommendedProducts,
        setRecommendedProducts,
        userInput,
        setUserInput,
        showProductList,
        setShowProductList,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = () => useContext(ProductContext);
