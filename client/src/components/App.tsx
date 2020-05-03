import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Switch, Route } from "react-router-dom";
import { PageHome } from "./pages/PageHome";
import { PageCounter } from "./pages/PageCounter";
import { Page404 } from "./pages/Page404";
import { useDispatch } from "react-redux";
import { initialize } from "../modules/counting/actions";

const App: React.FC<{}> = () => {
    const [initialRequestsSent, setInitialRequestsSent] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        if(!initialRequestsSent) {
            dispatch(initialize());
            setInitialRequestsSent(true);
        }
    }, [initialRequestsSent]);

    return (
        <div className="app">
            <Header appName="Some Application" />
            <Navigation />
            <div className="main">
                <Switch>
                    <Route exact path="/"><PageHome /></Route>
                    <Route exact path="/counter"><PageCounter /></Route>
                    <Route><Page404 /></Route>
                </Switch>
            </div>
        </div>
    );
}

declare let module: object;

export default hot(module)(App);
