import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getBrands, getProducts } from '../api/fakeApi';
import BrandCard from '../components/BrandCard';
import ProductCard from '../components/ProductCard';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = 'Our Brands | EgyptCart';
    getBrands().then(setBrands);
    getProducts().then(setProducts);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="section-title fw-bold mb-1">Our Brands</h1>
          <div className="divider"></div>
          <p className="section-subtitle">Three fashion labels, each with its own unique style</p>
        </div>

        <Row className="g-4 mb-5">
          {brands.map((brand, idx) => {
            const variants = ['burgundy', 'cream', 'sage'];
            return (
              <Col key={brand.name} md={4}>
                <BrandCard brand={brand} variant={variants[idx]} />
              </Col>
            );
          })}
        </Row>

        {brands.map((brand) => {
          const brandProducts = products.filter((p) => p.brand === brand.name);
          return (
            <div key={brand.name} className="mb-5">
              <h2 className="brand-section-title fw-bold mb-1">{brand.name}</h2>
              <p className="brand-section-desc mb-4">{brand.description}</p>
              <Row className="g-4">
                {brandProducts.map((product) => (
                  <Col key={product.id} xs={12} sm={6} lg={3}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Brands;
