import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Lightbulb, Shirt, Target } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'About EgyptCart | EgyptCart';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="section-title fw-bold mb-1">About EgyptCart</h1>
          <div className="divider"></div>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="about-card border rounded-3 p-4 h-100 text-center">
              <div className="about-card-icon"><Lightbulb /></div>
              <h3 className="about-card-title fs-5 fw-semibold mb-2">Our Idea</h3>
              <p className="about-card-text mb-0">
                Make discovering fashion simple and enjoyable. A clean, easy-to-use platform where customers can explore different collections in one place.
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="about-card border rounded-3 p-4 h-100 text-center">
              <div className="about-card-icon"><Shirt /></div>
              <h3 className="about-card-title fs-5 fw-semibold mb-2">Our Style</h3>
              <p className="about-card-text mb-0">
                Modern, comfortable and stylish clothing. Each piece is designed with Egyptian-inspired details that feel fresh, youthful, and elegant.
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="about-card border rounded-3 p-4 h-100 text-center">
              <div className="about-card-icon"><Target /></div>
              <h3 className="about-card-title fs-5 fw-semibold mb-2">Our Mission</h3>
              <p className="about-card-text mb-0">
                Create a simple platform where customers can explore different fashion collections from unique local-inspired labels, all in one place.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
