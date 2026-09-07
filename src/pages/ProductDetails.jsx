import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Badge } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById, getProducts } from '../api/fakeApi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} size={18} fill="currentColor" className="star-filled" />);
    } else {
      stars.push(<Star key={i} size={18} className="star-empty" />);
    }
  }
  return stars;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    document.title = 'Product Details | EgyptCart';
    window.scrollTo(0, 0);
    getProductById(id).then((p) => {
      setProduct(p);
      if (p) {
        setSelectedSize(p.sizes[0]);
        setSelectedColor(p.colors[0]);
      }
    });
    getProducts().then(setAllProducts);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <p>Loading product...</p>
      </Container>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="py-5">
      <Container>
        <Breadcrumb className="pd-breadcrumb mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/shop' }}>Shop</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="g-4">
          <Col lg={6}>
            <div className="pd-image-wrapper">
              <img src={product.image} alt={product.name} className="pd-image" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="ps-lg-3 mt-lg-0 mt-4">
              <span className="pd-brand text-uppercase fw-semibold d-block mb-2">
                {product.brand}
              </span>
              <h1 className="pd-name fw-bold mb-3">{product.name}</h1>
              <div className="d-flex align-items-center gap-1 mb-3">
                {renderStars(product.rating)}
                <span className="pd-rating-value ms-2">{product.rating} out of 5</span>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="pd-price fw-bold">{product.price} EGP</span>
                {product.oldPrice && (
                  <>
                    <span className="pd-old-price">{product.oldPrice} EGP</span>
                    <Badge className="pd-discount-badge">-{discount}%</Badge>
                  </>
                )}
              </div>

              <p className="pd-description mb-4">{product.description}</p>

              <div className="mb-3">
                <p className="pd-label text-uppercase fw-semibold mb-2">Available Sizes</p>
                <div className="d-flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`pd-option ${selectedSize === size ? 'pd-option-selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <p className="pd-label text-uppercase fw-semibold mb-2">Available Colors</p>
                <div className="d-flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`pd-option ${selectedColor === color ? 'pd-option-selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="pd-quantity">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
                  <span className="px-3 fw-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
                </div>
                <span className="pd-stock">{product.stock} in stock</span>
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <Button variant="primary" onClick={handleAddToCart}>
                  <ShoppingCart size={18} className="me-2" />Add to Cart
                </Button>
                <Button variant="outline-primary" onClick={() => navigate('/shop')}>
                  <ArrowLeft size={18} className="me-2" />Back to Shop
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <h2 className="pd-related-title section-title text-center fw-bold mb-1">Related Products</h2>
            <div className="divider"></div>
            <p className="section-subtitle text-center mb-4">You might also like these</p>
            <Row className="g-4">
              {relatedProducts.map((p) => (
                <Col key={p.id} xs={12} sm={6} lg={3}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;
