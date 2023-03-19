import React from 'react'
import Online from '../online/Online'
import "./rightbarhome.scss"
import { Usersonline } from "../../data";

const Rightbarhome = () => {
  return (
    <div className='rightbarhome'>
    <div className='widgets'>
    <iframe 
                className = "widget__scroll"
                title = "facebook-post"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnba&tabs=timeline&width=340&height=70&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="340" 
                height= "100%"
                
                style= {{ border: "none" , overflow: "hidden"  }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
            <iframe 
                className = "widget__scroll"
                title = "facebook-post"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKathyNoticias%3Flocale%3Des_LA&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340" 
                height= "70"
                
                style= {{ border: "none" , overflow: "hidden"  }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
            </div>
            <span className="rightbarTitle">Amigos en linea: </span>
            <ul className="rightbarFriendList">
                {Usersonline.map((u) => (
          <Online key={u.id} onlineuser={u} />
        ))}

            </ul>

    </div>
  )
}

export default Rightbarhome
