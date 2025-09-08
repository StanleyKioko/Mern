import { Navbar } from "./Navbar"
import { Outlet} from "react-router-dom"
import { axios } from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function Layout() {
    let user = sessionStorage.getItem("user")
    const navigate = useNavigate()
    useEffect(() => {
        if(!user){
            navigate("/")
        }


    }, [user])
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}