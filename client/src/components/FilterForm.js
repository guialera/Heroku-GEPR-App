import React, { useState } from "react"

function FilterForm(props) {

    const { filterByYear, filterByParty } = props

    const [checkDem, setCheckDem] = useState(false)
    const [checkGop, setCheckGop] = useState(false)

    function recordYear(event) {
        const { value } = event.target
        filterByYear(Number(value))
    }

    function recordParty(event) {
        const { value } = event.target
        filterByParty(value)
    }

    return (
        <div>
            <div className="filterForm">
                <form className="generalElectionYear">
                    <div className="yearInput">
                        <input
                            type="radio"
                            name="year"
                            value={2020}
                            onChange={recordYear}
                        /> 2020 General Election
                    </div>
                    <div className="yearInput">
                        <input
                            type="radio"
                            name="year"
                            value={2016}
                            onChange={recordYear}
                        /> 2016 General Election
                    </div>
                    <div className="yearInput">
                        <input
                            type="radio"
                            name="year"
                            value={2012}
                            onChange={recordYear}
                        /> 2012 General Election
                    </div>
                    <div className="yearInput">
                        <input
                            type="radio"
                            name="year"
                            value={2008}
                            onChange={recordYear}
                        /> 2008 General Election
                    </div>
                </form>
                <form>
                    <input
                        type="radio"
                        name="partyWon"
                        value="dem"
                        checked={checkDem}
                        onChange={recordParty}
                    /> Democrat Wins
                    <input
                        type="radio"
                        name="partyWon"
                        value="gop"
                        checked={checkGop}
                        onChange={recordParty}
                    /> Republican Wins
            </form>
            </div>
        </div>
    )
}

export default FilterForm