import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}
