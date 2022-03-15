import {useEffect, useState} from "react";

export const useMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggle = () => setIsOpen(!isOpen)

    useEffect(() => {
        const hideMenu = () => {
            if(window.innerWidth > 768 && isOpen)
                setIsOpen(false)
        }
        window.addEventListener('resize', hideMenu)
        return () => {
            window.removeEventListener('resize', hideMenu)
        }
    }, [isOpen])

    return {
        isOpen, toggle
    }
}