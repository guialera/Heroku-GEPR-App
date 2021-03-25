import React from "react"

function StateFilterForm(props) {

    const {state, _id, stateFilter} = props

    function recordState(event){
        const {value} = event.target
        stateFilter(value)
    }

    return (
        <div className="stateForm">
            <form>
                <input
                    type="radio"
                    name="state"
                    value={_id}
                    onChange={recordState}
                /> {state}
            </form>
        </div>
    )
}

export default StateFilterForm