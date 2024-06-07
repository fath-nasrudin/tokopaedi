import { useOutletContext } from "react-router-dom";
import './style.css';

function Cart() {
  const {cart, setCart, products} = useOutletContext();

  const findProductById = (id) => {
    return products.find(product => product.id === Number(id));
  }

  const handleItemIncrement = (e) => {
    const cartItem = e.target.closest('.cart-item');
    if (cartItem) {
      const { id } = cartItem.dataset;
      const newCart = structuredClone(cart);
      
      newCart[id].totalItem += 1;
      setCart(newCart);
    }
  };

  const handleItemDecrement = (e) => {
    const cartItem = e.target.closest('.cart-item');
    if (cartItem) {
      const { id } = cartItem.dataset;
      const newCart = structuredClone(cart);
      
      if (newCart[id].totalItem > 0) {
        newCart[id].totalItem -= 1;
        setCart(newCart);
      }
    }
  }

  const handleDeleteCartItem = (e) => {
    const cartItem = e.target.closest('.cart-item');
    if (cartItem) {
      const { id } = cartItem.dataset;
      let newCart = structuredClone(cart);
      
      if (newCart[id]) delete newCart[id]
      setCart(newCart);
    }
  }

  
  const totalItemsInCart = (() => {
    let totalCartItems = 0;
    for (const cartKey in cart) {
      totalCartItems += cart[cartKey].totalItem;
    }
    return totalCartItems;
  })()

  const totalProductsInCart = Object.keys(cart).length;

  const grandPrize = Object.entries(cart).reduce((prevValue, currentItem) => {
    currentItem = currentItem[1]
    const product = findProductById(currentItem.productId)
    // currentItem[0] is the product id

    console.log({product, currentItem, price: product.price})
    return prevValue += (Number(currentItem.totalItem) * Number(product.price) * 15000)
  }, 0)

  const cartItems = [];
  for (const cartKey in cart) {
    const product = findProductById(cart[cartKey].productId);

    const totalItem = cart[cartKey].totalItem;

    const {id, title, image, price} = product;

    const cartItem = (
    <div key={id} className="cart-item" data-id={id}>
      <div className="cart-item__image" style={{backgroundImage: `url(${image})`}}>
      </div>
      <div>
        <p className="text-overflow-hidden-1">{title}</p>
        <p className="fw-700">Rp{(price * 15000).toLocaleString('id-ID')}</p>
        
        <div className="total-item-controller">
          <button onClick={handleItemDecrement} className="btn btn--primary-outlined btn--square">-</button>
          <input type="phone" value={totalItem} onChange={() => (console.log('not yet impelemented'))}/>
          <button onClick={handleItemIncrement} className="btn btn--primary-outlined btn--square">+</button>
        </div>
        <button onClick={handleDeleteCartItem}>Delete</button>
      </div>
    </div>
    )
    cartItems.push(cartItem);
  }

  return (
    <div className="cart-container">
      <div >Cart</div>
      <div>{cartItems}
      </div>
      <div>Total Products: {totalProductsInCart}</div>
      <div>Total Item {totalItemsInCart}</div>
      <div>Final Price  {`Rp${grandPrize.toLocaleString('ID-id')}`}</div>
    </div>
  )
}

export default Cart;