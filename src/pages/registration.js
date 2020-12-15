import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from '../components/inputField'
import Logo from '../assets/NetTantra'
import './registration.css'
import EmptyUser from '../assets/Profile'
import EditLogo from '../assets/Edit'
import store from '../redux/store'
import { getSelf, changeState } from '../redux/action'
import { useHistory } from 'react-router-dom'
import BackLogo from '../assets/LeftArrow'

const Registration = () => {

    const initialState = {
        empName: "",
        email: "",
        privilege: "",
        imageFile: null,
        imageLink: "",
        password: "",
        conPassword: ""
    }

    const { push } = useHistory(null)

    const [state, setState] = useState(initialState)
    console.log(state)
    //Dividing set state into 6 parts for passing to inputFields
    const setEmpName = empName => setState({ ...state, empName })
    const setEmail = email => setState({ ...state, email })
    const setPassword = password => setState({ ...state, password })
    const setConPassword = conPassword => setState({ ...state, conPassword })




    const validation = () => {
        const regOnlyLetter = /[^a-zA-Z\s]/
        const regEmailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(state.password === state.conPassword)) {
            return [false, "Paswords are not matching"]
        }
        if (regOnlyLetter.test(state.empName)) {
            return [false, "Name should be all letters"]
        } if (!regEmailValidation.test(state.email)) {
            return [false, "Email is in wrong format"]
        } else return [true, "Validated"]
    }

    const submit = () => {
        const [valid, message] = validation()
        if (!valid) {
            alert(message)
            return
        }
        const data = new FormData()
        data.append("name", state.empName)
        data.append("email", state.email)
        data.append("password", state.password)
        data.append("privilege", state.privilege)
        data.append("image", state.imageFile)
        axios.post("http://localhost:80/netTantra/registration.php", data).then(res => {
            if (res) {
                console.log(res.data)
                localStorage.setItem("token", res.data.OAuthToken)
                localStorage.setItem("email", res.data.email)
                store.dispatch(getSelf(res.data))
                store.dispatch(changeState({ ...store.getState().state, privilege: res.data.privilege, profile: "self" }))
                push("/profile")
            } else console.log("Problem in registration")
        })
    }

    return (
        <div className="floater">
            <div className="regImage">
                <div>
                    {state.imageLink ? <img src={state.imageLink}></img> : <EmptyUser></EmptyUser>}
                    <div>
                        <EditLogo fill="#FFFFFF"></EditLogo>
                        <input type="file"
                            onChange={e => {
                                console.log(e.target.files[0])
                                setState({ ...state, imageFile: e.target.files[0], imageLink: URL.createObjectURL(e.target.files[0]) })
                            }}
                        ></input>
                    </div>
                    {/* <img src={EmptyUser}></img> */}
                </div>
            </div>
            <div className="regInputHolder">
                <div className="regLogoHolder">
                    <Logo width={"40%"} height={"40%"}></Logo>
                </div>
                <div className="regContent">
                    <div className="regText"></div>
                    <div className="regName">
                        <InputField key="name" text="Name"
                            //readOnly = ON turns readOnly off.. this is a problem, but not correcting it
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setEmpName}></InputField>
                    </div>
                    <div className="regEmails">
                        <InputField key="email" key="email" text="Email"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setEmail}></InputField>
                    </div>
                    <div className="regPrivilege">
                        <div className="inputFielsHolder">
                            <div className="inputText">
                                <div>Privileges</div>
                            </div>
                            <div className="inputDiv">
                                <select
                                    style={{ border: "3px solid #ccc", outline: "none" }}
                                    onChange={e => setState({ ...state, privilege: e.target.value })}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="admin">Admin</option>

                                </select>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="regPassword">
                        <InputField key="email" key="email" text="Password"
                            type="password"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setPassword}></InputField>
                    </div>
                    <div className="regConPassword">
                        <InputField key="conPassword" text="Confirm Password"
                            type="password"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            type="password"
                            setState={setConPassword}></InputField>
                    </div>
                    <div className="regButton"

                    >
                        <div className="greenButton"
                            onClick={() => submit()}
                        >Register</div>
                    </div>
                    <div className="regNewReset">
                        <div className="regBack"
                            onClick={() => push("/")}
                        ><BackLogo fill={"#B1B1B1"}></BackLogo></div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Registration



{/* //above is new design */ }
{/* <InputField key="name" text="Name"
                //readOnly = ON turns readOnly off.. this is a problem, but not correcting it
                readOnly="ON"
                placeholder="Write full name"
                setState={setName}></InputField>
            <InputField key="email" key="email" text="Email"
                readOnly="ON"
                placeholder="Write your Email ad"
                setState={setEmail}></InputField>
            <InputField key="password" text="Password"
                readOnly="ON"
                placeholder="Type Password"
                type="password"
                setState={setPassword}></InputField>
            <InputField key="conPassword" text="Confirm Password"
                readOnly="ON"
                placeholder="Type Again"
                type="password"
                setState={setConPassword}></InputField>
            <input type="file" name="profilePic"
                onChange={e => { setState({ ...state, imageFile: e.target.files[0] }) }}
            ></input>
            <button
                onClick={() => {
                    console.log(state);
                    submit()
                }}
            >Submit</button>
            <button
                onClick={() => {
                    console.log(state);

                }}
            >Search</button>

            <img className="propic" src={state.imageLink}></img> */}


