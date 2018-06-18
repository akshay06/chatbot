import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import { open_auth_modal, open_register_modal } from '../../actions/AuthAction'

import ForgotPassword from './ForgotPassword/ForgotPassword'
import ModalComponent from '../ModalComponent/ModalComponent'

import * as cssCommon from '../../styles/common.scss'
import * as cssStyles from './Login.scss'
import * as cssAuth from './Auth.scss'
import { trackEvent } from '../../lib/pixels';

const styles = { ...cssCommon, ...cssStyles, ...cssAuth }

type Props = {
  dispatch: any,
  auth: any,
}

class Login extends React.Component<Props, any> {
  constructor(props) {
    super(props)
  }

  renderLoginPage = () => {
    return <>
      {
        (this.props.auth.openauthModal || this.props.auth.openregisterModal) &&
        <>
          <div className={styles.popupHead}>
            <img src="https://i0.wp.com/thepaperlesspostcards.com/wp-content/uploads/2016/11/papreless-postcards-logo-website_1.png" />
            <div className={styles.popupBtnHold}>
              <button className={this.props.auth.openauthModal ? styles.open : ''} onClick={e => this.props.dispatch(open_auth_modal(true))}>LOGIN</button>
              <button className={this.props.auth.openregisterModal ? styles.open : ''} onClick={e => this.props.dispatch(open_register_modal(true))}>REGISTER</button>
            </div>
          </div>
          {this.props.auth.openauthModal ? <SignIn /> : ''}
          {this.props.auth.openregisterModal ? <SignUp /> : ''}
        </>
      }
      {
        this.props.auth.openforgotpasswordModal
          ? <>
            <div className={styles.popupHead}>
              <img src="https://i0.wp.com/thepaperlesspostcards.com/wp-content/uploads/2016/11/papreless-postcards-logo-website_1.png" />
              <div className={styles.popupBtnHold}>FORGOT PASSWORD</div>
            </div>
            {this.props.auth.openauthModal ? <SignIn /> : ''}
            {this.props.auth.openregisterModal ? <SignUp /> : ''}
            <ForgotPassword />
          </>
          : ''
      }
    </>
  }

  render() {
    const showModal = this.props.auth.openauthModal || this.props.auth.openforgotpasswordModal || this.props.auth.openregisterModal
    const styleAttributes = { background: 'white', margin: '0 auto', overflow: 'auto', position: 'relative', width: '100%' }
    return showModal ? <ModalComponent componentdata={this.renderLoginPage()} modaltype={open_auth_modal(false)} styleAttributes={styleAttributes} /> : ''
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch: dispatch
  }
}

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)