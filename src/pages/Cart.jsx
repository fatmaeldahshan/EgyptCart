import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    subtotal,
  } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = 'Shopping Cart | EgyptCart';
    window.scrollTo(0, 0);
  }, []);

  const shipping = subtotal > 0 ? 60 : 0;
  const total = subtotal + shipping;

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (cartItems.length === 0) {
    return (
      <div className="py-5">
        <Container>
          <div className="text-center py-5">
            <ShoppingBag size={56} className="empty-cart-icon mb-3" />
            <p className="empty-cart-text fs-5 mb-4">Your cart is empty.</p>
            <Button variant="primary" onClick={() => navigate('/shop')}>Start Shopping</Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="cart-title fw-bold mb-0">Shopping Cart</h1>
          <Button variant="outline-danger" size="sm" onClick={clearCart}>
            <Trash2 size={15} className="me-1" />Clear Cart
          </Button>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            {cartItems.map((item) => (
              <Card key={item.id} className="cart-item-card d-flex flex-row align-items-center gap-3 p-3 mb-3 border">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="flex-grow-1">
                  <span className="cart-item-brand text-uppercase fw-semibold d-block">{item.brand}</span>
                  <h3 className="cart-item-name fs-6 fw-semibold mb-1">{item.name}</h3>
                  <span className="cart-item-price fw-semibold">{item.price} EGP</span>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => decreaseQuantity(item.id)} aria-label="Decrease quantity"><Minus size={15} /></button>
                  <span className="cart-quantity-text px-2 fw-semibold">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} aria-label="Increase quantity"><Plus size={15} /></button>
                </div>
                <div className="cart-item-subtotal fw-bold text-end">{item.price * item.quantity} EGP</div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <Trash2 size={18} />
                </button>
              </Card>
            ))}
          </Col>

          <Col lg={4}>
            <Card className="cart-summary-card border rounded-3 p-4 sticky-top">
              <h3 className="cart-summary-title fw-bold mb-3 pb-3">Order Summary</h3>
              <div className="d-flex justify-content-between mb-2">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value fw-medium">{subtotal} EGP</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="summary-label">Shipping</span>
                <span className="summary-value fw-medium">{shipping} EGP</span>
              </div>
              <div className="summary-total d-flex justify-content-between pt-3 mt-2">
                <span>Total</span>
                <span className="summary-total-value">{total} EGP</span>
              </div>
              <Button variant="primary" className="w-100 mt-3 py-2" onClick={handleShow}>Proceed to Checkout</Button>
              <Button variant="outline-primary" className="w-100 mt-2 py-2" onClick={() => navigate('/shop')}>Continue Shopping</Button>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Checkout is currently unavailable.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
