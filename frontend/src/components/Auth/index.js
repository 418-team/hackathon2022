import React, { useState } from 'react';
import { auth } from '../../utils/api';
import { useHistory } from 'react-router-dom';
import Button from '../shared/Button/Button';


import './styles.css'
import Input from '../shared/Input/Input';
import Enter from './image/Enter';

const Auth = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const submit = () => {
        auth(email, password)
            .then(r => {
                console.log('auth', r);
                localStorage.setItem('refresh_token', r.data.refresh_token);
                localStorage.setItem('access_token', r.data.access_token);
                history.push('/');
            })
            .catch(err => {
                console.error('auth', err);
                setError(err.response?.data?.message || 'Произошла ошибка');
            });
    };

    return (
        <div className="auth_container">
            <div className={"form"}>
                <div className="auth_title">Вход в систему</div>
                {error && <b>{error}</b>}
                <Input type="text" mode={"secondary"} placeholder="Email" onChange={(e) => (setEmail(e.currentTarget.value))}/>
                <Input type="password" mode={"secondary"} placeholder="Пароль" onChange={(e) => (setPassword(e.currentTarget.value))}/>
                <div className='button_container'>
                <Button onClick={submit} mode={"primary"} label={"Войти"}></Button>
                <Button onClick={submit} mode={"secondary"} label={"Регистрация"}></Button>
    
                </div>
            </div>
        </div>
    );
};

export default Auth;