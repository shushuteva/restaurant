import logo from './logo.png';
import React ,{useState, useEffect} from 'react';
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Cart from './components/Cart'
import OrderTracking from './components/OrderTracking'
import Feedback from './components/Feedback'
import RestaurantReviews from './components/RestaurantReviews';
import RestaurantMenu from './components/RestaurantMenu';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import RestaurantList from './components/RestaurantList';




function App() {

  const [user, setUser] = useState(null);

  

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);



  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    //navigate('/')
  };

  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <div>
      <Router>
      <div className="navbar navbar-expand-lg navbar-light bg-info">
      <a className="navbar-brand m-2" href="#">
        <img src={logo} alt="logo" srcset="" width="48" height="48" />
      </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className='nav-item'>
            <Link className='nav-link' to="/">Начало</Link>
          </li>
          {!user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/register">Регистрация</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Вход</Link></li>
            </>
          )}
          <li>
            <Link className='nav-link' to="/restaurants">Ресторанти</Link>
          </li>
          <li>
            <Link className='nav-link' to="/cart">Кошница</Link>
          </li>     
          {user && (
          <>
            <li className="nav-item"><Link className="nav-link" to="/tracking">Проследяване</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/feedback">Обратна връзка</Link></li>
            <li className="nav-item"><Link className="btn btn-link nav-link" to='/' onClick={logout}>Изход</Link></li>
          </>
        )}
        </ul>
      </div>

        
      <div className='container bg-light p-5 mx-auto m-5 rounded'>
        <h1 className='text-center text-dark'>Платформа за доставка на храна</h1>
        <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm setUser={setUser}/>} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/restaurants/:id/menu" element={<RestaurantMenu />} />
            <Route path="/restaurants/:id/reviews" element={<RestaurantReviews />} />
        </Routes>
      </div>
        
        
        </Router>
      </div>
    


  );
}

export default App;
