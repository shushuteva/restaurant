import React, {useState} from 'react'
import { redirect, useNavigate } from 'react-router-dom';

export default function LoginForm({ setUser }){
    /*const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        if (email && password) {
            alert('Успешен вход!')
        }else{
            alert('Моля, въведете имейл и парола')
        }
    }*/
   const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();

        if (!form.email || !form.password) {
        setMessage('Моля въведете имейл и парола.');
        return;
        }

        fetch(`http://localhost:3001/users?email=${encodeURIComponent(form.email)}&password=${encodeURIComponent(form.password)}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                setMessage(`Добре дошъл, ${data[0].name}!`);
                localStorage.setItem('user', JSON.stringify(data[0]));
                setUser(data[0]);
                navigate('/')
            } else {
                setMessage('Невалиден имейл или парола.');
            }
        })
        .catch(() => setMessage('Грешка при връзката със сървъра.'));
    };


    return(
        <div className='card mx-auto p-5' style={{width: "18rem", background: "transparent", boxShadow: "none", border: "none"}}>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} action="post">
                <h2 className='card-title'>Вход</h2>
                <label>Имейл</label>
                <input placeholder="Имейл" name='email' onChange={handleChange} />
                <label>Парола</label>
                <input type="password" name='password' placeholder="Парола" onChange={handleChange} />
                <button type="submit" className='btn btn-success m-5'>Вход</button>
            </form>
        </div>
    )
}