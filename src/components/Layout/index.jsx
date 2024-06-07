import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./style.css"

function Layout() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // fetch products
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>{
              if (res.status >= 400) {
                throw new Error('Server Error');
              }
              return res.json()
            })
            .then(data => {
              setProducts(data)
              console.log(data)
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
  }, [])

  const errorComponent = (<p>A network error was encountered</p>);
  const loadingComponent = (<p>Loading...</p>);
  const totalProductsInCart = Object.keys(cart).length;

  const handleToggleCart = () => {
    setIsOpen(o => !o);
  }

  return (
      <div className="layout">
        <Header>
        <Link to="/"><div className="fs-800 fw-700">Tokopaedi</div></Link>
        
          <button className="cart-icon align-center" onClick={handleToggleCart}>
            Cart
            {totalProductsInCart > 0 && (
            <div className="cart-icon__number">{totalProductsInCart}</div>
          )}
          </button>

      </Header>
      {
        loading ? loadingComponent :
        error ? errorComponent :
        <Outlet context={{products, cart, isOpen, setCart}} />
      }
    </div>
  )
}

export default Layout
