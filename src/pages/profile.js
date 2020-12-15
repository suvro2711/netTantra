import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import store from '../redux/store'
// import { } from '../redux/action'
import InputField from '../components/inputField'
import { checkIfSession } from './signIn'
import { changeState, getSelf, getOthers } from '../redux/action'
import EmptyUser from '../assets/Profile'
import EditLogo from '../assets/Edit'
import './profile.css'
import Search from './searchBox'
import Back from '../assets/LeftArrow'

const Profile = () => {

    const { push } = useHistory(null)

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const edDegreeRef = useRef(null)
    const edYearRef = useRef(null)
    const edInstituteRef = useRef(null)
    const edStreamRef = useRef(null)
    const imageRef = useRef(null)


    const initialState = {
        empName: "",
        email: "",
        edDegree: "",
        edYear: "",
        edInstitute: "",
        edStream: "",
        imageFile: null,
        imageLink: "",
        gender: ""
    }
    const [state, setState] = useState(initialState)
    const [editMode, setEditMode] = useState("OFF")
    console.log(state)

    const backToSelf = () => {
        if (editMode === "ON") {
            setEditMode("OFF")
        }
        store.dispatch(changeState({ ...store.getState().state, profile: "self" }))
        setState(store.getState().self)
        //sync inputs back to self
    }


    //contionally rendering the profile by comapring current state and redux state
    useEffect(() => {
        // syncFieldsToStore()
        const unsubscribe = store.subscribe(() => {
            if (store.getState().state.profile === "others" &&
                !(state.empName === store.getState().others.empName)
            ) {
                setState(store.getState().others)
            } if (store.getState().state.profile === "self" &&
                !(state.empName === store.getState().self.empName)
            ) {
                setState(store.getState().others)
            }
        })

        return unsubscribe
    })

    //Dividing set state into 6 parts for passing to inputFields
    const setEdDegree = edDegree => setState({ ...state, edDegree })
    const setEdInstitute = edInstitute => setState({ ...state, edInstitute })
    const setEdYear = edYear => setState({ ...state, edYear })
    const setEdStream = edStream => setState({ ...state, edStream })

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        push("/")
    }

    const update = () => {
        let data = new FormData()
        data.append("token", localStorage.getItem("token"))
        data.append("empName", state.empName)
        data.append("email", state.email)
        data.append("edDegree", state.edDegree)
        data.append("edYear", state.edYear)
        data.append("edInstitute", state.edInstitute)
        data.append("edStream", state.edStream)
        data.append("gender", state.gender)
        if (store.getState().state.profile === "others") {
            data.append("findingEmail", store.getState().others.email)
        }
        console.log(state.empName)
        axios.post("http://localhost:80/netTantra/update.php", data).then(res => {
            console.log(res.data)
            if (res.data) {
                console.log(res.data)
                setEditMode("OFF")
                // setState(res.data)
                if (store.getState().state.profile === "self") {
                    store.dispatch(getSelf(res.data))
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("email", res.data.email)
                } else if (store.getState().state.profile === "others") {
                    setState(res.data)
                    store.dispatch(getOthers(res.data))

                }

            }
        })
    }

    const cancle = () => {
        setEditMode("OFF")
        if (store.getState().state.profile === "others") {
            setState(store.getState().others)
        } else if (store.getState().state.profile === "self") {
            setState(store.getState().self)
        }

        syncFieldsToStore()
    }
    console.log(store.getState().state)
    console.log(store.getState().state.profile === "others")
    console.log(store.getState().state.privilege === "admin")
    console.log(store.getState().state.profile === "others" && store.getState().state.privilege === "admin")

    const editDisplay = () => {
        if (store.getState().state.profile === "self") {
            return { display: "flex" }
        } else if (store.getState().state.profile === "others" &&
            store.getState().state.privilege === "admin") {
            return { display: "flex" }
        } else return { display: "none" }
    }
    console.log(editDisplay())

    const syncFieldsToStore = () => {
        console.log("syncFieldsToStore")
        if (store.getState().state.profile === "self") {
            nameRef.current.value = store.getState().self.empName
            emailRef.current.value = store.getState().self.email
            edDegreeRef.current.value = store.getState().self.edDegree
            edYearRef.current.value = store.getState().self.edYear
            edInstituteRef.current.value = store.getState().self.edInstitute
            edStreamRef.current.value = store.getState().self.edStream
        } else if (store.getState().state.profile === "others") {
            nameRef.current.value = store.getState().others.empName
            emailRef.current.value = store.getState().others.email
            edDegreeRef.current.value = store.getState().others.edDegree
            edYearRef.current.value = store.getState().others.edYear
            edInstituteRef.current.value = store.getState().others.edInstitute
            edStreamRef.current.value = store.getState().others.edStream
        }

    }

    //on refreh fetches the same data again from the database
    const checkIfSession = () => {
        if (!state.empName || !state.email) {
            console.log("checkIfSession")
            if (localStorage.getItem("token")) {
                const data = new FormData()
                data.append("email", localStorage.getItem("email"))
                data.append("token", localStorage.getItem("token"))
                axios.post("http://localhost:80/netTantra/signIn.php", data).then(res => {
                    console.log(res.data)
                    if (res.data) {
                        store.dispatch(getSelf(res.data));
                        store.dispatch(changeState({ ...store.getState().state, privilege: res.data.privilege }))
                        localStorage.setItem("token", res.data.OAuthToken)
                        localStorage.setItem("email", res.data.email)
                        setState(res.data)

                    }
                })

            }
        }
    }
    if (store.getState().state.profile === "self") {
        checkIfSession()
    }

    return (
        <div className="floater">
            <div className="profileLogOff"
                onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("email")
                    push("/")
                }}
            >
                {store.getState().self.profile_picture ?
                    <img src={`http://localhost:80/netTantra/images/${store.getState().self.profile_picture}`}></img>
                    : <span><EmptyUser></EmptyUser></span>}
                <div>Log Off</div>
            </div>
            <div className="profileDiv">
                <div className="profileName">
                    <input className="profileNameInput" defaultValue={state.empName}
                        ref={nameRef}
                        onChange={e => setState({ ...state, empName: e.target.value })}
                        readOnly={editMode === "ON" ? false : true}
                    ></input>
                    <input className="profileEmailInput" defaultValue={state.email}
                        ref={emailRef}
                        onChange={e => setState({ ...state, email: e.target.value })}
                        readOnly={editMode === "ON" ? false : true}
                    ></input>
                    <div className="profilEditButton"
                        style={editDisplay()}
                    >
                        <EditLogo fill="#909090"></EditLogo>
                        <div
                            onClick={() => setEditMode("ON")}
                            style={{ width: "100%", height: "100%", position: "absolute" }}
                        ></div>
                    </div>

                </div>
                <div className="profileContent">
                    <div className="profileInfo">
                        <table className="profileInfoTable">
                            <tr>
                                <td>
                                    <InputField key="edDegree" key="edDegree" text="Degree"
                                        ref={edDegreeRef}
                                        placeholder="Degree"
                                        defaultValue={state.edDegree}
                                        readOnly={editMode}
                                        setState={setEdDegree}></InputField>
                                </td>
                                <td>
                                    <InputField key="edInstitute" text="Institute"
                                        ref={edInstituteRef}
                                        placeholder="Institute"
                                        defaultValue={state.edInstitute}
                                        readOnly={editMode}
                                        setState={setEdInstitute}></InputField>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <InputField key="edStream" text="Stream"
                                        ref={edStreamRef}
                                        placeholder="Stream"
                                        defaultValue={state.edStream}
                                        readOnly={editMode}
                                        setState={setEdStream}></InputField>
                                </td>
                                <td><InputField key="edYear" text="Passed Out On"
                                    ref={edYearRef}
                                    placeholder="Passed Out On"
                                    defaultValue={state.edYear}
                                    readOnly={editMode}
                                    setState={setEdYear}></InputField></td>
                            </tr>
                            <tr>
                                <td>
                                    <select className="selectGender"
                                        onChange={e => setState({ ...state, gender: e.target.value })}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={editMode === "ON" ? { display: "flex" } : { display: "none" }}
                                        onClick={() => update()}
                                        className="profileUpdateButton profileButton greenButton">Update</div>
                                </td>
                                <td>
                                    <div style={editMode === "ON" ? { display: "flex" } : { display: "none" }}
                                        onClick={() => cancle()}
                                        className="profileUpdateCancleButton profileButton greenButton">Cancle</div>
                                </td>
                            </tr>

                        </table>
                        <div className="profileBackButton"
                            onClick={() => backToSelf()}
                            style={store.getState().state.profile === "others" ?
                                { display: "flex" } : { display: "none" }}
                        >
                            <Back width="100%" height="100%" fill={"#B1B1B1"}></Back>
                        </div>
                    </div>
                    <div className="profileSearch">
                        <Search></Search>
                    </div>
                </div>
                <div className="profilePicture">
                    <div>
                        {state.profile_picture ? <img src={`http://localhost:80/netTantra/images/${state.profile_picture}`}></img> : <div><EmptyUser></EmptyUser></div>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile

