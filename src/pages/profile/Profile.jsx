import React from 'react'
import "./profile.scss"
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed"
import Rightbar from '../../components/rightbar/Rightbar';
const Profile = () => {
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
                src="/assets/person/user.jpg"
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
            <h4 className="profileInfoName">Julio</h4>
            <span className="profileInfoDesc">Hi Friends!</span>
            </div>
        </div>
        <div className="profileRightBottom">
                <Feed/>
                <Rightbar profile/>
            </div>
           
        </div>
        </div>
    </div>
  )
}

export default Profile
