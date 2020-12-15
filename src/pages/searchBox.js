import React, { useState, useRef } from 'react'
import OthersItem from '../components/othersProfileListItem'
import axios from 'axios'
import "./search.css"

const SearchBox = () => {

    const [state, setState] = useState(null)
    const inputSearchRef = useRef(null)

    const pullAllUsers = str => {
        console.log(str)
        axios.get(`http://localhost:80/netTantra/others.php?name=${str}`).then(res => {
            console.log(res.data)
            setState(res.data)
        })
    }

    const clearInput = () => {
        inputSearchRef.current.value = ""
    }
    if (state) {
        console.log("got in")
        state.map(item => console.log(item))
    }

    return (
        <div className="searchBox">
            <div className="searchInputBox">
                <div className="searchInputText">
                    Search
                </div>
                <div className="searchInput">
                    <input
                        ref={inputSearchRef}
                        style={{ border: "none", outline: "none" }}
                        onChange={e => pullAllUsers(e.target.value)}
                    ></input>
                </div>
            </div>

            <div className="searchDiv">
                {
                    state ?
                        state.map(item =>
                            <OthersItem setParentState={setState} clearInput={clearInput} state={item}></OthersItem>
                        ) : null
                }
            </div>
        </div>
    )
}

export default SearchBox
