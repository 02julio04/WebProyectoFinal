import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase'
//import { Posts } from '../../data'
import Post from '../post/Post'
import Share from '../share/Share'
import Stories from '../stories/Stories'
import "./feed.scss"

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <div className='feed'>
      <div className="feedWrapper">
            <Stories/>
            <Share/>
            {posts.sort((a, b) => b.data.timestamp - a.data.timestamp).map((p)=> (
            <Post key={p.id} post={p}/>
              ))}
            
      </div>
    </div>
  )
}

export default Feed
