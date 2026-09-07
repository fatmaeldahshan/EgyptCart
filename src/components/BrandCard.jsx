import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BrandCard = ({ brand, variant }) => {
  const navigate = useNavigate();
  const variantClass = `brand-card-${variant}`;
  const btnClass = variant === 'cream' ? 'outline-primary' : 'outline-light';

  return (
    <div className="brand-card">
      <div className={`brand-card-inner ${variantClass} p-4 d-flex flex-column align-items-center text-center h-100 gap-2`}>
        <h3 className="brand-card-name fs-4 fw-bold mb-0">{brand.name}</h3>
        <p className="brand-card-description mb-0">{brand.description}</p>
        <span className="brand-card-count text-uppercase">
          {brand.productCount} Products
        </span>
        <Button variant={btnClass} className="brand-card-btn mt-auto" onClick={() => navigate(`/shop?brand=${encodeURIComponent(brand.name)}`)}>
          Shop Brand
        </Button>
      </div>
    </div>
  );
};

export default BrandCard;
