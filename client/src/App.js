import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { AppContext } from "./context/appContext.js"
import NavBar from "./components/NavBar.js"
import Auth from "./components/Auth.js"
import ElectionResults from "./components/ElectionResults.js"
import SavedResults from "./components/SavedResults.js"

function App(props) {

    const { token } = useContext(AppContext)

    return (
        <div>
            <NavBar />
            <Switch>
                <Route
                    exact path="/"
                    render={() => token ? <Redirect to="electionResults" /> : <Auth />}
                />
                <Route
                    exact path="/electionResults"
                    render={() => token ? <ElectionResults /> : <Redirect to="/" />}
                />
                <Route
                    exact path="/savedResults"
                    render={() => token ? <SavedResults /> : <Redirect to="/" />}
                />
            </Switch>
        </div>
    )
}

export default App