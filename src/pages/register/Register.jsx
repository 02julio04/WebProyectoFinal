import { DriveFolderUploadOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import "./register.scss"
import { auth, db, storage } from '../../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


const Register = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();



  const handleRegister = async (e) =>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, "usersImages/" + displayName);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

             await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            setDoc(doc(db, 'usersPosts', res.user.uid), { messages: [] });
            // console.log(res.user);
          });
        }
      );
    
    }catch(error){
      setError(true);
    }
    navigate("/login");
  
  };

  return (
    <div className="register">
     <div className="registerWrapper">
     <div className="registerLeft">
     <div className="loginLogo"><img 
                    src = 'https://i.pinimg.com/originals/52/b4/9a/52b49ab47ba026d0e01eb3346c0e029a.png'
                    alt = ""
                /></div>
        </div>
        <div className="registerRight">
        <div className="registerBox">
        <div className="top">
              <img
                src={
                  img? URL.createObjectURL(img)
                    : "/assets/profileCover/DefaultProfile.jpg"
                }
                alt=""
                className="profileImg"
              />
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    style={{ display: "none" }}
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="bottom">
            <form onSubmit={handleRegister} className="bottomBox">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  className="registerInput"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="registerInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="registerInput"
                  minLength={6}
                  required
                />
                {/*<input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPasword"
                  className="registerInput"
                  required
              />*/}
                <button type="submit" className="registerButton">
                  Registrarse
                </button>
                <Link to="/login">
                  <button className="loginRegisterButton">
                    Iniciar sesion
                  </button>
                  </Link>
                  {error && <span>HAY UN FALLOOOO</span>}
              </form>
            </div>
        </div>
        </div>
     </div>
    </div>
  )
}

export default Register
