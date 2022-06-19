import {selector} from "recoil";
import { getAllUserByDiscussion} from "../../requests/discussions";
import {currentDiscussionAtom} from "../atoms/currentDiscussion";
import {User} from "../../types/user";

export const usersByDiscussionSelector = selector({
    key: "usersByDiscussionSelector",
    get: async ({get}) => {
        const id = get(currentDiscussionAtom)
        const response: User[] | undefined = await getAllUserByDiscussion(id)
        return response ?? []
    }
})
