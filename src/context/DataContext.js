import { createContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { format } from "date-fns";
import api from "../api/posts";
import Post from "../Post";
import PostLayout from "../PostLayout";
import EditPost from "../EditPost";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    
  const [posts,setPosts] = useState([])
  const [search,setSearch] = useState("");
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState("");
  const [postBody,setPostBody] = useState("");
  const [editBody,setEditBody] = useState("");
  const [editTitle,setEditTitle] = useState("");
  const navigate = useNavigate();
  const {width} = useWindowSize();
  const {data,fetchError,isLoading} = useAxiosFetch("http://localhost:3500/posts");

  useEffect(()=>{
    setPosts(data);
  },[data])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const dateTime = format(new Date(),"MMMM dd, yyyy pp");
    const id = posts.length? posts[posts.length-1].id+1 :1;
    const newPost = {
      id,
      title:postTitle,
      dateTime,
      body:postBody
    };try {
      const response = await api.post("/posts",newPost);
      const allPosts = [...posts,response.data];
      setPosts(allPosts); 
    } catch (err) {
      if(err.response){
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers)
      }else{
        console.log(`Error; ${err.message}`)
      }
    }

    setPostBody("");
    setPostTitle("");
    navigate("/");
  }

  useEffect(()=>{
    const filteredResult = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase()) 
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResult.reverse());
  },[search,posts]);

  const handleEdit = async (id)=>{
    
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const editedObject = {
      id,
      dateTime,
      body:editBody,
      title:editTitle
    }
    try{const response = await api.put(`/posts/${id}`,editedObject);
    setPosts(posts.map(post=>(post.id) === id ? {...response.data} : post));
    setEditBody("");
    setEditTitle("");
    navigate("/");
  }catch(err){
    console.log(err.message);
  }
   
  }

  const handleDelete = async (id)=>{
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter(post=>post.id !== id);
      setPosts(postList);
      navigate("/")
    } catch (err) {
      console.log(err.message);
    }
    

  }
    return (
        <DataContext.Provider value={{
            width,search,setSearch,searchResults,fetchError,isLoading,
            handleSubmit,postTitle,setPostTitle,postBody,setPostBody,posts,handleDelete,
            handleEdit,editTitle,setEditTitle,editBody,setEditBody

        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;