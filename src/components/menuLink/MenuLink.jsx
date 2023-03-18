import React, { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import "./menuLink.scss"
const MenuLink = ({ Icon, text }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='MenuLink'>
         {Icon}
         <span className="MenuLinkText">{text}</span>
         <span className="MenuLinkTextName">
         {text === "Logout" && `->${currentUser.displayName}` }
         </span>
    </div>
  )
}

export default MenuLink
