import React from 'react';
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbarContainer'>
      <div className="navbarLeft">
        <Link to='/'style={{ textDecoration: "none" }}>
        <img src="https://i.pinimg.com/originals/52/b4/9a/52b49ab47ba026d0e01eb3346c0e029a.png"  className='logoImg' /><span className="logo">SPACE</span>
        </Link>
        </div>
      <div className="navbarCenter"><div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friends post or video"
            className="searchInput"
          />
        </div></div>
      <div className="navbarRight">
      <div className="navbarLinks">
      <Link to="/profile/userId" style={{ color: "white" }}>
      <HomeIcon fontSize = "large" className="navbarLinkIcono" />
      </Link>
      <SportsEsportsIcon fontSize='large' className="navbarLinkIcono"/>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonIcon />
            <span className="navbarIconBadge">2</span>
          </div>
          <div className="navbarIconItem">
            <ChatBubbleIcon />
            <span className="navbarIconBadge">10</span>
          </div>
          <div className="navbarIconItem">
            <NotificationsIcon />
            <span className="navbarIconBadge">8</span>
          </div>
        </div>
        <Link to="/profile/userId">
        <img src='/assets/person/user.jpg' alt='' className='navbarImg'/>
        </Link>
      </div>
     
    </div>
  )
}

export default Navbar
