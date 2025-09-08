import { useState } from "react"
import { createUser } from "../api"

export function CreateUser() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    function handleChange(e) {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }
    async function handleSubmit() {
        let response = await createUser(user)
        if(response.status !== 200){
            alert("User account creation failed")
            
            }
    }
    return(
        <form onSubmit={handleSubmit}>
            <input placeholder="{Name}" onChange={handleChange} name="name" value={user.name} required maxLength={20} />
            <input placeholder="{Email}" onChange={handleChange} name="email" value={user.email} required maxLength={50} />
            <input placeholder="{Password}" onChange={handleChange} name="password" value={user.password} required maxLength={100} />
            <button type="submit">Create Account</button>
        </form>

    )
}