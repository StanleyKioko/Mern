import { getPost } from "../api"
import  {useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react"


export function ReadBlog() {
    const [post, setPost] = useState([]);
    let params = useParams();
    const navigate = useNavigate();
    const id = params.id;

    useEffect(() => {
        async function loadPost(){
            let data = await getPost(id)
            let date = new Date(data.dateCreated);
            data.dateCreated = date.toDateString();
            setPost(data)

        }
        loadPost()
    }, [])
    return(
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <h3>{post.dateCreated?.slice(4, 15)}</h3>
            <p>{post.content}</p>
        </div>
    )
}