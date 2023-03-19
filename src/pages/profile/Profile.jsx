import React, { useContext } from 'react'
import "./profile.scss"
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from '../../components/rightbar/Rightbar';
import { AuthContext } from '../../context/AuthContext';
import UsersPost from '../../components/usersPost/UsersPost';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='profile'>
      <Navbar/>
      <div className="profileWrapper">
        <Sidebar />
        <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img
                src="https://i.pinimg.com/originals/66/44/b3/6644b34c91f57f8d40a4eaa94e3cb797.png"
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
            <span className="profileInfoDesc">Bienvenidos!!!!</span>
            </div>
        </div>
        <div className="profileRightBottom">
               <UsersPost/>
                <Rightbar profile/>
            </div>
           
        </div>
        </div>
    </div>
  )
}

export default Profile
