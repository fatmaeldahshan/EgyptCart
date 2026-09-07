import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { getProducts } from '../api/fakeApi';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All Brands');
  const [sort, setSort] = useState('Default');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = 'Shop All Clothing | EgyptCart';
    getProducts().then(setProducts);
    window.scrollTo(0, 0);

    const catParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    if (catParam) setCategory(catParam);
    if (brandParam) setBrand(brandParam);
  }, [searchParams]);

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === 'All' ||
        (category === 'Women' && p.gender === 'Women') ||
        (category === 'Men' && p.gender === 'Men') ||
        (category !== 'Women' && category !== 'Men' && p.category === category);
      const matchesBrand = brand === 'All Brands' || p.brand === brand;
      return matchesSearch && matchesCategory && matchesBrand;
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Rating') return b.rating - a.rating;
      return a.id - b.id;
    });

  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="section-title fw-bold mb-1">Shop All Clothing</h1>
          <div className="divider"></div>
          <p className="section-subtitle">Find your next favorite piece</p>
        </div>

        <Card className="shop-controls-card border rounded-3 p-3 mb-4">
          <Row className="g-3 align-items-end">
            <Col lg={4} md={6} xs={12}>
              <Form.Label className="shop-controls-label text-uppercase fw-semibold d-block mb-1">Search</Form.Label>
              <Form.Control type="text" placeholder="Search by name or brand..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </Col>
            <Col lg={2} md={6} xs={6}>
              <Form.Label className="shop-controls-label text-uppercase fw-semibold d-block mb-1">Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="All">All</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Dresses">Dresses</option>
                <option value="Tops">Tops</option>
                <option value="Trousers">Trousers</option>
                <option value="Jackets">Jackets</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={6} xs={6}>
              <Form.Label className="shop-controls-label text-uppercase fw-semibold d-block mb-1">Brand</Form.Label>
              <Form.Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="All Brands">All Brands</option>
                <option value="NILE & THREAD">NILE & THREAD</option>
                <option value="LAYALI">LAYALI</option>
                <option value="CAIROA">CAIROA</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={6} xs={12}>
              <Form.Label className="shop-controls-label text-uppercase fw-semibold d-block mb-1">Sort By</Form.Label>
              <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="Default">Default</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Rating">Rating</option>
              </Form.Select>
            </Col>
          </Row>
        </Card>

        <p className="shop-results-count mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>

        {filteredProducts.length === 0 ? (
          <div className="no-results text-center py-5">
            <SearchX size={48} className="no-results-icon mb-3" />
            <p className="fs-5">Sorry, no products match your search.</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Shop;
