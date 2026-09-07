import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} size={14} fill="currentColor" className="star-filled" />);
    } else {
      stars.push(<Star key={i} size={14} className="star-empty" />);
    }
  }
  return stars;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card d-flex flex-column h-100">
      <div className="product-card-img-wrapper" onClick={() => navigate(`/products/${product.id}`)}>
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        <img src={product.image} alt={product.name} className="product-card-img" loading="lazy" />
      </div>
      <div className="p-3 d-flex flex-column flex-grow-1">
        <span className="product-card-brand text-uppercase fw-semibold">
          {product.brand}
        </span>
        <h3 className="product-card-name fs-6 fw-semibold mb-1">
          {product.name}
        </h3>
        <div className="d-flex align-items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="product-card-rating-text ms-1">({product.rating})</span>
        </div>
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="product-card-price fs-5 fw-bold">{product.price} EGP</span>
          {product.oldPrice && <span className="product-card-old-price">{product.oldPrice} EGP</span>}
        </div>
        <div className="d-flex gap-2 mt-auto">
          <Button variant="primary" className="product-card-btn flex-grow-1 py-1" onClick={handleAddToCart}>
            <ShoppingCart size={15} className="me-1" />Add
          </Button>
          <Button variant="outline-primary" className="product-card-btn flex-grow-1 py-1" onClick={() => navigate(`/products/${product.id}`)}>
            <Eye size={15} className="me-1" />Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
