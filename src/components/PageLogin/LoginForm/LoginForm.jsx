import style from './LoginForm.module.css';
import { useState } from 'react';

const LoginForm = ({login, register}) => {
    const NAMES = {
        email: 'loginEmail',
        password: 'loginPassword',
        registerEmail: 'registerEmail',
        registerPassword: 'registerPassword',
        registerPasswordConfirm: 'registerPasswordConfirm'
    }

    const [isLogin, setIsLogin] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    }

    const handleChanges = (e) => {
        if (e.target.name === NAMES.email) {
            setLoginEmail(e.target.value);
        } else if (e.target.name === NAMES.password) {
            setLoginPassword(e.target.value);
        } else if (e.target.name === NAMES.registerEmail) {
            setRegisterEmail(e.target.value);
        } else if (e.target.name === NAMES.registerPassword) {
            setRegisterPassword(e.target.value);
        } else if (e.target.name === NAMES.registerPasswordConfirm) {
            setRegisterPasswordConfirm(e.target.value);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login(loginEmail, loginPassword);
        // console.log(loginEmail, loginPassword)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        register(registerEmail, registerPassword, registerPasswordConfirm);
        // console.log(registerEmail, registerPassword, registerPasswordConfirm)
    }

    return (
        <div className={style.container}>
            <h1 className={style.h1}>Iniciar sesión</h1>
            <form onSubmit={handleLogin}>
                <div className={style.formContainer}>
                    <div>
                        <label htmlFor="email" className={style.lable}>Email</label>
                        <input
                            type="email"
                            name={NAMES.email}
                            id="email"
                            required 
                            onChange={handleChanges}
                            value={loginEmail}
                            className={style.input}
                        />
                    </div>
                    <div>
                    <label htmlFor="password" className={style.lable}>Password</label>
                        <input
                            type="password"
                            name={NAMES.password} 
                            id="password" 
                            required 
                            onChange={handleChanges}
                            value={loginPassword}
                            className={style.input}
                        />
                    </div>
                    <button disabled={
                        loginEmail.length === 0 || loginPassword.length === 0
                    } type="submit" className={style.btn}>Login</button>
                </div>
            </form>
            {/* <div>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="registerEmail" 
                            id="email" 
                            required
                            onChange={handleChanges}
                            value={registerEmail}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" 
                            name="registerPassword" 
                            id="password" 
                            required
                            onChange={handleChanges}
                            value={registerPassword}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" 
                            name="registerPasswordConfirm" 
                            id="passwordConfirm" 
                            required
                            onChange={handleChanges}
                            value={registerPasswordConfirm}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div> */}
        </div>
    );
}

export {LoginForm};