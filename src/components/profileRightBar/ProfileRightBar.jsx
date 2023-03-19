import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import "./profileRightBar.scss"

const ProfileRightBar = () => {
  const [getUserInfo, setGetUserInfo] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getInfo = () => {
      const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setGetUserInfo(doc.data());
      });
      return () => {
        unSub();
      };
    };
    currentUser.uid && getInfo();
  }, [currentUser.uid]);

  return (
    <div className="profileRightBar">
        <div className="profileRightBarHeading">
        <span className="profileRightBarTitle"> Informacion de Usuario: </span>
        <Link to={`/profile/${currentUser.displayName}/edit`} style={{ textDecoration: "none" }}>
        <span className="editButton">Editar Perfil</span>
        </Link>
      </div>

      <div className="profileRightBarInfo">
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Email: </span>
          <span className="profileRightBarInfoValue">{getUserInfo.email ? getUserInfo.email : currentUser.email}</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Telefono: </span>
          <span className="profileRightBarInfoValue">{getUserInfo.phone}</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Edad: </span>
          <span className="profileRightBarInfoValue">
          {getUserInfo.age}
          </span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Country: </span>
          <span className="profileRightBarInfoValue">{getUserInfo.country}</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Status: </span>
          <span className="profileRightBarInfoValue">{getUserInfo.relationship}</span>
        </div>
      </div>
      <h4 className="profileRightBarTitle">Amigos Cercanos: </h4>
      <div className="profileRightBarFollowings">
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/Enmanuel Face.jpg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Enmanuel</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/friend6.jpg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Maria</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/Jeancarlos.jpg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Jeancarlos</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/friend4.jpg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Sophia</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/sebatianpicture.jpg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Sebastian</span>
        </div>
        <div className="profileRightBarFollowing">
          <img
            src="/assets/person/friend6.jpg"
            alt=""
            className="profileRightBarFollowingImg"
          />
          <span className="profileRightBarFollowingName">Kate</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileRightBar
