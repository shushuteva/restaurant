import React, {useState, useEffect} from "react";

export default function OrderTracking(){
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(null)

    const user = JSON.parse(localStorage.getItem('user'))
    
    useEffect(() => {
        if (user) { // Start loading
            fetch(`http://localhost:3001/orders?userId=${user.id}&_sort=id&_order=desc&_limit=1`)
            .then(res => res.json())
            .then(data => {
                setOrder(data[0]);  // First (and only) result
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setOrder(null);
            });
        }
    }, [user]);

    if (!user) return <div>Моля, влезте в акаунта си, за да следите поръчки.</div>;
    if (loading) return <div>Зареждане на поръчката...</div>;
    if (!order) return <div>Нямате активна поръчка.</div>;

    return(
        <div>
        <h2>Проследяване на поръчка</h2>
        <p><strong>Статус:</strong> {(order.status == 'pending')? 'Обработва се': 'На път към вас'}</p>
        <p><strong>Очаквано време:</strong> {order.eta || '20 минути'}</p>
        <p><strong>Поръчани ястия:</strong></p>
        {order.items.map( i => (
            <p>{i.name} - {i.price} лв.</p>
        ))}
        <p><strong>Сума за плащане:</strong> {order.total} лв.</p>
        <div style={{
            height: '300px',
            backgroundColor: '#eaeaea',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontStyle: 'italic'
        }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5869.248026759608!2d23.373142497163457!3d42.64813015668224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa869826d8a30d%3A0x26f9d9722c40c216!2z0J_RgNC4INCT0LDQstCw0LfQsA!5e0!3m2!1sbg!2sbg!4v1747837983278!5m2!1sbg!2sbg" width="1200" height="300" style={{border:0}} loading="lazy"></iframe>
        </div>
        </div>
    )
}