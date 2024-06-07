import PropTypes from 'prop-types';
import './style.css'
import ProductCard from '../ProductCard';

function CardGrid({products}) {
  return (
    <div className="cards-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
  )
}

CardGrid.propTypes = {
  products: PropTypes.array.isRequired,
};

export default CardGrid