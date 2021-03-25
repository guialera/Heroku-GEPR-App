import React, { useState, useContext } from "react"
import { AppContext } from "../context/appContext.js"

function Auth(props) {
    let emptyForm = {
        username: "",
        password: ""
    }

    const [newUser, setNewUser] = useState(true)
    const [input, setInput] = useState(emptyForm)

    const { signUp, login, errMessage, resetErrMessage } = useContext(AppContext)

    function change(event) {
        event.preventDefault()
        setNewUser(prevNewUser => !prevNewUser)
        resetErrMessage()
    }

    function fillIn(event) {
        const { name, value } = event.target
        setInput(prevInput => ({ ...prevInput, [name]: value }))
        console.log(input)
    }

    function signUpForm(event) {
        event.preventDefault()
        signUp(input)
        resetErrMessage()
    }

    function loginForm(event) {
        event.preventDefault()
        login(input)
        resetErrMessage()
    }

    return (
        <div>
            <h1 className="authPageHeader">General Election Results</h1>
            <div className="authForm" style={{ display: newUser ? "block" : "none" }}>
                <form onSubmit={signUpForm}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter New Username"
                        value={input.username}
                        onChange={fillIn}
                    />
                    <br />
                    <input
                        type="text"
                        name="password"
                        placeholder="Enter New Password"
                        value={input.password}
                        onChange={fillIn}
                    />
                    <br />
                    <button>Submit</button>
                    <p style={{ color: "red" }}>{errMessage}</p>
                </form>
            </div>

            <div className="authForm" style={{ display: newUser ? "none" : "block" }}>
                <form onSubmit={loginForm}>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={input.username}
                        onChange={fillIn}
                    />
                    <br />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={input.password}
                        onChange={fillIn}
                    />
                    <br />
                    <button>Submit</button>
                    <p style={{ color: "red" }}>{errMessage}</p>
                </form>
            </div>

            <button className="authFormBtn" style={{ display: newUser ? "block" : "none" }} onClick={change}>Click To Login</button>
            <button className="authFormBtn" style={{ display: newUser ? "none" : "block" }} onClick={change}>Click To Sign Up</button>
        </div>
    )
}

export default Auth