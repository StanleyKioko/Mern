import { Link } from "react-router-dom"
import { PageData } from "./PageData"

export function Navbar() {
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
        </div>
    )
}
   