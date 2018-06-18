import * as React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Routes from '../../router'
import store from '../../store'

declare let document: any

export class App extends React.Component<any, any>{

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}