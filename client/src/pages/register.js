import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'



const Register = () => {


    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = {
        username: '', email: '', password: '', cf_password: ''
    }
    const [userData, setUserData] = useState(initialState)
    const { username, email, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">
                    Enregistrer Apps
                </h3>

                <label htmlFor="email">Nom</label>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={handleChangeInput}
                        value={username.toLowerCase().replace(/ /g, '')}
                        style={{ background: alert.username ? '#fd2d6a14' : '' }}
                    />
                    <small className="form-text text-danger">
                        {alert.username || ''}
                    </small>
                </div>

                {/* 📧 Correo Electrónico */}
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleChangeInput}
                        value={email}
                        style={{ background: alert.email ? '#fd2d6a14' : '' }}
                    />
                    <small className="form-text text-danger">
                        {alert.email || ''}
                    </small>
                </div>

                {/* 🔒 Contraseña */}
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
                            style={{ background: alert.password ? '#fd2d6a14' : '' }}
                        />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'maque' : 'voir'}
                        </small>
                    </div>
                    <small className="form-text text-danger">
                        {alert.password || ''}
                    </small>
                </div>


                <div className="form-group">
                    <label htmlFor="cf_password">Confirmation</label>
                    <div className="pass">
                        <input
                            type={typeCfPass ? 'text' : 'password'}
                            className="form-control"
                            id="cf_password"
                            name="cf_password"
                            onChange={handleChangeInput}
                            value={cf_password}
                            style={{ background: alert.cf_password ? '#fd2d6a14' : '' }}
                        />
                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typePass ? 'maque' : 'voir'}     </small>
                    </div>
                    <small className="form-text text-danger">
                        {alert.cf_password || ''}
                    </small>
                </div>

                {/* 🔘 Botón de Registro */}
                <button type="submit" className="btn btn-dark w-100">
                    S'inscrire
                </button>

                {/* 🔁 Redirección a Login */}
                <p className="my-2">
                    j'ai déjà un compte
                    <Link to="/" style={{ color: 'crimson' }}>
                        Connectez maintenant
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register
