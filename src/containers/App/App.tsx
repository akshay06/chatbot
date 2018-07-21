import * as React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Routes from '../../router'
import store from '../../store'
import { loadGtmScript } from '../../pixels';

declare let document: any

export class App extends React.Component<any, any>{

  componentDidMount() {
    loadGtmScript()
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}