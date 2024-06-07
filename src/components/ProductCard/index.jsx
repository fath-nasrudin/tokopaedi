import PropTypes from 'prop-types';
import './ProductCard.styles.css';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const { id, title, image, price, rating } = props.product;
  return(
    <Link to={`/product/${id}`}>
      <div className="card card__primary-action">
        <div 
          style={{backgroundImage: `url(${image})`}} className="card__media">
        </div>
        <div className="card__content">
          <h6 className="text-overflow-hidden--2">{title}</h6>
          <p className="fw-700 fs-500">Rp{(price * 15000).toLocaleString('id-ID')}</p>
          <p>rate {rating.rate} | {rating.count} sold</p>
        </div>
      </div>
    </Link>
  )
} 

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }),
  })
}

export default ProductCard;