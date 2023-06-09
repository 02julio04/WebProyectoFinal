import { ChatBubbleOutline, EmojiEmotions, Favorite, MoreVert, ShareOutlined, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import AddReactionIcon from '@mui/icons-material/AddReaction';
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
import Picker from "@emoji-mart/react";
import { db } from '../../firebase';

const Post = ({post}) => {
  const [input, setInput] = useState("");
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentOpen, setCommentOpen] = useState(false);
    const [commentBoxVisible, setCommentBoxVisible] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);

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

      useEffect(() => {
        const unSub = onSnapshot(
          collection(db, "posts", post.id, "comments"),
          (snapshot) => {
            setComments(
              snapshot.docs.map((snapshot) => ({
                id: snapshot.id,
                data: snapshot.data(),
              }))
            );
          }
        );
        return () => {
          unSub();
        };
      }, [post.id]);

      const handleComment = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "posts", post.id, "comments"), {
          comment: input,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
          timestamp: serverTimestamp(),
        });
        setCommentBoxVisible(false);
        setInput("");
      
      }

    const likePost = async () => {
        if (liked) {
          await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
        } else {
          await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
            userId: currentUser.uid,
          });
        }
      };
      const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
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
        @{post.data.displayName.replace(/\s+/g, "").toLowerCase()}
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
        <span className="postCommentText" onClick={() => setCommentOpen(!commentOpen)}>
          {comments.length} · Comentarios 
          </span>
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
            <div className="postBottomFooterItem" onClick={() => setCommentBoxVisible(!commentBoxVisible)}>
                <ChatBubbleOutline className="footerIcon" />
                <span className="footerText">Comentarios</span>
               

            </div>
            <div className="postBottomFooterItem">
                <ShareOutlined className="footerIcon" />
                <span className="footerText">Compartir</span>

            </div>
        </div>
        </div>
        {showEmojis && (
          <div className="emoji">
            <Picker onEmojiSelect={addEmoji} />
          </div>
        )}
        {commentBoxVisible && (
        <form onSubmit={handleComment} className="commentBox">
          <textarea
            type="text"
            placeholder="Escribe un comentario ..."
            className="commentInput"
            rows={1}
            style={{ resize: "none" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div  onClick={() => setShowEmojis(!showEmojis)} className="shareOption">
           <AddReactionIcon
                className="shareIcon"
                style={{ color: "rgba(99, 239, 108, 0.75)" }}
              />
              </div>
          <button type="submit" disabled={!input} className="commentPost">
            Comentar
          </button>
        </form>
      )}
    
        {commentOpen > 0 && (
        <div className="comment">
          {comments
            .sort((a, b) => b.data.timestamp - a.data.timestamp)
            .map((c) => (
              <div>
              <div className="commentWrapper">
              <img
              className="commentProfileImg"
              src={c.data.photoURL}
              alt=""
              />
            <div className="commentInfo">
              <span className="commentUsername">
              @{c.data.displayName.replace(/\s+/g, "").toLowerCase()}
              </span>
              <p className="commentText">{c.data.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default Post
