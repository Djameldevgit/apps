import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
 

const Login = () => {
    

    const initialState = { email: '', password: '' };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;

    const [typePass, setTypePass] = useState(false);

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (auth.token) history.push('/');
    }, [auth.token, history]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userData));
    };

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">
                Connexion Apps
                </h3>

                {/* 📧 Input de Email */}
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        onChange={handleChangeInput}
                        value={email}
                        autoComplete="username" // Agregado aquí
                    />
                    
                </div>

                {/* 🔒 Input de Contraseña */}
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <div className="pass">
                        <input
                            type={typePass ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={handleChangeInput}
                            value={password}
                            autoComplete="current-password" // Agregado aquí
                        />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'maque': "voire"}
                        </small>
                    </div>
                </div>

                {/* 🔘 Botón de Login */}
                <button type="submit" className="btn btn-dark w-100" disabled={!email || !password}>
                Connecter
                </button>

                {/* 📝 Link para Registro */}
                <p className="my-2">
                Vous n'avez pas de compte
                    <Link to="/register" style={{ color: 'crimson' }}>
                    Inscrivez-vous maintenant
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;