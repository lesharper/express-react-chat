import React, {FC} from 'react';
import Error from "../components/Error/Error";

const NotFound: FC = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Error statusCode="404" message="Страница не найдена"/>
        </div>
    );
}

export default NotFound;