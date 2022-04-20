import {selector} from "recoil";
import {userAtom} from "./atoms";

export const isAuthSelector = selector({
    key: "isAuthSelector",
    get: ({get}) => {
        const user = get(userAtom)
        if (user?.hasOwnProperty('id')) return true
        return false
    }
})
