import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="category-card d-flex flex-column h-100">
      <div className="category-card-img-wrapper">
        <img src={category.image} alt={category.name} className="category-card-img" loading="lazy" />
      </div>
      <div className="p-3 text-center d-flex flex-column align-items-center gap-2 flex-grow-1">
        <h3 className="category-card-title fs-6 fw-semibold mb-0">{category.name}</h3>
        <Button variant="primary" className="category-card-btn py-1 px-3" onClick={() => navigate(`/shop?category=${category.name}`)}>
          Shop
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
