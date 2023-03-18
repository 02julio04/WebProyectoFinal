import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.scss"
import { auth } from '../../firebase';


const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    
    }catch(error){
      setError(true);
    }
  
  }


  return (
    <div className="login">
      <div className="loginWrapper">
      <div className="loginLeft">
          <div className="loginLogo"><img 
                    src = 'https://i.pinimg.com/originals/52/b4/9a/52b49ab47ba026d0e01eb3346c0e029a.png'
                    alt = ""
                /></div>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="bottom">
              <form onSubmit={handleLogin} className="bottomBox">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="loginInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="loginInput"
                  minLength={6}
                  required
                />

                <button type="submit" className="loginButton">
                  Iniciar sesion 
                </button>
                <Link to="/register">
                  <button className="loginRegisterButton">
                    Crear nueva cuenta
                  </button>
                  </Link>
                  {error && <span>Hubo algo Mal</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
