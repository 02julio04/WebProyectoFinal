import { ChatBubbleOutline, Favorite, MoreVert, ShareOutlined, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    setDoc,
  } from "firebase/firestore";
import TimeAgo from "react-timeago";
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./post.scss"
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
const Post = ({post}) => {
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const unSub = onSnapshot(
          collection(db, "posts", post.id, "likes"),
          (snapshot) => setLikes(snapshot.docs)
        );
        return () => {
          unSub();
        };
      }, [post.id]);

      useEffect(() => {
        setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
      }, [likes, currentUser.uid]);

    const likePost = async () => {
        if (liked) {
          await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
        } else {
          await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
            userId: currentUser.uid,
          });
        }
      };
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
            <ThumbUp onClick={(e) => {
              likePost();
            }} className="bottomLeftIcon" style={{ color: "blue" }}/>
            {likes.length > 0 && (
              <span className="postLikeCounter">{likes.length}</span>
            )}
        </div>
        <div className="postBottomRight">
        <span className="postCommentText">{} · comments · share </span>
        </div>
             </div>
        </div>
        <hr className="footerHr" />
        <div className="postBottomFooter">
        <div className="postBottomFooterItem"  
        onClick={(e) => {
              likePost();
            }}>
        {liked ? (
              <ThumbUp style={{ color: "blue" }} className="footerIcon" />
            ) : (
                <ThumbUpAltOutlined className="footerIcon" />
                )}
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
