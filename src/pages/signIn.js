import React, { useState, useEffect } from 'react'
import InputField from '../components/inputField'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import store from '../redux/store'
import { getSelf, changeState } from '../redux/action'
import './signIn.css'
import Logo from '../assets/NetTantra'

const SignIn = () => {
    const initialState = {
        email: "",
        password: ""
    }



    const [state, setState] = useState(initialState)
    const { push } = useHistory(null)
    console.log(state)
    //Dividing set state into 6 parts for passing to inputFields
    const setEmail = email => setState({ ...state, email })
    const setPassword = password => setState({ ...state, password })

    useEffect(() => {
        // checkIfSession()
    })

    const loginRequest = () => {
        const data = new FormData()
        data.append("email", state.email)
        data.append("password", state.password)
        axios.post("http://localhost:80/netTantra/signIn.php", data).then(res => {
            console.log(res.data)
            if (res.data) {
                store.dispatch(getSelf(res.data));
                localStorage.setItem("token", res.data.OAuthToken)
                localStorage.setItem("email", res.data.email)
                store.dispatch(changeState({ ...store.getState().state, privilege: res.data.privilege, profile: "self" }))
                push("/profile")
            }
        })
    }

    //Check if token stored in localstorage is still valid.
    //If valid then not need for login authentication.
    // const checkIfSession = () => {
    //     console.log("triggered")
    //     if (localStorage.getItem("token")) {
    //         const data = new FormData()
    //         data.append("email", localStorage.getItem("email"))
    //         data.append("token", localStorage.getItem("token"))
    //         axios.post("http://localhost:80/netTantra/signIn.php", data).then(res => {
    //             console.log("got here")
    //             console.log(res.data)
    //             if (res.data) {
    //                 store.dispatch(getSelf(res.data));
    //                 localStorage.setItem("token", res.data.OAuthToken)
    //                 localStorage.setItem("email", res.data.email)
    //                 push("/profile")
    //             }
    //         })

    //     }
    //     console.log("loggedin using token")
    // }

    // checkIfSession()
    return (
        <div className="floater">
            <div className="signInInputHolder">
                <div className="signInLogoHolder">
                    <Logo width={"40%"} height={"60%"}></Logo>
                </div>
                <div className="signInContent">
                    <div className="signInText"></div>
                    <div className="signInEmails">
                        <InputField key="email" key="email" text="Email"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setEmail}></InputField>
                    </div>
                    <div className="signInPassword">
                        <InputField key="email" key="email" text="Password"
                            type="password"
                            border="true"
                            readOnly="ON"
                            placeholder=" "
                            setState={setPassword}></InputField>
                    </div>
                    <div className="signInButton "
                        onClick={() => loginRequest()}
                    >
                        <div className="greenButton">login</div>
                    </div>
                    <div className="signInNewReset">
                        <a onClick={() => push("/registration")}>{"New Here?"}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a onClick={() => push("/reset")}>{" Reset Password"}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
