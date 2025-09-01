import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { getPosts, getPost, createPost, updatePost, deletePost } from './api.js'

function App() {

  const[data, setPosts] =useState()

/* function createpost() {
    let postObject = {
      title: "My first post",
      description: "This is the body of my first post",
      content: "12344",
      author: "3333",
      dateCreated: new Date()
    }
    axios.post('http://localhost:3000/posts', postObject)
  } */

useEffect(() => {
  async function loadAllPosts() {
    let data = await getPosts()
    if(data) {
      setPosts(data)
    }
  }
  loadAllPosts();
}, [])

  return (
    <>
    {JSON.stringify(data)}  
    </>
  )
}

export default App
