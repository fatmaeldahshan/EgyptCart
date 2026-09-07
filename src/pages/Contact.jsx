import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    document.title = 'Contact Us | EgyptCart';
    window.scrollTo(0, 0);
    nameRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      setSubmitted(true);
      form.reset();
      setValidated(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="section-title fw-bold mb-1">Get in Touch</h1>
          <div className="divider"></div>
          <p className="section-subtitle">We'd love to hear from you. Send us a message.</p>
        </div>

        <Row className="g-4">
          <Col lg={7}>
            <Card className="contact-form-card border rounded-3 p-4">
              {submitted && (
                <Alert variant="success" className="mb-3">Thank you! Your message has been sent.</Alert>
              )}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="contact-form-label fw-semibold">Full Name</Form.Label>
                      <Form.Control ref={nameRef} type="text" placeholder="Your name" required />
                      <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="contact-form-label fw-semibold">Email</Form.Label>
                      <Form.Control type="email" placeholder="you@example.com" required />
                      <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="contact-form-label fw-semibold">Phone</Form.Label>
                      <Form.Control type="tel" placeholder="+20 100 000 0000" required />
                      <Form.Control.Feedback type="invalid">Please enter your phone number.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="contact-form-label fw-semibold">Message</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Your message..." required />
                      <Form.Control.Feedback type="invalid">Please enter a message.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-3">Send Message</Button>
              </Form>
            </Card>
          </Col>

          <Col lg={5}>
            <div className="contact-info-card p-4 h-100 rounded-3">
              <h3 className="contact-info-title fw-bold mb-3">Contact Information</h3>
              <div className="contact-info-item d-flex align-items-start gap-2 mb-3">
                <MapPin size={20} /><span>Cairo, Egypt</span>
              </div>
              <div className="contact-info-item d-flex align-items-start gap-2 mb-3">
                <Mail size={20} /><span>hello@egyptcart.example</span>
              </div>
              <div className="contact-info-item d-flex align-items-start gap-2 mb-3">
                <Phone size={20} /><span>+20 100 000 0000</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
