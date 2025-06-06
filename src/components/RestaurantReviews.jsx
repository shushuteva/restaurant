import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RestaurantReviews(){
    const { id } = useParams(); // restaurantId
    const [feedback, setFeedback] = useState([]);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
    // Fetch restaurant info
    fetch(`http://localhost:3001/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data));
    }, [id]);

    useEffect(() => {
    // Fetch feedback for this restaurant
    fetch(`http://localhost:3001/feedback?restaurantId=${id}&_sort=date&_order=desc`)
        .then(res => res.json())
        .then(data => setFeedback(data));
    }, [id]);

    const averageRating = feedback.length
        ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
        : null;



    return (
    <div>
      <h2>
        Отзиви за {restaurant?.name || 'ресторанта'}
        {averageRating && (
            <span className="ms-3 badge bg-warning text-dark">
            ⭐ {averageRating} / 5
            </span>
        )}
        </h2>


      {feedback.length === 0 && <p>Няма оставени отзиви.</p>}

      {feedback.map((f, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Оценка: {f.rating} ⭐</h5>
            <p className="card-text">{f.comment}</p>
            <small className="text-muted">Дата: {new Date(f.date).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
}