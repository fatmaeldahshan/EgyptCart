import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-custom py-5">
      <Container>
        <Row className="g-4">
          <Col lg={4} md={6}>
            <div className="footer-brand d-flex align-items-center gap-2 fs-4 fw-bold text-cream mb-2">
              EgyptCart
            </div>
            <div className="social-icons d-flex gap-2 mt-3">
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram /></a>
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter /></a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="footer-heading text-cream text-uppercase fw-semibold mb-3">Shop</h5>
            <ul className="footer-links">
              <li className="mb-2"><NavLink to="/shop">All Products</NavLink></li>
              <li className="mb-2"><NavLink to="/shop?category=Women">Women</NavLink></li>
              <li className="mb-2"><NavLink to="/shop?category=Men">Men</NavLink></li>
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="footer-heading text-cream text-uppercase fw-semibold mb-3">Company</h5>
            <ul className="footer-links">
              <li className="mb-2"><NavLink to="/brands">Brands</NavLink></li>
              <li className="mb-2"><NavLink to="/about">About</NavLink></li>
              <li className="mb-2"><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h5 className="footer-heading text-cream text-uppercase fw-semibold mb-3">EgyptCart</h5>
            <p className="footer-contact-text">
              Cairo, Egypt<br />
              hello@egyptcart.example<br />
              +20 100 000 0000
            </p>
          </Col>
        </Row>

        <hr className="footer-divider mt-4 mb-3" />
        <p className="footer-copyright text-center">
          &copy; EgyptCart.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
