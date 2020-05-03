import * as React from "react";

const reactLogo = require("./../assets/img/react_logo.svg");

interface Props {
    appName: string;
}

export const Header: React.FC<Props> = (p: Props) => {
    return <header className="header">
        <div className="logo"><img src={reactLogo.default} alt="react logo"/></div>
        <div className="title">
            <h1>{p.appName}</h1>
            <p>Connecting React and Akka HTTP</p>
        </div>
    </header>
}