import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Bye } from './pages/Bye'

export const Routes: React.FC = () => {  
  return (
    <BrowserRouter>
      <div>
        <header>
            <div>
                <div>
                    <Link to="/">home</Link>
                </div>

                <div>
                    <Link to="/login">login</Link>
                </div>

                <div>
                    <Link to="/register">register</Link>
                </div>
                
                <div>
                    <Link to="/bye">bye</Link>
                </div>
            </div>
        </header>
        
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/bye" component={Bye}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

