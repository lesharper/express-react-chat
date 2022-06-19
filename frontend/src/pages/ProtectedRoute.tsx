import React, {FC, ReactElement, ReactNode} from 'react';
import {Navigate, Outlet} from "react-router";

interface ProtectedRouteProps {
    isAllowed: boolean | undefined
    redirectPath: string
    children: ReactElement
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({isAllowed, redirectPath, children}) => {

    if (!isAllowed) return <Navigate to={redirectPath} replace />;

    return children ? children : <Outlet />;
}

export default ProtectedRoute;
