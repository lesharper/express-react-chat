import { atom } from "recoil"
import {User} from "../types/user";

export const userAtom = atom({
    key: "userAtom",
    default: {} as User | undefined
})
