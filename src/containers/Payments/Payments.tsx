import * as React from 'react'
import { connect } from 'react-redux'
import * as cm from './../../styles/common.scss'
import * as st from './Payments.scss'
import * as  auth from '../../containers/AuthModal/Auth.scss'
import { context, fire } from '../../utils'
type Props = {
    dispatch: any,
    auth: any,
}

type State = {
    form: any,
    $valid: any,
    $submitted: any,
}

declare let window: any
class Payments extends React.Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                cno: context,
                cname: context,
                month: 'MM',
                year: 'YYYY',
                cvv: context,
            },
            $valid: false,
            $submitted: false,
        };
    }

    componentDidMount() {

    }

    renderCreditDebitCard = () => {
        let f = this.state.form
        return <>
            <div className={cm.xgroup}>
                <input
                    type='text'
                    name='cno'
                    maxLength={6}
                    value={f.cno.value}
                    onChange={e => this.setState({ form: fire('change', f, e) })}
                    onClick={e => this.setState({ form: fire('click', f, e) })}
                    onBlur={e => this.setState({ form: fire('blur', f, e) })}
                />
                <span className={cm.bar}></span>
                <label>Card number</label>
                {
                    (f.$submitted || (f.cno.touched && !f.cno.focused)) &&
                    <span className={cm.msgs}>
                        {f.cno.required.error && <p className={cm.error}>Card number is required</p>}
                        {f.cno.pattern && !f.cno.required.error && <p className={cm.error}>Enter valid Card number</p>}
                    </span>
                }
            </div>
            <div className={cm.xgroup}>
                <input
                    type='text'
                    name='cname'
                    value={f.cname.value}
                    onChange={e => this.setState({ form: fire('change', f, e) })}
                    onClick={e => this.setState({ form: fire('click', f, e) })}
                    onBlur={e => this.setState({ form: fire('blur', f, e) })}
                />
                <span className={cm.bar}></span>
                <label>Name on card</label>
                {
                    (f.$submitted || (f.cname.touched && !f.cname.focused)) &&
                    <span className={cm.msgs}>
                        {f.cname.required.error && <p className={cm.error}>Name on card is required</p>}
                        {f.cname.pattern && !f.cname.required.error && <p className={cm.error}>Enter valid name</p>}
                    </span>
                }
            </div>
            <div style={{ float: 'left', width: 'calc(50% - 2.5px)' }}>
                <div className={cm.xgroup}>
                    <input
                        type='text'
                        name='month'
                        maxLength={2}
                        value={f.month.value}
                        onChange={e => this.setState({ form: fire('change', f, e) })}
                        onClick={e => this.setState({ form: fire('click', f, e) })}
                        onBlur={e => this.setState({ form: fire('blur', f, e) })}
                    />
                    <span className={cm.bar}></span>
                    <label>Expiry Month</label>
                    {
                        (f.$submitted || (f.month.touched && !f.month.focused)) &&
                        <span className={cm.msgs}>
                            {f.month.required.error && <p className={cm.error}>Month is required</p>}
                            {f.month.pattern && !f.month.required.error && <p className={cm.error}>Enter valid month</p>}
                        </span>
                    }
                </div>
            </div>
            <div style={{ float: 'right', width: 'calc(50% - 2.5px)' }}>
                <div className={cm.xgroup}>
                    <input
                        type='text'
                        name='year'
                        maxLength={4}
                        value={f.year.value}
                        onChange={e => this.setState({ form: fire('change', f, e) })}
                        onClick={e => this.setState({ form: fire('click', f, e) })}
                        onBlur={e => this.setState({ form: fire('blur', f, e) })}
                    />
                    <span className={cm.bar}></span>
                    <label>Expiry Year</label>
                    {
                        (f.$submitted || (f.year.touched && !f.year.focused)) &&
                        <span className={cm.msgs}>
                            {f.year.required.error && <p className={cm.error}>Year is required</p>}
                            {f.year.pattern && !f.year.required.error && <p className={cm.error}>Enter valid year</p>}
                        </span>
                    }
                </div>
            </div>
            <div style={{ float: 'left', width: 'calc(50% - 2.5px)' }}>
                <div className={cm.xgroup}>
                    <input
                        type='text'
                        name='cvv'
                        maxLength={4}
                        value={f.cvv.value}
                        onChange={e => this.setState({ form: fire('change', f, e) })}
                        onClick={e => this.setState({ form: fire('click', f, e) })}
                        onBlur={e => this.setState({ form: fire('blur', f, e) })}
                    />
                    <span className={cm.bar}></span>
                    <label>Card CVV</label>
                    {
                        (f.$submitted || (f.cvv.touched && !f.cvv.focused)) &&
                        <span className={cm.msgs}>
                            {f.cvv.required.error && <p className={cm.error}>CVV is required</p>}
                            {f.cvv.pattern && !f.cvv.required.error && <p className={cm.error}>Enter valid CVV</p>}
                        </span>
                    }
                </div>
            </div>
            {
                this.props.auth.idle
                    ? <button type='submit' className={auth.loginSubmit}>PLACE ORDER</button>
                    : <button className={[auth.loginSubmit, cm.busy].join(' ')}><p></p><p></p><p></p></button>
            }
        </>
    }

    render() {
        return <div className={cm.bodyHolder}>
            {this.renderCreditDebitCard()}
        </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)

