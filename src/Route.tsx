import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { TeamCreater, Match,BatingScoreCard } from './containers';

export const AppRoute = () => {
    return (<Router>
        <Switch>
            <Route path="/" render={() => <TeamCreater />} exact={true} />
            <Route path="/matchstart" render={() => <Match/>} />
            <Route path="/scorecard" render={() => <BatingScoreCard/>} />
        </Switch>
    </Router>)
}
