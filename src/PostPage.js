import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const PostPage = () => {
  const {posts,handleDelete} = useContext(DataContext);
  const {id} = useParams();
  const post = posts.find(post=>(post.id).toString()===id);
  return (
    <main className='PostPage'>
      <h3>{`post id is ${id}`}</h3>
        <article className='post'>
          {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.deteTime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}> <button className='editButton'>Edit</button> </Link>
            <button onClick={()=>handleDelete(post.id)}>Delete Post</button>
          </>
          }
          {!post && 
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to="/">Visit Our HomePage</Link>
            </p>
          </>}
        </article>
        
    </main>
  )
}

export default PostPage