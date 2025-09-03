

export function BlogCard({ post }) {

    let date = new Date(post.dateCreated);
    let stringDate = date.toDateString();
    return (
        <div className="post">
        <h1>{post.title}</h1>
        <h1>{post.description}</h1>
        <h3>{stringDate.slice(4,15)}</h3>
       </div>
    )
}