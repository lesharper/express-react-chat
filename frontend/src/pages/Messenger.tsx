import React, {useEffect, useState} from 'react';
import SearchBar from "../components/SearchBar/SearchBar";
import DiscussionList from "../components/Discussion/List/DiscussionList";
import {Discussion} from "../types/discussion";
import {getAllDiscussions} from "../requests/discussions";
const Messenger = () => {

    const [discussions, setDiscussions] = useState<Discussion[]>()

    useEffect(  () => {
        const fetch = async () => {
            const response = await getAllDiscussions()
            console.log("Беседы - ", response)
            setDiscussions(response)
        }
        fetch()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center sticky top-0 w-full bg-peach shadow-md">
                <SearchBar/>
            </div>
            <DiscussionList discussions={discussions}/>
        </div>
    );
}

export default Messenger;
