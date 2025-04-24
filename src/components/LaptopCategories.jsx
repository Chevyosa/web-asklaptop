export default function LaptopCategories({ onCategoryClick }) {
  const categories = [
    {
      emoji: "🎮",
      name: "Gaming Laptop",
      user_input: "i need a laptop for gaming",
    },
    { emoji: "💻", name: "Macbook", user_input: "i need a macbook" },
    {
      emoji: "👨‍💻",
      name: "Everyday Use Laptop",
      user_input: "i need a laptop for everyday use",
    },
  ];

  return (
    <div className="w-full max-w-4xl flex flex-wrap gap-2 justify-center">
      {categories.map((cat, index) => (
        <button
          key={index}
          className="bg-white px-2 sm:px-4 py-2 sm:py-3 rounded-xl shadow-md text-[#20294C] font-semibold text-sm sm:text-base leading-tight flex items-center justify-center whitespace-nowrap hover:bg-gray-100 transition"
          onClick={() => onCategoryClick?.(cat.user_input)}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
