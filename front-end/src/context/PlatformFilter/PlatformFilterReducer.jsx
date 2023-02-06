import { GET_PLATFORMS_ACTIVED } from "./types";

export default function (state, action) {
    const {payload, type} = action

    switch (type) {
        case GET_PLATFORMS_ACTIVED:
            return {
                ...state
            }
        default:
            return {}
    }

}