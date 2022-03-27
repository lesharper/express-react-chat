import React, {useState} from 'react';
import SearchBar from "../components/SearchBar/SearchBar";
import DiscussionList from "../components/Discussion/List/DiscussionList";
const Messenger = () => {

    const mok = [
        {id: 1, title: "Впопич", anonymous: true, password: undefined},
        {id: 2, title: "ПКС", anonymous: false, password: "1234556"},
        {id: 3, title: "ИАТ", anonymous: false, password: "as4lolo"},
        {id: 4, title: "Сасамбо", anonymous: true, password: "lalalend"},
        {id: 5, title: "Общаемся", anonymous: true, password: "lalalend"},
        {id: 6, title: "Рабочая", anonymous: false, password: "123"},
        {id: 7, title: "Тестим", anonymous: false, password: undefined},
    ]
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center sticky top-0 w-full bg-peach shadow-md">
                <SearchBar/>
            </div>
            <DiscussionList discussions={mok}/>
        </div>
    );
}

export default Messenger;
