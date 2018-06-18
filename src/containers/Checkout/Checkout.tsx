import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SignIn from '../../containers/AuthModal/SignIn/SignIn'
import SignUp from '../../containers/AuthModal/SignUp/SignUp'
import ForgotPassword from '../../containers/AuthModal/ForgotPassword/ForgotPassword'
import Addresses from '../../containers/Addresses/Addresses'
import Payments from '../../containers/Payments/Payments'
import { open_register_modal } from '../../actions/AuthAction'
import * as hed from '../../containers/Header/Header.scss'
import * as bs from '../../styles/Bootstrap.scss'
import * as cmn from '../../styles/common.scss'
import * as st from './Checkout.scss'
import { step } from '../../actions/CheckoutAction'

type Props = {
    dispatch: any,
    auth: any,
    step: any,
}

declare let window: any
class Checkout extends React.Component<Props, any> {
    componentDidMount() {
        this.step(1)
        this.props.dispatch(open_register_modal(true))
    }

    renderLoginPage = () => {
        return <>
            {this.props.auth.openauthModal ? <><div className={st.label}>Login</div><SignIn /></> : ''}
            {this.props.auth.openregisterModal ? <><div className={st.label}>Sign up</div><SignUp /></> : ''}
            {this.props.auth.openforgotpasswordModal ? <><div className={st.label}>Forgot password</div><ForgotPassword /></> : ''}
        </>
    }

    step = count => {
        if (this.props.step !== count) {
            this.props.dispatch(step(count))
        }
    }

    render() {
        return (
            <div>
                <a href='/' className={hed.header}>
                    <img className={hed.logo} src="https://i0.wp.com/thepaperlesspostcards.com/wp-content/uploads/2016/11/papreless-postcards-logo-website_1.png" alt="logo" />
                </a>
                <div className={cmn.containerHeight}>
                    <div className={[bs.container, bs.noPd].join(' ')}>
                        <div className={[bs.colXs12, bs.colSm7, bs.noPd].join(' ')}>
                            <ul className={st.tabSteps}>
                                <li className={[bs.colXs12, bs.colSm4].join(' ')} onClick={e => this.step(1)}>
                                    <p className={[st.ball, st.one, this.props.step === 1 ? st.active : ''].join(' ')}></p>
                                    <pre>Login / Sign up</pre>
                                </li>
                                <li className={[bs.colXs12, bs.colSm4, bs.hiddenXs].join(' ')} onClick={e => this.step(2)}>
                                    <p className={[st.ball, st.two, this.props.step === 2 ? st.active : ''].join(' ')}></p>
                                    <pre>Address</pre>
                                </li>
                                <li className={[bs.colXs12, bs.colSm4, bs.hiddenXs].join(' ')} onClick={e => this.step(3)}>
                                    <p className={[st.ball, st.three, this.props.step === 3 ? st.active : ''].join(' ')}></p>
                                    <pre>Payment</pre>
                                </li>
                                {
                                    this.props.step === 1 &&
                                    <div className={[bs.colXs12, bs.noPd].join(' ')} style={{ maxWidth: 400 }}>
                                        {this.renderLoginPage()}
                                    </div>
                                }
                                <li className={[bs.colXs12, bs.colSm4, bs.visibleXs].join(' ')} onClick={e => this.step(2)}>
                                    <p className={[st.ball, st.two, this.props.step === 2 ? st.active : ''].join(' ')}></p>
                                    <pre>Address</pre>
                                </li>
                                {
                                    this.props.step === 2 &&
                                    <div className={[bs.colXs12, bs.noPd].join(' ')} style={{ maxWidth: 555 }}>
                                        {<><div className={st.label}>Add Address</div><Addresses /></>}
                                    </div>
                                }
                                <li className={[bs.colXs12, bs.colSm4, bs.visibleXs].join(' ')} onClick={e => this.step(3)}>
                                    <p className={[st.ball, st.three, this.props.step === 3 ? st.active : ''].join(' ')}></p>
                                    <pre>Payment</pre>
                                </li>
                                {
                                    this.props.step === 3 &&
                                    <div className={[bs.colXs12, bs.noPd].join(' ')} style={{ maxWidth: 400 }}>
                                        {<><div className={st.label}>Payment Details</div><Payments /></>}
                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    }
}

const mapStateToProps = (state, ownProps: any) => {
    return {
        auth: state.auth,
        step: state.checkoutReducer && state.checkoutReducer.step,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

