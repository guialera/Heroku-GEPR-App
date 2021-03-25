import React, { useState } from "react"
import axios from "axios"

export const AppContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function AppProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user") || {}),
        token: localStorage.getItem("token") || ""
    }

    const defaultUser = {
        user: "Default User"
    }

    const [user, setUser] = useState(initState)
    const [loggedOutUser, /*setLoggedOutUser*/] = useState(defaultUser)
    const [errMessage, setErrMessage] = useState("")
    const [electionResultsYear, setElectionResultsYear] = useState([])
    const [savedResult, setSavedResult] = useState([])

    React.useEffect(() => {
        getElectionResultsByYear(2020)
        getSavedElectionResultsByUser()
    }, [])

    function signUp(credentials) {
        axios.post("/auth/signup", credentials)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getElectionResultsByYear(2020)
                getSavedElectionResultsByUser()
                setUser(prevUser => ({
                    ...prevUser,
                    user,
                    token
                }))
            })
            .catch(error => setErrMessage(error.response.data.errMessage))
    }

    function login(credentials) {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { user, token } = response.data
                localStorage.removeItem("user")
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getElectionResultsByYear(2020)
                getSavedElectionResultsByUser()
                setUser(prevUser => ({
                    ...prevUser,
                    user,
                    token
                }))
            })
            .catch(error => setErrMessage(error.response.data.errMessage))
    }

    function logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser({
            user: {},
            token: ""
        })
        setSavedResult([])
        localStorage.setItem("user", JSON.stringify(loggedOutUser))
    }

    function resetErrMessage() {
        setErrMessage("")
    }

    function getElectionResultsByYear(electionYear) {
        userAxios.get(`/api/results/${electionYear}`)
            .then(response => {
                setElectionResultsYear(response.data)
            })
            .catch(error => console.log(error))
    }

    function getSavedElectionResultsByUser() {
        userAxios.get("/api/savedResults/user")
            .then(response => setSavedResult(response.data))
            .catch(error => console.log(error))
    }

    function postSavedElectionResult(result) {
        delete result._id
        //console.log(result)
        userAxios.post("/api/savedResults/save", result)
            .then(response => {
                setSavedResult(prevSavedResult => ([...prevSavedResult, response.data]))
            })
            .catch(error => console.log(error))
    }

    function deleteSavedElectionResult(id) {
        userAxios.delete(`/api/savedResults/delete/${id}`)
            .then(response => {
                getSavedElectionResultsByUser()
            })
            .catch(error => console.log(error))
    }

    return (
        <AppContext.Provider
            value={{
                ...user,
                errMessage,
                electionResultsYear,
                savedResult,
                signUp,
                login,
                logout,
                resetErrMessage,
                getElectionResultsByYear,
                postSavedElectionResult,
                deleteSavedElectionResult,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}