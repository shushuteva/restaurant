import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Feedback() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [lastOrder, setLastOrder] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [hasFeedback, setHasFeedback] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/orders?userId=${user.id}&status=delivered&_sort=id&_order=desc&_limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            setLastOrder(data[0]);
            console.log(lastOrder?.restaurantId);
          }
        });
    }
  }, [user]);

  useEffect(() => {
  if (lastOrder?.restaurantId) {
    fetch(`http://localhost:3001/restaurants/${lastOrder.restaurantId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRestaurant(data); 
      });
  }
}, [lastOrder]);

useEffect(() => {
  if (user && lastOrder?.restaurantId) {
    fetch(`http://localhost:3001/feedback?userId=${user.id}&restaurantId=${lastOrder.restaurantId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setHasFeedback(true);
        }
      });
  }
}, [user, lastOrder]);



  const validate = () => {
    if (comment.length < 3) return 'Коментарът трябва да е поне 3 букви.';
    if (/^[^а-яА-Яa-zA-Z]/.test(comment)) return 'Коментарът не може да започва със символ или цифра.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    if (!lastOrder?.restaurantId) {
      setError('Няма намерена последна поръчка към ресторант.');
      return;
    }

    fetch('http://localhost:3001/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id,
        restaurantId: lastOrder.restaurantId,
        rating,
        comment,
        date: new Date().toISOString()
      })
    }).then(() => {
      setSubmitted(true);
      setComment('');
      setRating(5);
      setError('');
      navigate('/');
    });
  };

  if (!user) return <div>Моля, влезте в акаунта си.</div>;
  if (!lastOrder) return <div>Нямате завършена поръчка, за която да оставите обратна връзка.</div>;

  return (
    <div>
      <h2>Обратна връзка за ресторанта</h2>
      {submitted && <div className="alert alert-success">Благодарим за оценката!</div>}
      {restaurant && <h3>{restaurant.name}</h3>}
      {hasFeedback && <div className="alert alert-info">
        Вече сте оставили отзив за този ресторант. Благодарим!
      </div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Оценка:</label>
          <select className="form-select" value={rating} disabled={hasFeedback} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label>Коментар:</label>
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={hasFeedback}
          />
          {error && <small className="text-danger">{error}</small>}
        </div>
        <button className="btn btn-primary" disabled={hasFeedback}>Изпрати</button>
      </form>
    </div>
  );
}


