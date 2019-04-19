import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'

import Home from '../views/home/home'
const Balance = asyncComponent(() => import("../views/balance/balance"))
const Help = asyncComponent(() => import("../views/help/help"))
import Game from '../views/game/Game'

class RouteConfig extends React.Component {
 render() {
   return (
     <HashRouter>
       <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/index" exact component={Home} />
         <Route path="/balance" component={Balance} />
         <Route path="help" component={Help} />
         <Route path="/game" exact component={Game} />
         <Redirect to="/" />
       </Switch>
     </HashRouter>
   )
 }
}

export default RouteConfig;