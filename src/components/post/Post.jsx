import { ChatBubbleOutline, Favorite, MoreVert, ShareOutlined, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import TimeAgo from "react-timeago";
import React from 'react'
import { Link } from 'react-router-dom'
import "./post.scss"
const Post = ({post}) => {
  return (
    <div className="post">
        <div className="postWrapper">
        <div className="postTop"> 
        <div className="postTopLeft">
        <Link to="/profile/userId">
        <img 
        src={post.data.photoURL} 
        alt="" 
        className="postProfileImg" 
        />
         </Link>
        <span className="postUsername">
        {post.data.displayName}
            </span>
            <span className="postDate">
            <TimeAgo date= 
            {new Date(post.data?.timestamp?.toDate()).toLocaleString()}/>
            
            </span>
        </div>
        <div className="postTopRight">
        <IconButton>
              <MoreVert className="postVertButton" />
            </IconButton>

        </div>
        </div>
        <div className="postCenter">
        <span className="postText">{post.data.input}</span>
          <img src={post.data.img} alt="" className="postImg" />
             </div>
        <div className="postBottom">
        <div className="postBottomLeft">
            <Favorite className="bottomLeftIcon" style={{ color: "red" }} />
            <ThumbUp className="bottomLeftIcon" style={{ color: "#011631" }}/>
            <span className="postLikeCounter">{}</span>
        </div>
        <div className="postBottomRight">
        <span className="postCommentText">{} · comments · share </span>
        </div>
             </div>
        </div>
        <hr className="footerHr" />
        <div className="postBottomFooter">
        <div className="postBottomFooterItem">
                <ThumbUpAltOutlined className="footerIcon" />
                <span className="footerText">Like</span>

            </div>
            <div className="postBottomFooterItem">
                <ChatBubbleOutline className="footerIcon" />
                <span className="footerText">Comentarios</span>

            </div>
            <div className="postBottomFooterItem">
                <ShareOutlined className="footerIcon" />
                <span className="footerText">Compartir</span>

            </div>
        </div>
    </div>
  )
}

export default Post
