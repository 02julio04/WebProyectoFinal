import React, { useContext, useState } from 'react'
import "./share.scss"
import {
    Close,
    EmojiEmotions,
    PermMedia,
    VideoCameraFront,
  } from "@mui/icons-material";
  import { AuthContext } from "./../../context/AuthContext";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { db, storage } from "../../firebase";
  import { v4 as uuid } from "uuid";
  import Picker from "@emoji-mart/react";
  import {
    addDoc,
    arrayUnion,
    collection,
    serverTimestamp,
    Timestamp,
    updateDoc,
    doc,
  } from "firebase/firestore";


const Share = () => {
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);


  const handlePost = async()=>{
    if (img) {

      const storageRef = ref(storage, "Posts/" + uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "posts"), {
              uid: currentUser.uid,
              photoURL: currentUser.photoURL,
              displayName: currentUser.displayName,
              input,
              img: downloadURL,
              timestamp: serverTimestamp(),
            });

            await updateDoc(doc(db, "usersPosts", currentUser.uid), {
              messages: arrayUnion({
                id: uuid(),
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
                displayName: currentUser.displayName,
                input,
                img: downloadURL,
                timestamp: Timestamp.now(),
              }),
            });
          });
        }
      );
    
    }else{
      await addDoc(collection(db, "posts"), {
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
        input,

        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, "usersPosts", currentUser.uid), {
        messages: arrayUnion({
          id: uuid(),
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          displayName: currentUser.displayName,
          input,

          timestamp: Timestamp.now(),
        }),
      });
    }
    setInput("");
    setImg(null);
    setShowEmojis(false);
  }
      const handleKey = (e) => {
      e.code === "Enter" && handlePost();
    };
        const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
       };

  const removeImage = () => {
    setImg(null);
  };

  return (
    <div className="share">
        <div className="shareWrapper">
        <div className="shareTop">
        <img src={currentUser.photoURL} alt="" className="shareProfileImg" />
        <textarea 
        type="text"   
        rows={2} 
        style={{ resize: "none", overflow: "hidden" }}
        placeholder={"En que estas pensando " + currentUser.displayName + "?"} 
        value={input}
        className="shareInput" 
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        />
        <input value = ''placeholder = "image URL (optional)" className='shareInput1'/>
        </div>
        <hr className="shareHr" />
        {img && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(img)} alt="" className="shareImg" />
            <Close className="shareCancelImg" onClick={removeImage}/>

          </div>
          )}
        <div className="shareBottom">
        <div className="shareOptions">
        <div className="shareOption">
        <VideoCameraFront
                className="shareIcon"
                style={{ color: "#bb0000f2" }}
              />
              <span className="shareOptionText">Live Video</span>
        </div>
        <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
              <span className="shareOptionText">Photo/Video</span>
              <input type="file"  
                id="file"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
                />
            </label>
            <div  onClick={() => setShowEmojis(!showEmojis)} className="shareOption">
            <EmojiEmotions
                className="shareIcon"
                style={{ color: "#bfc600ec" }}
              />
              <span className="shareOptionText">Feelings/Activity</span>
            </div>
        </div>
        </div>
        {showEmojis && (
          <div className="emoji">
            <Picker onEmojiSelect={addEmoji} />
          </div>
        )}
        </div>
      
    </div>
  )
}

export default Share
