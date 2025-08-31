import React, {useState, useEffect} from "react";
import GPS from "./GPS";

export default function OrderTracking(){
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(null)

    const user = JSON.parse(localStorage.getItem('user'))
    
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/orders?userId=${user.id}&_sort=id&_order=desc&_limit=1`)
            .then(res => res.json())
            .then(data => {
                setOrder(data[0]);  
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setOrder(null);
            });
        }
    }, [user]);

    //if (!user) return <div>Моля, влезте в акаунта си, за да следите поръчки.</div>;
    if (loading) return <div>Зареждане на поръчката...</div>;
    //if (!order) return <div>Нямате активна поръчка.</div>;

    return(
        <div>
        <h2>Проследяване на поръчка</h2>
        <p><strong>Статус:</strong> {(order !== null && order.status === 'pending')? 'Обработва се': 'На път към вас'}</p>
        <p><strong>Очаквано време:</strong> {(order !== null && order.eta) || '20 минути'}</p>
        <p><strong>Поръчани ястия:</strong></p>
        {order !== null && order.items.map( i => (
            <p>{i.name} - {i.price} лв.</p>
        ))}
        <p><strong>Сума за плащане:</strong> {order !== null && order.total} лв.</p>
        <div style={{
            height: '300px',
            backgroundColor: '#eaeaea',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontStyle: 'italic'
        }}>
            <GPS/>
        </div>
        </div>
    )
}