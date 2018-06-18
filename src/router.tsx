import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import RoutesConfig from './router_config';
import history from './history'
import { connect } from 'react-redux'

import { Dispatch } from './utils';

declare let document: any;
declare let window: any;

type Props = {
  dispatch: any,
  loader: any,
  toast: any,
  auth: any,
  appObject: any
}

type States = {
}
class Routes extends React.Component<Props, States>{

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    Dispatch.set(this.props.dispatch);
    return (
      <ConnectedRouter history={history} >
        <>
          <RoutesConfig />
        </>
      </ConnectedRouter>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
  }
}

const mapStateToProps = (state, ownProps: any) => {
  return {
    loader: state.loader,
    toast: state.toast,
    auth: state.auth,
    appObject: state.appObject
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)

