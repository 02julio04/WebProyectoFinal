import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./editProfile.scss"
import { v4 as uuid } from "uuid";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { AuthContext } from '../../context/AuthContext';
import { db, storage} from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [error, setError] = useState(false);
  const [img, setImg] = useState(null);
  const [data, setData] = useState({
    name: "",
    newEmail: "",
    phone: "",
    age: "",
    country: "",
    relationship: "",
    oldPassword: "",
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = async (e)=> {
    e.preventDefault();
    if(img){
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              displayName: data.name,
              email: data.newEmail,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", currentUser.uid), {
              uid: currentUser.uid,
              photoURL: downloadURL,
              displayName: data.name,
              email: data.newEmail,
              phone: data.phone,
              age: data.age,
              country: data.country,
              relationship: data.relationship,
              createdAt: serverTimestamp(),
            });
            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );
            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                //User reauthenticate
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
            
    }else{
      await updateProfile(currentUser, {
        displayName: data.name,
        email: data.newEmail,
      });

      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,

        displayName: data.name,
        email: data.newEmail,
        phone: data.phone,
        age: data.age,
        country: data.country,
        relationship: data.relationship,
        createdAt: serverTimestamp(),
      });

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );
      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          //User reauthenticate
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }
    navigate("/login");
  
  }
  return (
    <div className="editProfile">
      <Navbar/>
      <div className="editProfileWrapper">
        <Sidebar/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/profileCover/space1.png"
                alt=""
                className="profileCoverImg"
              />
              <img
                src={currentUser.photoURL}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.displayName}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>
          <div className="editprofileRightBottom">
            <div className="top">
            <h1>Editar Perfil</h1>
            </div>
            <div className="bottom">
            <div className="left">
              {/*si hay alguna imagen cogela , de lo contrario ponme la de por default*/}
                <img src={img
                      ? URL.createObjectURL(img)
                      : "/assets/profileCover/DefaultProfile.jpg"
                  } alt="" />
              </div>
              <div className="right">
                <form onSubmit={handleUpdate}>
                <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlined className="icon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])}/>
                  </div>
                  <div className="formInput">
                    <label>Nombre:</label>
                    <input type="text" name="name" placeholder="Jose Luis" onChange={handleChange}/>
                  </div>
                
                  <div className="formInput">
                    <label>Email:</label>
                    <input type="email"name="newEmail" placeholder="jose@gmail.com" onChange={handleChange}/>
                  </div>
                  <div className="formInput">
                    <label>Telefono:</label>
                    <input type="text" name="phone" placeholder="+1 809-456-2211"onChange={handleChange} />
                  </div>
                  <div className="formInput">
                    <label>Edad:</label>
                    <input
                     type="text"
                     placeholder="Digita tu edad"
                     name="age"
                     onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Ciudad:</label>
                    <input type="text" name="country" placeholder="USA" onChange={handleChange}/>
                  </div>
                  <div className="formInput">
                    <label>Estado:</label>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="Soltero / Casado"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Contraseña:</label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="******"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="updateButton">
                    Actualizar Perfil
                  </button>
                </form>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default EditProfile;
