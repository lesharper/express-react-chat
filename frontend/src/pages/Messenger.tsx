import React, {useEffect, useState, Suspense} from 'react';
import SearchBar from "../components/SearchBar/SearchBar";
import DiscussionList from "../components/Discussion/List/DiscussionList";
import {Discussion} from "../types/discussion";
import {getAllDiscussions} from "../requests/discussions";
const Messenger = () => {

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex justify-center items-center sticky top-0 w-full bg-peach shadow-md">
                <SearchBar/>
            </div>
            <Suspense fallback={<div>Загрузка...</div>}>
                <DiscussionList/>
            </Suspense>
        </div>
    );
}

export default Messenger;
