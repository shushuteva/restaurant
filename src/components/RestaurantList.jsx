import React, { useEffect, useState} from 'react'
import { mockRestaurants } from "../data/mockRestaurants";
import { Link } from 'react-router-dom';

export default function RestaurantList(){

    const [restaurants, setRestaurants] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filters, setFilters] = useState({
        cuisine: '',
        freeDelivery: false,
        discount: false,
        sortBy: ''
    });


    useEffect(() => {
        fetch('http://localhost:3001/restaurants')
        .then(res => res.json())
        .then(data => {
        setRestaurants(data);
        setFiltered(data);
      });
    }, [])

    const applyFilters = () => {
        let result = [...restaurants];

        if (filters.cuisine) {
        result = result.filter(r => r.cuisine === filters.cuisine);
        }
        if (filters.freeDelivery) {
        result = result.filter(r => r.freeDelivery);
        }
        if (filters.discount) {
        result = result.filter(r => r.discount);
        }
        if (filters.sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
        }

        setFiltered(result);
    };

  useEffect(() => {
    applyFilters();
  }, [filters]);


   return (
    <div>
      <h2>Ресторанти</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select" onChange={e => setFilters(f => ({ ...f, cuisine: e.target.value }))}>
            <option value="">Кухня</option>
            <option value="Българска кухня">Българска кухня</option>
            <option value="Италианска кухня">Италианска кухня</option>
            <option value="Китайска кухня">Китайска кухня</option>
          </select>
        </div>
        <div className="col-md-2">
          <div className="form-check">
            <input className="form-check-input" type="checkbox"
              onChange={e => setFilters(f => ({ ...f, freeDelivery: e.target.checked }))} />
            <label className="form-check-label">Безплатна доставка</label>
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-check">
            <input className="form-check-input" type="checkbox"
              onChange={e => setFilters(f => ({ ...f, discount: e.target.checked }))} />
            <label className="form-check-label">Отстъпки</label>
          </div>
        </div>
        <div className="col-md-3">
          <select className="form-select" onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}>
            <option value="">Сортирай</option>
            <option value="rating">По оценка</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map(r => (
          <div className="col-md-4 mb-4" key={r.id}>
            <div className="card">
              <img src={r.image} className="card-img-top" alt={r.name} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5>{r.name}</h5>
                <p>{r.cuisine} • {r.location}</p>
                <p>🕒 {r.deliveryTime} • ⭐ {r.rating}</p>
                {r.freeDelivery && <span className="badge bg-success me-1">Безплатна доставка</span>}
                {r.discount && <span className="badge bg-warning text-dark">Отстъпка</span>}
                <Link to={`/restaurants/${r.id}/menu`} className="btn btn-primary w-100 mt-2">
                    Виж меню
                </Link>
                <Link to={`/restaurants/${r.id}/reviews`} className='btn btn-success w-100 mt-2'>
                    Виж отзиви
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}