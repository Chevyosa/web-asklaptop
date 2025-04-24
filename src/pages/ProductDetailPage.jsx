import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { products } from "../data/products";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  if (!product) return <div>Produk tidak ditemukan</div>;

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
