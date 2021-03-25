import React, { useState, useContext } from "react"
import { AppContext } from "../context/appContext.js"

function StateResults(props) {

    const { savedResult } = useContext(AppContext)

    const [demNumber, setDemNumber] = useState()
    const [gopNumber, setGopNumber] = useState()
    const [showSaveButton, setShowSaveButton] = useState(true)

    React.useEffect(() => {
        addCommas()
        setButtons()
    }, [])

    const {
        _id,
        electionYear,
        state,
        demWon,
        gopWon,
        candidateDem,
        candidateGop,
        numberDemResult,
        percentDemResult,
        numberGopResult,
        percentGopResult,
        marginOfVictory,
        electoralVotes,
        getId,
        getIdDelete
    } = props

    function addCommas() {
        /*let newNumberDemResult = Number(numberDemResult).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        let newNumberGopResult = Number(numberGopResult).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        setDemNumber(newNumberDemResult)
        setGopNumber(newNumberGopResult)*/

        let newDem = Number(numberDemResult)
        let newGop = Number(numberGopResult)

        let stringDem = newDem.toString().split("")
        let stringGop = newGop.toString().split("")

        let demArray = stringDem
        let gopArray = stringGop

        if (demArray.length === 4) {
            demArray.splice(1, 0, ",")
        } else if (demArray.length === 5) {
            demArray.splice(2, 0, ",")
        } else if (demArray.length === 6) {
            demArray.splice(3, 0, ",")
        } else if (demArray.length === 7) {
            demArray.splice(1, 0, ",")
            demArray.splice(5, 0, ",")
        } else if (demArray.length === 8) {
            demArray.splice(2, 0, ",")
            demArray.splice(6, 0, ",")
        }

        let joinedDemArray = demArray.join("")
        setDemNumber(joinedDemArray)

        if (gopArray.length === 4) {
            gopArray.splice(1, 0, ",")
        } else if (gopArray.length === 5) {
            gopArray.splice(2, 0, ",")
        } else if (gopArray.length === 6) {
            gopArray.splice(3, 0, ",")
        } else if (gopArray.length === 7) {
            gopArray.splice(1, 0, ",")
            gopArray.splice(5, 0, ",")
        } else if (gopArray[0].length === 8) {
            gopArray.splice(2, 0, ",")
            gopArray.splice(6, 0, ",")
        }

        let joinedGopArray = gopArray.join("")
        setGopNumber(joinedGopArray)
    }

    function sendIdToSave() {
        getId(_id)
        setShowSaveButton(false)
    }

    function sendIdToDelete() {
        let id = savedResult.find(each => each.electionYear === electionYear && each.state === state)
        getIdDelete(id._id)
        setShowSaveButton(true)
    }

    function setButtons() {
        savedResult.map(function (each) {
            if (each.electionYear === electionYear && each.state === state) {
                setShowSaveButton(false)
            }
        })
    }

    return (
        <div className="state">
            <h1 className="stateHeader">{state}</h1>
            <hr />
            <div style={{ backgroundColor: demWon ? "deepskyblue" : "peachpuff", fontWeight: demWon ? "bold" : "none" }}>
                <p>{candidateDem}</p>
                <p>{`${demNumber} Votes`}</p>
                <p>{`${percentDemResult}%`}</p>
            </div>
            <hr />
            <div style={{ backgroundColor: gopWon ? "lightcoral" : "peachpuff", fontWeight: gopWon ? "bold" : "none" }}>
                <p>{candidateGop}</p>
                <p>{`${gopNumber} Votes`}</p>
                <p>{`${percentGopResult}%`}</p>
            </div>
            <hr />
            <p>{`${electoralVotes} Electoral Votes`}</p>
            <div style={{ display: showSaveButton ? "block" : "none" }}>
                <button onClick={sendIdToSave}>Save Result</button>
            </div>
            <div onClick={sendIdToDelete} style={{ display: showSaveButton ? "none" : "block" }}>
                <button>Delete Saved Result</button>
            </div>
        </div>
    )
}

export default StateResults