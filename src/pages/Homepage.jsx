import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import "@fontsource/geist";
import ChatInput from "../components/ChatInput";
import LaptopCategories from "../components/LaptopCategories";
import ProductHeader from "../components/ProductHeader";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import logo from "../assets/logo.png";
import vector from "../assets/Vector 32.png";
import { useProduct } from "../context/ProductContext";

export default function HomePage() {
  const baseURL = "https://helping-crayfish-cheerful.ngrok-free.app/";

  const {
    setRecommendedProducts,
    setUserInput,
    setShowProductList,
    recommendedProducts,
    userInput,
    showProductList,
  } = useProduct();

  // const [showProductList, setShowProductList] = useState(() => {
  //   return localStorage.getItem("showProductList") === "true";
  // });

  // const [userInput, setUserInput] = useState("");

  const formatPrice = (idr, usd) => {
    const formattedIDR = idr.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
    const formattedUSD = usd.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return `${formattedIDR} / ${formattedUSD}`;
  };

  const [totalItems, setTotalItems] = useState(0);

  async function getRecommendedProducts(query, sortBy) {
    try {
      const response = await fetch(baseURL + "recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: query }),
      });

      if (!response.ok) throw new Error("Failed to fetch recommendations");

      const data = await response.json();
      setTotalItems(data.length);

      const products = data.map((item, index) => ({
        id: index + 1,
        name: item.laptop_name,
        formattedPrice: formatPrice(item.price_idr ?? 0, item.price_usd ?? 0),
        image: baseURL + item.image_route,
        rawPrice: item.price_idr ?? item.price_usd ?? 0,
        marketplaceLink:
          "https://shopee.co.id/search?keyword=" + item.laptop_name,
        processor_brand: item.processor_brand,
        processor_name: item.processor_name,
        memory: item.memory,
        memory_type: item.memory_type,
        color: item.color,
        suitable_for: item.suitable_for,
        graphic_processor: item.graphic_processor,
        screen_size: item.screen_size,
        screen_res: item.screen_res,
        screen_type: item.screen_type,
        ssd_capacity: item.ssd_capacity ?? 0,
        hdd_capacity: item.hdd_capacity ?? 0,
        emmc_capacity: item.emmc_capacity ?? 0,
        description: item.description,
      }));

      if (sortBy === "price_low") {
        products.sort((a, b) => a.rawPrice - b.rawPrice);
      } else if (sortBy === "price_high") {
        products.sort((a, b) => b.rawPrice - a.rawPrice);
      }

      return products;
    } catch (error) {
      console.error("Recommendation error:", error);
      setTotalItems(0);
      return [];
    }
  }

  // const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(35);

  const paginatedProducts = recommendedProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    localStorage.setItem("showProductList", showProductList);
  }, [showProductList]);

  const handleSend = async (message) => {
    const recommendations = await getRecommendedProducts(message, sortBy);
    setUserInput(message);
    setRecommendedProducts(recommendations);
    setShowProductList(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const handleShortcutInput = async (input) => {
    setUserInput(input);
    const recommendations = await getRecommendedProducts(input, sortBy);
    setRecommendedProducts(recommendations);
    setShowProductList(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  useEffect(() => {
    const sortProducts = async () => {
      if (userInput && showProductList) {
        const recommendations = await getRecommendedProducts(userInput, sortBy);
        setRecommendedProducts(recommendations);
      }
    };

    sortProducts();
  }, [sortBy]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#30475E] text-white text-center px-4 overflow-hidden pb-20 pt-16">
      {/* Background vector */}
      <img
        src={vector}
        alt="Vector Background"
        className="absolute top-[38%] left-0 w-full opacity-100"
      />

      {!showProductList ? (
        <>
          {/* Header */}
          <div className="mb-12 relative z-10 flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-24 sm:w-32 mb-6 sm:mb-8" />
            <motion.h1
              className="text-3xl sm:text-5xl font-medium font-[Geist]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Hey There!
            </motion.h1>
            <motion.h2 className="text-2xl sm:text-5xl font-medium mt-2 font-[Geist] text-balance">
              {"What Kind of Laptop That You Need?"
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.h2>
            <p className="text-lg sm:text-xl mt-2 font-[Geist]">
              Ready to assist you with what you need.
            </p>
          </div>

          {/* Chat Input */}
          <div className="mt-10 sm:mt-20 pt-10 sm:pt-16 w-full max-w-2xl relative z-10 flex justify-center">
            <ChatInput onSend={handleSend} />
          </div>

          {/* Shortcut Categories */}
          <div className="mt-6 w-full max-w-2xl relative z-10 flex justify-center">
            <LaptopCategories onCategoryClick={handleShortcutInput} />
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 overflow-y-auto bg-[#F5F5F5] min-h-screen w-full p-4 sm:p-6 pt-24 sm:pt-20"
        >
          {/* Back Button */}
          <button
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={() => setShowProductList(false)}
          >
            Back
          </button>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-black text-left">
            Here's Some Recommendation for "{userInput}"
          </h1>

          <ProductHeader
            totalItems={totalItems}
            perPage={perPage}
            setPerPage={setPerPage}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 pt-5">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination
              totalPages={Math.ceil(totalItems / perPage)}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
