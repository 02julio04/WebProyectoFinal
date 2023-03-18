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
          <h3 className="loginLogo">Space</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
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
