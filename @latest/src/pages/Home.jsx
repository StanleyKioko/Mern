import { getPosts} from '../api'
import { useEffect, useState } from 'react'

export function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function loadAllPosts() {
            const data = await getPosts()
            data.sort((d1, d2) => new Date(d2.dateCreated) - new Date(d1.dateCreated).getTime());
            setPosts(data);
        }
        loadAllPosts()
    }, [])

    return (
        <div className="posts">
            {posts.map(post => {
                return(
                    <BlogCard key={post.id} post={post} />
                )

            })}
        </div>
    )
}