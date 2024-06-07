import { useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import './style.css';
import Cart from '../../components/Cart'

function ProductDetail() {
  const { id } = useParams();
  const [totalItem, setTotalItem] = useState(0);
  const {products, isOpen, cart, setCart} = useOutletContext();

  const handleItemIncrement = () => setTotalItem(prev => prev + 1);
  const handleItemDecrement = () => {
    if (totalItem > 0) {
      setTotalItem(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (totalItem > 0) {
      const newCart = structuredClone(cart);
      if (newCart[id] === undefined) newCart[id] = {
        productId: id,
        totalItem: 0}
      newCart[id].totalItem += totalItem;
      setCart(newCart)
    }
  }

  // usually we should take the data from the server, but in this case, the data is same, so we just take from the state.
  const product = products.find(product => product.id === Number(id));
  const {image, title, description, price, rating} = product;
  return (
    <>
      <div style={{
        display: 'grid', 
        width: '100%',
        justifyContent: 'center',
        alignContent: 'start',
        minHeight: '80vh',
        paddingBlock: '32px',
        }}>
        <div className="product-detail">
        <div 
          style={{backgroundImage: `url(${image})`}} className="product-detail__media">
        </div>

        <div className="product-detail__content">
          <div className="product-detail__header">
            <h6 className="fw-700">{title}</h6>
            <p className="fw-700 fs-500">Rp{(price * 15000).toLocaleString('id-ID')}</p>
            <p>rate {rating.rate} | {rating.count} sold</p>
          </div>

          <p className="text-neutral-500">{description}</p>

          <div className="product-detail__actions">
            <button className="btn btn--primary" onClick={handleAddToCart}>Add to Cart</button>

            <div className="total-item-controller">
              <button onClick={handleItemDecrement} className="btn btn--primary-outlined btn--square">-</button>
              <input type="phone" value={totalItem} onChange={(e) => (setTotalItem(e.target.value))}/>
              <button onClick={handleItemIncrement} className="btn btn--primary-outlined btn--square">+</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      {isOpen && (
        <div style={{
            // height: "100vh",
            // width: '300px',
            position: 'fixed',
            right: '16px',
            top: '100px',
            zIndex: 2,
            backgroundColor: 'white',
          }}>
            <Cart />
        </div>
      )}
          
    </>
  )
}

export default ProductDetail;