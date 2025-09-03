import { Link } from "react-router-dom";

export function About() {
    return (
        <div>
            <h1>About Us</h1>
            <p>Welcome to our blog platform. We are dedicated to sharing knowledge and insights on various topics.</p>
            <p>Our platform allows users to create, share, and discuss blog posts on a wide range of subjects.</p>
            <p> If you are interested in contributing, please feel free to <Link to="/create">create a new blog post</Link>.</p>
            <p>Thank you for visiting our platform!</p>
        </div>
    )
}