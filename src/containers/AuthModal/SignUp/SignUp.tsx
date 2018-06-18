import * as React from 'react'
import { connect } from 'react-redux'

import { idle, open_auth_modal, open_register_modal, open_otp_modal, register } from '../../../actions/AuthAction'
import { context, fire } from '../../../utils'

import * as cssCommon from './../../../styles/common.scss'
import * as cssStyles from '../Login.scss'
import * as cssAuth from '../Auth.scss'
import * as bsStyles from './../../../styles/Bootstrap.scss'
const styles = { ...cssCommon, ...cssStyles, ...cssAuth, ...bsStyles }

type Props = {
  dispatch: any,
  auth: any,
  idle: boolean,
}

type State = {
  form: any,
  $valid: any,
  $submitted: any,
}

declare let window: any
class SignUp extends React.Component<Props, State>{
  constructor(props) {
    super(props)
    this.state = {
      form: {
        name: context,
        lname: context,
        email: context,
        password: { ...context, minLength: { value: 6 } },
        gender: { ...context, required: { value: false } },
      },
      $valid: false,
      $submitted: false,
    }
  }

  submit = (e) => {
    e.preventDefault()
    this.props.dispatch(idle(false))
    this.setState({ ...this.state.form, form: fire('submit', this.state.form, e) }, () => {
      if (this.state.form.$valid) {
        this.props.dispatch(register({
          user: {
            first_name: this.state.form.name.value,
            last_name: this.state.form.lname.value,
            email: this.state.form.email.value,
            password: this.state.form.password.value,
            gender: this.state.form.gender.value,
          }
        }))
      }
    })
  }

  componentWillUnmount() {
    // this.props.dispatch(open_register_modal(false))
  }

  render() {
    const f = this.state.form
    return <form className={styles.bodyHolder} name='signUpForm' onSubmit={e => { this.submit(e) }} noValidate autoComplete='off'>
      <div className={styles.xgroup}>
        <input
          type='text'
          name='name'
          value={f.name.value}
          onChange={e => this.setState({ form: fire('change', f, e) })}
          onClick={e => this.setState({ form: fire('click', f, e) })}
          onBlur={e => this.setState({ form: fire('blur', f, e) })}
        />
        <span className={styles.bar}></span>
        <label>Full Name</label>
        {
          (f.$submitted || (f.name.touched && !f.name.focused)) &&
          <span className={styles.msgs}>
            {f.name.required.error && <p className={styles.error}>Full name is required</p>}
            {f.name.pattern && !f.name.required.error && <p className={styles.error}>Enter valid full name</p>}
          </span>
        }
      </div>
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
        {(
          this.props.auth.register && this.props.auth.register.payload && this.props.auth.register.payload.error && this.props.auth.register.payload.error.message && this.props.auth.register.payload.error.message.email && this.props.auth.register.payload.error.message.email['0']) &&
          <span className={styles.msgs}><p className={styles.error}>{this.props.auth.register.payload.error.message.email['0']}</p></span>
        }
        {
          (f.$submitted || (f.email.touched && !f.email.focused)) &&
          <span className={styles.msgs}>
            {f.email.required.error && <p className={styles.error}>Email Id is required</p>}
            {f.email.pattern && !f.email.required.error && <p className={styles.error}>Enter valid email id</p>}
          </span>
        }
      </div>
      <div className={styles.xgroup}>
        <input
          type='password'
          name='password'
          value={f.password.value}
          minLength={6}
          onChange={e => this.setState({ form: fire('change', f, e) })}
          onClick={e => this.setState({ form: fire('click', f, e) })}
          onBlur={e => this.setState({ form: fire('blur', f, e) })}
        />
        <span className={styles.bar}></span>
        <label>Password</label>
        {
          (f.$submitted || (f.password.touched && !f.password.focused)) &&
          <span className={styles.msgs}>
            {f.password.required.error && <p className={styles.error}>Password is required</p>}
            {!f.password.required.error && f.password.minLength.error && <p className={styles.error}>Enter at least 6 charcters</p>}
          </span>
        }
      </div>
      {
        typeof window !== 'undefined' && location && location.pathname === '/checkout' &&
        <span style={{ marginBottom: 25, display: 'block', letterSpacing: 0.7 }}>Already a Member ? <span style={{ color: '#4a90e2', cursor: 'pointer' }} onClick={() => this.props.dispatch(open_auth_modal(true))}>Login here</span></span>
      }
      {
        this.props.auth.idle
          ? <button type='submit' className={styles.loginSubmit}>SIGN UP</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)