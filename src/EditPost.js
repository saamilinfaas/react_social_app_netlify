import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const EditPost = () => {
   const {handleEdit,editTitle,setEditTitle,editBody,setEditBody,posts} = useContext(DataContext);
    const {id} = useParams();
    const post = posts.find(post=>(post.id).toString() === id);
    useEffect(()=>{  
        if(post){
            setEditBody(post.body);
            setEditTitle(post.title);

        }
    },[post,setEditTitle,setEditBody])
  return (
        
    <main className='NewPost'>
        <h2 style={{textAlign:"center"}}>Update Post</h2>
        <br></br>
        {editTitle && 
            <form onSubmit={e=>e.preventDefault()} className='newPostForm'>
            <label htmlFor='edittitle'>Edit title: </label>
            <input 
                id='edittitle'
                type='text'
                required
                value={editTitle}
                onChange={(e)=>setEditTitle(e.target.value)}
            />
            <label htmlFor='editbody'>Edit body: </label>
            <input 
                id='editbody'
                type='text'
                required
                value={editBody}
                onChange={(e)=>setEditBody(e.target.value)}
            />
            <button type='submit' onClick={()=>handleEdit(post.id)}>Update</button>
        </form>
        }
        {!editTitle && 
        <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to="/">Visit Our Home Page</Link>
            </p>
        
        </>
        }
        
    </main>
    
    
  )
}

export default EditPost