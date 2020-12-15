import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import store from '../redux/store'
// import { } from '../redux/action'
import InputField from '../components/inputField'
import { checkIfSession } from './signIn'
import { getSelf } from '../redux/action'
import Logo from '../assets/NetTantra'
import './reset.css'
import BackLogo from '../assets/LeftArrow'

const Reset = () => {

    const { push } = useHistory(null)

    const initialState = {
        email: "",
        adminEmail: "",
        privilege: "normal",
        oldOrAdminPassword: "",
        newPassword: "",
        conPassword: "",

    }
    const [state, setState] = useState(initialState)

    console.log(state)

    const reset = () => {
        if (state.newPassword === state.conPassword) {
            const data = new FormData()
            data.append("email", state.email)
            data.append("adminEmail", state.adminEmail)
            data.append("privilege", state.privilege)
            data.append("oldOrAdminPassword", state.oldOrAdminPassword)
            data.append("newPassword", state.newPassword)
            data.append("conPassword", state.conPassword)

            axios.post("http://localhost:80/netTantra/reset.php", data).then(res => {
                if (res.data) {
                    alert(res.data)
                }
                console.log(res.data)
            })
        } else alert("Passwords are not matching")
    }
    //Dividing set state into 6 parts for passing to inputFields

    const setEmail = email => setState({ ...state, email })
    const setAdminEmail = adminEmail => setState({ ...state, adminEmail })
    const setOldOrAdminPassword = oldOrAdminPassword => setState({ ...state, oldOrAdminPassword })
    const setNewPassword = newPassword => setState({ ...state, newPassword })
    const setConPassword = conPassword => setState({ ...state, conPassword })


    return (
        <div className="floater">
            <div className="resetInputHolder">
                <div className="resetLogoHolder">
                    <Logo width={"40%"} height={"40%"}></Logo>
                </div>
                <div className="resetContent">
                    <div className="regPrivilege">
                        <div className="inputFielsHolder">
                            <div className="inputText">
                                <div>Reset Type</div>
                            </div>
                            <div className="inputDiv">
                                <select
                                    style={{ border: "3px solid #ccc", outline: "none" }}
                                    onChange={e => setState({ ...state, privilege: e.target.value })}
                                    defaultValue={state.privilege}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="adminEmail"
                        style={state.privilege === "admin" ? { display: "flex" } : { display: "none" }}
                    >
                        <InputField key="email" text="Admin Email"
                            //readOnly = ON turns readOnly off.. this is a problem, but not correcting it
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setAdminEmail}></InputField>
                    </div>
                    <div className="resetName">
                        <InputField key="email" text={state.privilege === "admin" ? "User Email" : "Email"}
                            //readOnly = ON turns readOnly off.. this is a problem, but not correcting it
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setEmail}></InputField>
                    </div>
                    <div className="resetOldPassword">
                        <InputField key="email" key="email" text={state.privilege === "admin" ? "Admin Password" : "Current Password"}
                            type="password"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setOldOrAdminPassword}></InputField>
                    </div>
                    <div className="resetNewPassword">
                        <InputField key="email" key="email" text="New Password"
                            type="password"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setNewPassword}></InputField>
                    </div>
                    <div className="resetConPassword">
                        <InputField key="conPassword" text="Confirm Password"
                            type="password"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            type="password"
                            setState={setConPassword}></InputField>
                    </div>
                    <div className="resetButton">
                        <div
                            className="greenB utton"
                            onClick={() => reset()}
                        >Reset</div>
                    </div>
                    <div className="resetNewReset">
                        <div className="resetBack"
                            onClick={() => push("/")}
                        ><BackLogo fill={"#B1B1B1"}></BackLogo></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Reset

