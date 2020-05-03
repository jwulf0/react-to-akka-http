import * as React from "react";
import { useLocation } from 'react-router-dom';

export const Page404: React.FC<{}> = () => {
    const location = useLocation();

    return <div>
        <h2>404 Not Found</h2>
        <p>Sorry, the page {location.pathname} was not found.</p>
    </div>
}