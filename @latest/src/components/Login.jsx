import { useState } from "react"
import { verifyUser } from "../api"
import { useNavigate } from "react-router-dom"

export function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }
    async function handleSubmit(e) {
        e.preventDefault();
        let response = await verifyUser(user)
        if(!response){
        navigate("/home")
        sessionStorage.setItem("user", response)
        } else {
            alert("Login failed")
        }
        
    }
    return(
        <form onSubmit={handleSubmit}>
            <input placeholder="{Email}" onChange={handleChange} name="email" value={user.email} required maxLength={50} />
            <input placeholder="{Password}" onChange={handleChange} name="password" value={user.password} type="password" required maxLength={100} />
            <button type="submit">Login</button>
        </form>

    )
}