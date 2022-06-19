import React, {FC} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import styles from "./modal.module.css"

interface ModalProps {
    active: boolean
    setActive: (c: boolean) => void
}

const modalVariants = {
    hidden: {
        y: 200,
        opacity: 0,
        transition: {duration: 0.1}
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {duration: 0.1}

    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {duration: 0.3}
    }
}
const Modal: FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <AnimatePresence onExitComplete={() => setActive(false)}>
            {
                active &&
                <motion.div className={styles.modal} onClick={() => setActive(false)}
                            variants={modalVariants} initial='hidden' animate='visible' exit='exit'  >
                    <div
                        className={styles.modal_content}
                        onClick={e => e.stopPropagation()}
                    >
                        {children}
                    </div>

                </motion.div>
            }
        </AnimatePresence>
    );
}

export default Modal;
