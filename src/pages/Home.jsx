import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Truck, Search, Sparkles, Star, Mail } from 'lucide-react';
import { getProducts, getCategories, getBrands } from '../api/fakeApi';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import BrandCard from '../components/BrandCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'EgyptCart | Egyptian Fashion & Clothing Store';
    getProducts().then(setProducts);
    getCategories().then(setCategories);
    getBrands().then(setBrands);
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = products.slice(0, 6);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const reviews = [
    { name: 'Mariam', rating: 5, text: 'Beautiful quality and the sizing guide was really helpful.' },
    { name: 'Omar', rating: 5, text: 'Great fit and fast delivery. The linen shirt is perfect for Cairo weather.' },
    { name: 'Salma', rating: 5, text: 'Love the elegant designs. The Layali dress exceeded my expectations.' },
  ];

  return (
    <div>
      <section className="hero-section py-5">
        <div className="hero-deco-left"></div>
        <div className="hero-deco-right"></div>
        <Container className="hero-content-z">
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <h1 className="hero-title display-4 fw-bold mb-3">
                Style Made for <span className="hero-title-accent">Egypt.</span>
              </h1>
              <p className="hero-text lead mb-4">
                Discover modern clothing from unique local-inspired fashion labels, all in one place.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>Shop Now</Button>
                <Button variant="outline-primary" size="lg" onClick={() => navigate('/brands')}>Explore Brands</Button>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src="/images/photo1.jpg"
                alt="Fashion clothing"
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center p-4 h-100">
                <div className="benefit-icon"><Sparkles /></div>
                <h3 className="benefit-title fs-5 fw-semibold mb-1">Local-Inspired Fashion</h3>
                <p className="benefit-text">Discover unique Egyptian-inspired styles.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 h-100">
                <div className="benefit-icon"><Search /></div>
                <h3 className="benefit-title fs-5 fw-semibold mb-1">Easy Shopping</h3>
                <p className="benefit-text">Find your favorite pieces in one place.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 h-100">
                <div className="benefit-icon"><Truck /></div>
                <h3 className="benefit-title fs-5 fw-semibold mb-1">Fast Local Delivery</h3>
                <p className="benefit-text">A simple local shopping experience.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pb-5">
        <Container>
          <h2 className="section-title text-center fw-bold mb-1">Shop by Category</h2>
          <div className="divider"></div>
          <p className="section-subtitle text-center mb-4">Browse our collections by category</p>
          <Row className="g-4">
            {categories.map((cat) => (
              <Col key={cat.name} xs={12} sm={6} lg={4}>
                <CategoryCard category={cat} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="pb-5">
        <Container>
          <h2 className="section-title text-center fw-bold mb-1">Featured Collection</h2>
          <div className="divider"></div>
          <p className="section-subtitle text-center mb-4">Our handpicked favorites this season</p>
          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="pb-5">
        <Container>
          <h2 className="section-title text-center fw-bold mb-1">Meet Our Labels</h2>
          <div className="divider"></div>
          <p className="section-subtitle text-center mb-4">Three brands, each with its own story</p>
          <Row className="g-4">
            {brands.map((brand, idx) => {
              const variants = ['burgundy', 'cream', 'sage'];
              return (
                <Col key={brand.name} md={4}>
                  <BrandCard brand={brand} variant={variants[idx]} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="pb-5">
        <Container>
          <div className="promo-banner p-5 text-center">
            <div className="promo-deco-left"></div>
            <div className="promo-deco-right"></div>
            <div className="promo-content-z">
              <h2 className="promo-title fw-bold mb-3">Your Wardrobe, Your Way.</h2>
              <p className="promo-text mx-auto mb-4">
                Find everyday essentials and statement pieces designed for modern Egyptian style.
              </p>
              <Button variant="primary" onClick={() => navigate('/shop')}>Shop Collection</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-5">
        <Container>
          <h2 className="section-title text-center fw-bold mb-1">Customer Reviews</h2>
          <div className="divider"></div>
          <p className="section-subtitle text-center mb-4">What our customers say</p>
          <Row className="g-4">
            {reviews.map((review) => (
              <Col key={review.name} md={4}>
                <Card className="review-card border rounded-3 text-center p-4 h-100">
                  <div className="review-avatar">{review.name[0]}</div>
                  <h4 className="review-name fs-6 fw-semibold mb-1">{review.name}</h4>
                  <div className="d-flex justify-content-center gap-1 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="star-filled" />
                    ))}
                  </div>
                  <p className="review-text fst-italic mb-0">"{review.text}"</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="pb-5">
        <Container>
          <div className="newsletter-section bg-white border rounded-3 p-5 text-center">
            <Mail size={28} className="newsletter-icon mb-3" />
            <h2 className="newsletter-title fw-bold mb-2">Stay in Style</h2>
            <p className="newsletter-text mb-3">Get new arrivals and special offers in your inbox.</p>
            {subscribed && (
              <Alert variant="success" className="d-inline-block mt-2">Thank you for subscribing!</Alert>
            )}
            <Form className="newsletter-form d-flex gap-2 mx-auto" onSubmit={handleSubscribe}>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button variant="primary" type="submit">Subscribe</Button>
            </Form>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
