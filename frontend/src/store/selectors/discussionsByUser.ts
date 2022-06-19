import {selector} from "recoil";
import {Discussion} from "../../types/discussion";
import {getAllDiscussionsByUser} from "../../requests/discussions";

export const discussionsByUserSelector = selector({
    key: "discussionsByUserSelector",
    get: async () => {
        const response: Discussion[] | undefined = await getAllDiscussionsByUser()
        return response ?? []
    }
})
