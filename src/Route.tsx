import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MaterialUiForm from './containers/Teams'

import { TeamCreater, Match,BatingScoreCard, BowlingDetails } from './containers';

export const AppRoute = () => {
    return (<Router>
        <Switch>
            {/* <Route path='/' render={()=><MaterialUiForm/>} exact/> */}
            <Route path="/" render={() => <TeamCreater />} exact={true} />
            <Route path="/matchstart" render={() => <Match/>} />
            <Route path="/scorecard" render={() => <BatingScoreCard/>} />
            <Route path='/bowing' render={()=><BowlingDetails/>}/>
        </Switch>
    </Router>)
}
