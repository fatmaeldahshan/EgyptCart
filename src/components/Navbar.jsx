import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Shirt } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NavbarCustom = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navbar-custom sticky-top" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
          
          <span>
            EgyptCart
            <span className="brand-subtitle">Egyptian Fashion Store</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link-custom" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/shop" className="nav-link-custom">Shop</Nav.Link>
            <Nav.Link as={NavLink} to="/brands" className="nav-link-custom">Brands</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link onClick={() => navigate('/cart')} className="cart-link d-flex align-items-center gap-1">
              <ShoppingBag size={22} />
              <span className="d-none d-lg-inline">Cart</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
