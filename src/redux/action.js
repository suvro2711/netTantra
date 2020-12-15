export const ActionTypes = {
    STORE_SELF: "STORE_SELF",
    STORE_OTHERS: "STORE_OTHERS",
    CHANGE_STATE: "CHANGE_STATE"
}


export const getSelf = payload => ({
    type: ActionTypes.STORE_SELF,
    payload
})

export const getOthers = payload => ({
    type: ActionTypes.STORE_OTHERS,
    payload
})

export const changeState = payload => ({
    type: ActionTypes.CHANGE_STATE,
    payload
})