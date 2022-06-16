import {selector} from "recoil";
import {Discussion} from "../../types/discussion";
import {getAllDiscussions} from "../../requests/discussions";

export const discussionsSelector = selector({
    key: "discussionsSelector",
    get: async () => {
        const response: Discussion[] | undefined = await getAllDiscussions()
        return response ?? []
    }
})
