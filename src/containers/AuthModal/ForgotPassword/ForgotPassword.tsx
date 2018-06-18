import * as React from 'react'
import { connect } from 'react-redux'
import { idle, forgotPassword, reset_email_sent, open_auth_modal, open_register_modal, open_forgotpassword_modal, open_otp_modal } from './../../../actions/AuthAction'
import { context, fire } from '../../../utils'

import * as cssAuth from '../Auth.scss'
import * as cssStyles from './ForgotPassword.scss'
import * as bsStyles from '../../../styles/Bootstrap.scss'
import * as cssCommon from '../../../styles/common.scss'
import { trackEvent } from '../../../lib/pixels';
const styles = { ...cssCommon, ...cssStyles, ...cssAuth }

type Props = {
  dispatch: any,
  auth: any
  idle: boolean,
}

type State = {
  form: any,
}

class ForgotPassword extends React.Component<Props, State>{
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: context,
        $valid: false,
        $submitted: false,
      }
    }
  }


  submit = e => {
    e.preventDefault()
    this.props.dispatch(idle(false))
    this.setState({ ...this.state.form, form: fire('submit', this.state.form, e) }, () => {
      if (this.state.form.$valid) {
        this.props.dispatch(forgotPassword({ email: this.state.form.email.value }))
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth && nextProps.auth.forgot && nextProps.auth.forgot.payload && nextProps.auth.forgot.payload.error && nextProps.auth.forgot.payload.error.message) {
      let timerid
      timerid ? clearTimeout(timerid) : undefined
      timerid = setTimeout(() => { nextProps.auth.forgot['payload'] = undefined; this.setState(this.state); }, 3000);
    }
  }

  componentWillUnmount() {
    // this.props.dispatch(open_forgotpassword_modal(false))
  }
  render() {
    const f = this.state.form
    return !this.props.auth.emailSent ?
      <form className={styles.bodyHolder} name='forgotForm' onSubmit={e => this.submit(e)} noValidate autoComplete='off'>
        <span className={styles.forgotLine}>Please enter your email id to reset your password.</span>
        <div className={styles.xgroup}>
          <input
            type='email'
            name='email'
            value={f.email.value}
            onChange={e => this.setState({ form: fire('change', f, e) })}
            onClick={e => this.setState({ form: fire('click', f, e) })}
            onBlur={e => this.setState({ form: fire('blur', f, e) })}
          />
          <span className={styles.bar}></span>
          <label>Email Id</label>
          {
            (f.$submitted || (f.email.touched && !f.email.focused)) &&
            <span className={styles.msgs}>
              {f.email.required.error && <p className={styles.error}>Email Id is required</p>}
              {f.email.pattern && !f.email.required.error && <p className={styles.error}>Enter valid email id</p>}
            </span>
          }
        </div>
        {
          this.props.auth.idle
            ? <button type='submit' className={styles.loginSubmit}>SUBMIT</button>
            : <button className={[styles.loginSubmit, styles.busy].join(' ')}><p></p><p></p><p></p></button>
        }
        <span className={styles.btnWired} onClick={e => this.props.dispatch(open_auth_modal(true))}>GO BACK TO LOGIN</span>
      </form>
      : <>
        <div style={{ fontSize: '16px', color: '#ff6a6a', marginBottom: '20px', textAlign: 'center' }}>Success!</div>
        {(this.props.auth.forgot && this.props.auth.forgot.message) && <div className="text-statement" style={{ display: 'block', marginBottom: '30px', opacity: 0.5, textAlign: 'center' }}>{this.props.auth.forgot.message}</div>}
        <div>
          <button style={{ width: '85%', height: '40px', backgroundColor: '#ff6a6a', color: '#fff', borderColor: '1px solid #51ccc', letterSpacing: '2px', outline: '0 !important' }}
            onClick={e => { this.props.dispatch(open_auth_modal(true)); this.props.dispatch(reset_email_sent(false)); }}>BACK TO LOGIN</button>
        </div>
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)