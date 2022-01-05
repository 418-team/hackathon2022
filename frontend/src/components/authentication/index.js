import React from "react";
import "./style.css"

const authentication = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            <div className={"right-side"}>
                <Enter/>
            </div>
            <div className={"form"}>
                <div className="auth_title">Вход в систему</div>
                {error && <b>{error}</b>}
                <Input type="text" mode={"secondary"} placeholder="Email" onChange={(e) => (setEmail(e.currentTarget.value))}/>
                <Input type="password" mode={"secondary"} placeholder="Пароль" onChange={(e) => (setPassword(e.currentTarget.value))}/>
                <Button onClick={submit} mode={"primary"} label={"Войти"}>Авторизоваться</Button>
            </div>
        </div>
    );
};

export default authentication;