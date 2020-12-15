import React, { forwardRef } from 'react'
import './inputField.css'
const inputField = ({ text, placeholder, type, onClick, setState, defaultValue, readOnly, border }, ref) => {
    return (
        <div className="inputFielsHolder">
            {/* <div className="inputText inputSubElement"> */}
            <div className="inputText">
                <div >{text ? text : "Text"}</div>
            </div>
            {/* </div> */}
            {/* <div className="inputDiv inputSubElement"> */}
            {/* defaultValue={defaultValue ? defaultValue : null} */}
            <div className="inputDiv">
                <input type={type ? type : "text"} placeholder={placeholder ? placeholder : "Write Something"}
                    style={border ? { border: "3px solid #ccc" } : { border: "none" }}
                    readOnly={readOnly === "ON" ? false : true}
                    defaultValue={defaultValue ? defaultValue : null}
                    ref={ref}
                    onChange={e => {
                        if (setState) {
                            setState(e.target.value)
                        }
                    }}
                ></input>
            </div>
            {/* </div> */}
        </div>
    )
}

export default forwardRef(inputField)
