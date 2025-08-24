import React, {useState} from 'react'


export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '', email:'' ,password:'' ,phone:''
    })

    const validate = () => {
        const nameRegex = /^[А-Я][а-я]+\s[А-Я][а-я]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
        /*const phoneRegex = /^(08|\+3598)[0-9]{7,8}$/;*/ const phoneRegex =/^(08[0-9]{8})|(\+3598[0-9]{7})$/

        if (!nameRegex.test(formData.name)) return "Името трябва да е на кирилица и с главни букви.";
        if (!emailRegex.test(formData.email)) return "Невалиден имейл.";
        if (!passwordRegex.test(formData.password)) return "Паролата трябва да съдържа малки, големи букви, цифри и символ.";
        if (!phoneRegex.test(formData.phone)) return "Невалиден телефонен номер.";

        return '';
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const error = validate();
        if (error) {
            alert(error);
        }
        else{
            fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(res => {
                if (res.ok) {
                    alert('Успешна регистрация!');
                } else {
                    alert('Грешка при регистрацията.');
                }
            })
            .catch(() => alert('Сървърна грешка.'));
                }
    }


    return(
        <div className="card mx-auto p-5" style={{width: '18rem'}}>
            <form onSubmit={handleSubmit} method='post'>
                <h2 className='card-title'>Регистрация</h2>
                <label>Име и фамилия:</label>
                <input placeholder="Име и Фамилия (на кирилица)"  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <label>Имейл:</label>
                <input placeholder="Имейл" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <label>Парола:</label>
                <input type="password" placeholder="Парола" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <label>Телефон:</label>
                <input placeholder="Телефон" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <button type="submit" className='btn btn-primary m-4' >Регистрирай се</button>
            </form>
        </div>
    )

}