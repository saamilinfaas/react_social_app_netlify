import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResults,isLoading,FetchError} = useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg' >Loading posts....</p> }
      {!isLoading && FetchError && <p className='statusMsg' style={{color:"red"}}>{FetchError}</p>}
      {!isLoading && !FetchError && (searchResults.length ? <Feed /> : <p className='statusMsg'>No posts to Display</p>)}
    </main>
  )
}

export default Home