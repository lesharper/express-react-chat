import {selector} from "recoil";
import {userAtom} from "../atoms/user";

export const authSelector = selector({
    key: "authSelector",
    get: ({get}) => {
        const user = get(userAtom)
        return user?.hasOwnProperty('id')
    }
})
