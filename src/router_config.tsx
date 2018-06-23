import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home/Home'

const routes = [{
  path: '*',
  exact: false,
  component: Home,
  id: 'random'
}]

const RoutesConfig = () => {
  return (
    <Switch>{
      routes.map((route) => {
        return (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        )
      })
    }
    </Switch>
  )
}

export default RoutesConfig