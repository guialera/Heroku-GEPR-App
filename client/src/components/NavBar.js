import React, { useContext } from "react"
import { AppContext } from "../context/appContext.js"
import { Link } from "react-router-dom"

function NavBar() {
    const { logout, token, user } = useContext(AppContext)
    return (
        <div>
            <nav>
                {!token && <Link className="appLinkText" to="/">Login</Link>}
                {token && <Link className="appLinkText" to="/electionResults">Election Results</Link>}
                {token && <Link className="appLinkText" to="/savedResults">{`${user.username}'s Saved Results`}</Link>}
                {token && <Link className="appLinkText" to="/"><button onClick={logout}>Log Out</button></Link>}
            </nav>
        </div>
    )
}

export default NavBar