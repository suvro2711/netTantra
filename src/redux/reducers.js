import { combineReducers } from 'redux';
import { ActionTypes } from './action'

const initaiOtherEmployee = {}
const initaiSelf = {
    empName: "",
    email: "",
    image: null,
    imageLink: "",
    edDegree: "",
    edInstitute: "",
    edYear: "",
    edStream: ""
}
const initialState = {
    privilege: "normal",
    profile: "self",
    justLoggedIn: "true"
}

const self = (self = initaiSelf, action) => {
    if (action.type === ActionTypes.STORE_SELF) {
        console.log(action.payload)
        return action.payload
    } else return self
}

const others = (otherProfile = initaiOtherEmployee, action) => {
    if (action.type === ActionTypes.STORE_OTHERS) {
        return action.payload
    } else return otherProfile
}

const state = (state = initialState, action) => {
    if (action.type === ActionTypes.CHANGE_STATE) {
        return action.payload
    } else return state
}

const rootReducers = combineReducers({ self, others, state })

export default rootReducers