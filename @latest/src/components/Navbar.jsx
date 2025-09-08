import { Link } from "react-router-dom"
import { PageData } from "./PageData"
import { useNavigate } from "react-router-dom"

export function Navbar() {
    const navigate = useNavigate()
    export function handlelogout() {
        sessionStorage.removeItem("user")
        navigate("/")
    }
    return (
        <div className="navbar">
            {
                PageData.map((page) => {
                    return(
                        <Link to={page.path}>
                            <button>
                                {page.name}
                            </button>
                        </Link>
                    )
                })
            }
            <button onClick={handlelogout}>Log Out</button>
        </div>
    )
}
   