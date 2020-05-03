import * as React from "react";
import { useHistory } from 'react-router-dom';

export const PageHome: React.FC<{}> = () => {
    // Here, we demonstrate building a react-router link "manually" by using history.push() - as opposed to using the Link-Component provided by react-router as seen in the Navigation component.

    const history = useHistory();

    const onClickLink = (path: string): React.MouseEventHandler =>  e => {
        e.preventDefault();
        history.push(path);
    }

    const onClickCounterLink: React.MouseEventHandler = onClickLink('/counter');

    return <div>
        <h2>Home</h2>
        <p>Since this client is based on a template (which is, in turn, based on <a target="_new" href="https://github.com/vikpe/react-webpack-typescript-starter">this template</a>) it contains some elements I use in any new react project, like TypeScript, <a target="_new" href="https://github.com/ReactTraining/react-router">react-router</a> or <a target="_new" href="https://react-redux.js.org/">redux</a>.</p>
        <p>What it's supposed to demonstrate, the interaction with an HTTP API run by <a target="_new" href="https://doc.akka.io/docs/akka-http/current/index.html">akka http</a>, is  found on the <a href="/counter" onClick={onClickCounterLink}>Counter</a> page.</p>
        <p>Happy counting!</p>
    </div>
}