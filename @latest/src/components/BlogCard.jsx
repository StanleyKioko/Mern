import { Link } from "react-router-dom"

export function BlogCard({ post }) {

    let date = new Date(post.dateCreated);
    let stringDate = date.toDateString();
    return (
        <Link to={`/posts/${post.id}`} className="post">
        <h1>{post.title}</h1>
        <h1>{post.description}</h1>
        <h3>{stringDate.slice(4,15)}</h3>
       </Link>
    )
}