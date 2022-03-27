import React, {FC} from 'react';
import ContainerPosts from "../components/Post/ContainerPosts";
import Promo from "../components/Promo/Promo";
const Home: FC = () => {
    return (
        <>
            <Promo/>
           <ContainerPosts/>
        </>
    );
}

export default Home;
