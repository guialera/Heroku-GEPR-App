import React, { useContext } from "react"
import StateResults from "../components/StateResults.js"
import { AppContext } from "../context/appContext.js"

function SavedResults(props) {

    const { savedResult, postSavedElectionResult, deleteSavedElectionResult } = useContext(AppContext)

    //console.log(savedResult)

    savedResult.sort(function (a, b) {
        return a.state.localeCompare(b.state)
    })

    function getIdAndFindResult(id) {
        let found = savedResult.find(each => each._id === id)
        postSavedElectionResult(found)
    }

    function getIdAndDelete(id) {
        //let found = electionResultsYear.find(each => each._id === id)
        deleteSavedElectionResult(id)
    }

    //let electionResults2020 = savedResult.map(each => each.year === 2020)
    let electionResults2020 = savedResult.map(function (each) {
        if (each.electionYear === 2020) {
            return (
                <StateResults
                    {...each}
                    getId={getIdAndFindResult}
                    getIdDelete={getIdAndDelete}
                    key={each._id}
                />
            )
        }
    })

    let electionResults2016 = savedResult.map(function (each) {
        if (each.electionYear === 2016) {
            return (
                <StateResults
                    {...each}
                    getId={getIdAndFindResult}
                    getIdDelete={getIdAndDelete}
                    key={each._id}
                />
            )
        }
    })

    let electionResults2012 = savedResult.map(function (each) {
        if (each.electionYear === 2012) {
            return (
                <StateResults
                    {...each}
                    getId={getIdAndFindResult}
                    getIdDelete={getIdAndDelete}
                    key={each._id}
                />
            )
        }
    })

    let electionResults2008 = savedResult.map(function (each) {
        if (each.electionYear === 2008) {
            return (
                <StateResults
                    {...each}
                    getId={getIdAndFindResult}
                    getIdDelete={getIdAndDelete}
                    key={each._id}
                />
            )
        }
    })

    return (
        <div>
            <h1>Saved Results</h1>
            <h1>2020 General Election</h1>
            <div className="statesContainer">
                {electionResults2020}
            </div>
            <h1>2016 General Election</h1>
            <div className="statesContainer">
                {electionResults2016}
            </div>
            <h1>2012 General Election</h1>
            <div className="statesContainer">
                {electionResults2012}
            </div>
            <h1>2008 General Election</h1>
            <div className="statesContainer">
                {electionResults2008}
            </div>
        </div>
    )
}

export default SavedResults