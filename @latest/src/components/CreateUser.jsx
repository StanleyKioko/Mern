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
        await createUser(user)
    }
    return(
        <form onSubmit={handleSubmit}>
            <input placeholder="{Name}" onChange={handleChange} name="name" value={user.name} />
            <input placeholder="{Email}" onChange={handleChange} name="email" value={user.email} />
            <input placeholder="{Password}" onChange={handleChange} name="password" value={user.password} />
            <button type="submit">Create User</button>
        </form>

    )
}