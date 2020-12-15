import React from 'react'
import './others.css'
import store from '../redux/store'
import { getOthers, changeState } from '../redux/action'
const OthersProfileListItem = ({ state, clearInput, setParentState }) => {

    //routing to other's profile
    const goToOther = () => {
        setParentState(null)
        clearInput()
        store.dispatch(getOthers(state))
        store.dispatch(changeState({ ...store.getState().state, profile: "others" }))
    }
    //scr={state.imageLink ? state.imageLink : null}
    //{state.empName ? state.empName : "Employee Name"}
    return (
        <div className="othersDiv"
            onClick={() => goToOther()}
        >
            <div className="othersimageDiv">
                <img src={state.profile_picture ? `http://localhost:80/netTantra/images/${state.profile_picture}` : null}></img>
            </div>
            <div className="otherstextDiv">{state.empName ? state.empName : "Unknown"}</div>
        </div>
    )
}

export default OthersProfileListItem
