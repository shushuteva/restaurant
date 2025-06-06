import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart } from '../utils/cart';



function Cart() {
  // Simulated cart items
  const [cartItems, setCartItems] = useState(getCart());
  const [payment, setPayment] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  

  const navigate = useNavigate()

  const placeOrder = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    
    if (user == null) {
      alert('Трябва да влезнеш в профила си, за да поръчаш!')
      navigate('/login')
      return
    }
    if(total == 0){
      alert('Моля, изберете какво ще поръчате!')
      return
    }

    if (!payment) {
      alert('Моля изберете метод на плащане.');
      return;
    }
    const restaurantId = JSON.parse(localStorage.getItem('restaurantId'))
    const order = {
      userId: user.id,
      restaurantId: restaurantId,
      items: cartItems,
      total,
      paymentMethod: payment,
      status: 'pending'
    };

    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
      .then(() => {
        setOrderPlaced(true);
        clearCart();
        setCartItems([]);
        navigate('/')
      });
  };

  return (
    <div>
      <h2>Кошница</h2>

      <ul className="list-group mb-3">
        {cartItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{item.name}</span>
            <span>{item.price.toFixed(2)} лв</span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between fw-bold">
          Общо: <span>{total} лв</span>
        </li>
      </ul>

      <h5>Метод на плащане</h5>
      <select className="form-select mb-3" onChange={(e) => setPayment(e.target.value)}>
        <option value="">Избери</option>
        <option value="borica">Борика</option>
        <option value="paypal">PayPal</option>
      </select>

      <button className="btn btn-success" onClick={placeOrder}>Завърши поръчката</button>

      {orderPlaced && (
        <div className="alert alert-success mt-3">
          Поръчката е приета! Може да проследите доставката.
        </div>
      )}
    </div>
  );
}

export default Cart;
