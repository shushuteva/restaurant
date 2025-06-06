import React, { useState } from 'react'
import { mockRestaurants } from '../data/mockRestaurants'

export default function RestaurantSearch(){
    const [filter, setFilter] = useState('')
    const filtered = mockRestaurants.filter(r =>
        !filter || r.cuisine === filter
    );

    return (
        <div>
            <h2>Търсене на ресторанти</h2>
            <select onChange={(e) => setFilter(e.target.value) }>
                <option value="">Всички</option>
                <option value="Българска кухня">Българска кухня</option>
                <option value="Китайска кухня">Китайска кухня</option>
                <option value="Италианска кухня">Италианска кухня</option>
            </select>

            <ul>
                {filtered.map((r, idx)=>(
                    <li key={idx} >{r.name} - {r.cuisine}</li>
                )
                )}
            </ul>
        </div>
    )
}