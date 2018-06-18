import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home/Home'
import RoutePageType from './containers/RoutePageType/RoutePageType'
import Product from './containers/Product/Product'
import Checkout from './containers/Checkout/Checkout'
import OrderStatus from './containers/OrderStatus/OrderStatus'

const routes = [{
  path: '/checkout',
  exact: true,
  component: Checkout,
  id: 'checkout',
}, {
  path: '/ordersuccess',
  exact: true,
  component: OrderStatus,
  id: 'ordersuccess',
}, {
  path: '/orderfailure',
  exact: true,
  component: OrderStatus,
  id: 'orderfailure',
}, {
  path: '/orderpending',
  exact: true,
  component: OrderStatus,
  id: 'orderpending',
}, {
  path: '/product',
  exact: true,
  component: Product,
  id: 'product',
}, {
  path: '/:routeType',
  exact: true,
  component: RoutePageType,
  id: 'routeType',
}, {
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