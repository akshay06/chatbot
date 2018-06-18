import * as React from 'react'
import { connect } from 'react-redux'
import history from '../../../history'

import { context, fire, saveAccessCredentials, parsedQueryParams } from '../../../utils'
import { idle, newUser, login, forgotPassword, open_auth_modal, open_register_modal, open_forgotpassword_modal, open_otp_modal, newUserEmpty } from '../../../actions/AuthAction'

import * as cssCommon from './../../../styles/common.scss'
import * as cssStyles from '../Login.scss'
import * as cssAuth from '../Auth.scss'
import * as bsStyles from './../../../styles/Bootstrap.scss'
import { trackEvent } from '../../../lib/pixels';
const styles = { ...cssCommon, ...cssStyles, ...cssAuth, ...bsStyles }

type Props = {
  dispatch: any,
  auth: any,
  idle: boolean,
}

type State = {
  form: any,
  $valid: false,
  $submitted: false,
}

declare let window: any
class SignIn extends React.Component<Props, State>{
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: context,
        password: context,
      },
      $valid: false,
      $submitted: false,
    }
  }



  submit = (e) => {
    e.preventDefault()
    this.setState({ ...this.state.form, form: fire('submit', this.state.form, e) }, () => {
      if (this.state.form.$valid) {
        this.login()
      }
    })
  }

  login = () => {
    this.props.dispatch(idle(false))
    this.props.dispatch(login({ authentication: { email: this.state.form.email.value, password: this.state.form.password.value } }))
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props) || (nextProps.auth.login && nextProps.auth.login.error)) {
      if (nextProps.auth.isLoggedIn) {
        saveAccessCredentials(nextProps.auth.login)
        this.props.dispatch(open_auth_modal(false))
        let params = parsedQueryParams()
        if (params && params["ref"]) {
          history.push(`/${params["ref"]}`);
        }
      }
    }
  }
  render() {
    const f = this.state.form
    return <form className={styles.bodyHolder} name='loginForm' onSubmit={e => { trackEvent('login page', 'login', 'login button'); this.submit(e) }} noValidate autoComplete='off'>
      <div className={styles.xgroup}>
        <input
          type='email'
          name='email'
          value={f.email.value}
          maxLength={100}
          onChange={e => this.setState({ form: fire('change', f, e) })}
          onClick={e => this.setState({ form: fire('click', f, e) })}
          onBlur={e => this.setState({ form: fire('blur', f, e) })}
        />
        <span className={styles.bar}></span>
        <label>Email</label>
        {
          (f.$submitted || (f.email.touched && !f.email.focused)) &&
          <span className={styles.msgs}>
            {f.email.required.error && <p className={styles.error}>Email required</p>}
            {f.email.pattern && !f.email.required.error && <p className={styles.error}>Enter valid Email</p>}
          </span>
        }
      </div>
      <div>
        <div className={[styles.xgroup, styles.showHint].join(' ')}>
          <input
            type={f.password.password ? 'text' : 'password'}
            name='password'
            value={f.password.value}
            onChange={e => this.setState({ form: fire('change', f, e) })}
            onClick={e => this.setState({ form: fire('click', f, e) })}
            onBlur={e => this.setState({ form: fire('blur', f, e) })}
          />
          <span className={styles.bar}></span>
          {f.password.value && <span className={styles.hint} onClick={e => { f.password.password = !f.password.password; this.setState(this.state); }}>{f.password.password ? 'Hide' : 'Show'}</span>}
          <label>Password</label>
          {
            (f.$submitted || (f.password.touched && !f.password.focused)) &&
            <span className={styles.msgs}>
              {f.password.required.error && <p className={styles.error}>Password required</p>}
            </span>
          }
        </div>
      </div>
      <div className={styles.forgotPassword} onClick={e => this.props.dispatch(open_forgotpassword_modal(true))}>Forgot Password</div>
      {
        typeof window !== 'undefined' && location && location.pathname === '/checkout' &&
        <span style={{ marginBottom: 25, display: 'block', letterSpacing: 0.7 }}>Not a Member Yet ? <span style={{ color: '#4a90e2', cursor: 'pointer' }} onClick={() => this.props.dispatch(open_register_modal(true))}>Sign up here</span></span>
      }
      {
        this.props.auth.idle
          ? <button type='submit' className={styles.loginSubmit}>LOGIN</button>
          : <button className={[styles.loginSubmit, styles.busy].join(' ')}><p></p><p></p><p></p></button>
      }
    </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)