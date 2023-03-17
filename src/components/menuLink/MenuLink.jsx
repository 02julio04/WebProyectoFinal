
import React from 'react'
import "./menuLink.scss"
const menuLink = ({ Icon, text }) => {
  return (
    <div className='menuLink'>
         {Icon}
         <span className="menuLinkText">{text}</span>
         <span className="menuLinkTextName">
         {text === "Logout" && "(Julio)"}
         </span>
    </div>
  )
}

export default menuLink
