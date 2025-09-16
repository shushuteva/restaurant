import React, { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { addToCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";
import * as dishService from '../services/dishService';

export default function RestaurantMenu(){
    const { id } = useParams();
    const [dishes, setDishes] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
          const fetchData = async () => {
              try {
                const [res1, res2] = await Promise.all([
                  fetch(`http://localhost:3001/restaurants/${id}/menu`).then(res => res.json()),
                  dishService.fetchDishes().then(res => res),
                ]);
        
                const combinedData = [...res1, ...res2];
        
                setDishes(combinedData);
        
              } catch (error) {
                console.error('Error fetching dishes:', error);
              }
            }

            fetchData();
    }, [id]);

    const handleAdd = (dish) => {
        const user = localStorage.getItem('user')
        if (user == null) {
            alert('Трябва да влезнеш в профила си, за да поръчаш!')
            navigate('/login')
            return
        }
        addToCart(dish);
        localStorage.setItem('restaurantId', id)
        alert(`${dish.name} е добавено в кошницата.`);
    };

    return (
    <div>
      <h2>Меню</h2>
      <div className="row">
        {dishes.map(d => (
          <div className="col-md-4 mb-3" key={d.id}>
            <div className="card">
              <img src={d.image} className="card-img-top" alt={d.name} />
              <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                <p className="card-text">{d.price.toFixed(2)} лв</p>
                <button className="btn btn-success w-100" onClick={() => handleAdd(d)}>Добави в кошницата</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}