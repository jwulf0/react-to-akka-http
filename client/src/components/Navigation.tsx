import * as React from "react";
import { useRouteMatch, Link } from 'react-router-dom';

export const Navigation: React.FC<{}> = () => {
    // Here, we use useRouteMatch() to check for the active page. In App.tsx there is an example for using the Route Matching Components provided by react router.
    // A third option would be to integrate route information into the redux store.
    // Furthermore, we use <Link>-Components to set links. An alternative would be to use the history directly as seen in the PageHome component.

    type PageKey = 'home' | 'counter';
    type PageLinkClass = 'active' | ''

    const linkClasses: { [key in PageKey]: PageLinkClass } = {
        home: useRouteMatch('/')?.isExact ? 'active' : '',
        counter: useRouteMatch('/counter') ? 'active' : ''
    }

    return <div className="navigation">
        <Link className={linkClasses.home} to="/">Home</Link>
        <Link className={linkClasses.counter} to="/counter">Counter</Link>
    </div>
}