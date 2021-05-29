import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Components/login'
import Register from '../Components/register'
import Home from '../Components/Home/home'
import Game from '../Components/game'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="main">
                <Switch>
                    <Route path="/" component={Login} exact={true} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route path="/game/:link" component={Game} />
                </Switch>
            </div>

        </BrowserRouter>
    )
}

export default Router;