import { Route, Switch } from "react-router-dom";
import Articles from './Articles'
import WebPage from './WebPage'
import Header from './Header';

export const App = () => {

    return (<>
    <Header/>
        <Switch>
            <Route exact path="/" component={() => <Articles />} />
            <Route path="/WebPage" component={WebPage} />
        </Switch>

    </>
    )
};
