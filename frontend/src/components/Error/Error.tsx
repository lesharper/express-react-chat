import React, {FC} from 'react';
import styles from "./error.module.css"


interface ErrorProps {
    statusCode: string
    message: string
}

const Error: FC<ErrorProps> = ({statusCode, message}) => {
    return (
        <div className={styles.error}>
            <span className={styles.status}>{statusCode}</span>
            <span className="m-5">|</span>
            <span className={styles.message}>{message}</span>
        </div>
    );
}

export default Error;