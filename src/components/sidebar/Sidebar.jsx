import React, { useContext } from 'react'
import "./sidebar.scss"
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventIcon from "@mui/icons-material/Event";
import Brightness4 from '@mui/icons-material/Brightness4';
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined';
import MenuLink from "../menuLink/MenuLink";
import Friends from '../friends/Friends';
import { Users } from "../../data";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/AuthContext';


const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
        <div className="Top">
        <img src={currentUser.photoURL} alt="" className="shareProfileImg"/>
        <span>{"Bienvenido " + currentUser.displayName}</span>
        </div>
        <MenuLink Icon={<ChatIcon />} text="Chats" />
        <MenuLink Icon={<VideocamIcon />} text="Videos" />
        <MenuLink Icon={<GroupsIcon />} text="Amigos" />
        <MenuLink Icon={<BookmarkIcon />} text="Coleccion" />
        <MenuLink Icon={<ShoppingCartIcon />} text="Marketplace" />
        <MenuLink Icon={<EventIcon />} text="Eventos" />
        <span onClick={() => dispatch({ type: "TOGGLE" })}>
        <MenuLink Icon={<Brightness4 />} text="Temas" />
        </span>
        <span onClick={() => signOut(auth)}>
        <MenuLink Icon={<ExitToAppOutlined />} text="Salir" />
        </span>
        
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
            {Users.map(u=>(
                <Friends key={u.id} user={u}/>
                
                ))}
            
        </ul>
        </div>
      
    </div>
  )
}

export default Sidebar
