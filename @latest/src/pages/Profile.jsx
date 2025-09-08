import { BlogCard } from "../components/BlogCard"
import { useEffect, useState } from "react"
import { axios } from "axios"
import { getPosts } from "../api"
import jwt_decode from "jwt-decode"


export function Profile() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function loadUserData() {
            const token = sessionStorage.getItem("user")
            const decodedUser = jwt_decode(token)
            const allPosts = await getPosts()
            const filteredPosts = allPosts.filter(post => post.author === decodedUser._id)
            setPosts(filteredPosts)
            setUser(decodedUser)
        }
        loadUserData()
    }, [])

    return(
        <div>
           <label>Name:</label>
           <h2>{user?.name}</h2>
           <label>Email:</label>
           <h2>{user?.email}</h2>
           <label>Join Date:</label>
           <h2>{new Date(user?.createdAt).toLocaleDateString()}</h2>
           {posts.map(post => (
            <BlogCard post={post} />
           ))}
        </div>
        )
    
    }

