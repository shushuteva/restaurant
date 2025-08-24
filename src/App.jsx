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
import board from './wooden_board.png'
import RestaurantList from './components/RestaurantList';


const footerFontLink = "https://fonts.googleapis.com/css2?family=Marck+Script&display=swap";

function getRandomPhone() {
  const prefix = '+359 8';
  const rest = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}${rest}`;
}

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = footerFontLink;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const [phone] = useState(getRandomPhone());

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
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '180px' }}>
      
      <Router future={{ v7_startTransition: true }}>
      
      <div
  className="navbar navbar-expand-lg"
  style={{
    background: 'linear-gradient(to bottom, #000 10%, #8B5C2A 80%)',
    color: '#fff',
    fontFamily: "'Marck Script', cursive",
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80px'
  }}
>
  <a className="navbar-brand m-2" href="#" style={{ color: '#fff', position: 'absolute', left: 0 }}>
    <img src={logo} alt="logo" width="48" height="48" />
  </a>
  <ul
    className="navbar-nav"
    style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      margin: 0,
      padding: 0,
      listStyle: 'none',
    }}
  >
  <li className='nav-item'>
    <Link
      className='nav-link'
      style={{
        color: '#fff',
        fontFamily: "'Marck Script', cursive",
        fontSize: '1.35rem',
        letterSpacing: '1px',
        padding: '0.5rem 1rem'
      }}
      to="/"
    >
      Начало
    </Link>
  </li>
  {!user && (
    <>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={{
            color: '#fff',
            fontFamily: "'Marck Script', cursive",
            fontSize: '1.35rem',
            letterSpacing: '1px',
            padding: '0.5rem 1rem'
          }}
          to="/register"
        >
          Регистрация
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={{
            color: '#fff',
            fontFamily: "'Marck Script', cursive",
            fontSize: '1.35rem',
            letterSpacing: '1px',
            padding: '0.5rem 1rem'
          }}
          to="/login"
        >
          Вход
        </Link>
      </li>
    </>
  )}
  <li>
    <Link
      className='nav-link'
      style={{
        color: '#fff',
        fontFamily: "'Marck Script', cursive",
        fontSize: '1.35rem',
        letterSpacing: '1px',
        padding: '0.5rem 1rem'
      }}
      to="/restaurants"
    >
      Ресторанти
    </Link>
  </li>
  <li>
    <Link
      className='nav-link'
      style={{
        color: '#fff',
        fontFamily: "'Marck Script', cursive",
        fontSize: '1.35rem',
        letterSpacing: '1px',
        padding: '0.5rem 1rem'
      }}
      to="/cart"
    >
      Кошница
    </Link>
  </li>
  {user && (
    <>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={{
            color: '#fff',
            fontFamily: "'Marck Script', cursive",
            fontSize: '1.35rem',
            letterSpacing: '1px',
            padding: '0.5rem 1rem'
          }}
          to="/tracking"
        >
          Проследяване
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={{
            color: '#fff',
            fontFamily: "'Marck Script', cursive",
            fontSize: '1.35rem',
            letterSpacing: '1px',
            padding: '0.5rem 1rem'
          }}
          to="/feedback"
        >
          Обратна връзка
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="btn btn-link nav-link"
          style={{
            color: '#fff',
            fontFamily: "'Marck Script', cursive",
            fontSize: '1.35rem',
            letterSpacing: '1px',
            padding: '0.5rem 1rem'
          }}
          to='/'
          onClick={logout}
        >
          Изход
        </Link>
      </li>
    </>
  )}
</ul>
</div>

        
      <div
  className="container d-flex justify-content-center align-items-center mx-auto mt-5 mb-0"
  style={{
    minHeight: 250,
    position: 'relative',
    background: 'none',
    marginBottom: '-120px',
    zIndex: 0,
  }}
>
  <div
    style={{
      display: 'inline-block',
      borderRadius: '32px',
      padding: '1.5rem 2.5rem',
      background: 'radial-gradient(circle, #8B5C2A 60%, #4B2E05 100%, #000 120%)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      border: '3px solid #4B2E05',
      minWidth: '320px',
      maxWidth: '90vw',
      textAlign: 'center'
    }}
  >
    <h1
      className="text-center"
      style={{
        color: '#f5ede6',
        fontFamily: "'Marck Script', cursive",
        fontSize: '2.2rem',
        textShadow: '2px 2px 8px #4B2E05, 0 0 2px #000',
        margin: 0,
        wordBreak: 'break-word'
      }}
    >  Платформа за доставка на храна

    </h1>
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
      
</div>
        
        
        </Router>
        {/* Footer */}
     <footer
      className="w-100"
      style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      minHeight: '120px',
      background: 'linear-gradient(to top, #000 10%, #8B5C2A 80%)',
      color: '#fff',
  }}
      >
        <div className="container py-3">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-12 col-md-4 mb-2 mb-md-0">
              <span
                style={{
                  fontFamily: "'Marck Script', cursive",
                  fontSize: '2rem',
                  letterSpacing: '2px',
                  color: '#fff',
                  textShadow: '1px 1px 4px #000',
                }}
              >
                Manja do vrata
              </span>
            </div>
            <div className="col-12 col-md-4 mb-2 mb-md-0 d-flex justify-content-center">
              <span style={{ fontSize: '1.2rem' }}>{phone}</span>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white">
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white">
                <svg width="32" height="32" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1S388.6 9.7 353.3 8c-35.3-1.7-141.3-1.7-176.6 0-35.3 1.7-66.7 9.9-92.1 36.2S9.7 123.4 8 158.7c-1.7 35.3-1.7 141.3 0 176.6 1.7 35.3 9.9 66.7 36.2 92.1s56.8 34.5 92.1 36.2c35.3 1.7 141.3 1.7 176.6 0 35.3-1.7 66.7-9.9 92.1-36.2s34.5-56.8 36.2-92.1c1.7-35.3 1.7-141.3 0-176.6zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center mt-2" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} Manja do vrata. Всички права запазени.
            </div>
          </div>
        </div>
      </footer>
      </div>
  );
}

export default App;
