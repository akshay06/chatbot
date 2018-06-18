import * as React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import * as bs from "../../styles/Bootstrap.scss"
import * as cmn from "../../styles/common.scss"
import * as st from "./Addresses.scss"
import * as auth from '../../containers/AuthModal/Auth.scss'
// import { getcountries,getlocation } from "../../actions/LocationsAction"
// import { updateaddressdetails,addaddress } from "../../actions/AddressAction"
// import { getaddresssubtype } from "../../actions/StaticsAction"
// import { getaddress, unselectedAddress } from './../../actions/AddressAction'
import { showToast } from './../../actions/ToastAction'

import history from "../../history"
import { trackEvent } from "../../lib/pixels"
import { context, fire } from '../../utils'


type Props = {
    router: any,
    dispatch: any,
    countries: any,
    address_type: any,
    viewAddress: any,
    address: any,
    name: any,
    mobile: any,
    alternate_mobile: any,
    addrLine1: any,
    addrLine2: any,
    landmark: any,
    state: any,
    city: any,
    pincode: any,
    country: any,
    sub_type: any,
    addaddressdetails: any,
    updateaddressdetails: any,
    from_myaccount?: any
};

type State = {
    form: any,
    $valid: any,
    $submitted: any,
}

declare let window: any;
declare let Object: any;

class Addresses extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: context,
                mobile: context,
                alternate_mobile: context,
                addrLine1: context,
                addrLine2: context,
                landmark: context,
                state: context,
                city: context,
                pincode: context,
                country: { ...context, value: 'India' },
                sub_type: context,
            },
            $valid: false,
            $submitted: false,
        };
    }

    componentWillMount() {
        //setting state on receiving props for prefilling form in edit mode
        // if (this.props.address && this.props.address !== " ") {
        //     this.setState({
        //         form: {
        //             name: this.props.address.name,
        //             mobile: this.props.address.mobile,
        //             alternate_mobile: this.props.address.alternate_mobile,
        //             addrLine1: this.props.address.address.split('\n')[0] || '',
        //             addrLine2: this.props.address.address.split('\n')[1] || '',
        //             landmark: this.props.address.landmark,
        //             state: this.props.address.state,
        //             city: this.props.address.city,
        //             pincode: this.props.address.pincode,
        //             country: this.props.address.country,
        //             sub_type: this.props.address.sub_type,
        //         }
        //     })
        // }
    }

    componentDidMount() {
        // this.props.dispatch(getcountries());
        // this.props.dispatch(getaddresssubtype());
        // if (typeof window !== 'undefined') {
        //     window.scrollTo(0, 0)
        // }
    }

    componentWillReceiveProps(nextProps) {
        // if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
        //     let validupdate = (JSON.stringify(nextProps.updateaddressdetails) !== JSON.stringify(this.props.updateaddressdetails) && nextProps.updateaddressdetails && nextProps.updateaddressdetails);
        //     let validadd = (JSON.stringify(nextProps.addaddressdetails) !== JSON.stringify(this.props.addaddressdetails) && nextProps.addaddressdetails && nextProps.addaddressdetails)
        //     if (validupdate || validadd) {
        //         // this.props.dispatch(getaddress())
        //         this.props.viewAddress(false)
        //         if (this.props.from_myaccount) {
        //             if (this.props.address && this.props.address.name) {
        //                 showToast('Address Updated Successfully')
        //             } else {
        //                 showToast('Address Address Successfully')
        //             }
        //         }
        //     }
        //     if (nextProps.pincodedetails && !nextProps.pincodedetails.error) {
        //         this.setState({ form: { city: nextProps.pincodedetails.city, state: nextProps.pincodedetails.state, pincode: nextProps.pincodedetails.pincode.toString() } })
        //     }
        // }
    }

    render() {
        let f = this.state.form
        return <form className={cmn.bodyHolder} autoComplete='off'>
            <div className={st.subType}>
                <span style={{ float: 'left', paddingTop: 6, opacity: 0.5 }} >Address Type</span>
                <div>
                    <span className={cmn.genderBtn}>
                        <input id='home' name='sub_type' value='home' onClick={e => this.setState({ form: fire('click', f, e) })} type='radio' style={{ display: 'none' }} />
                        <label htmlFor='home'>WORK</label>
                    </span>
                    <span className={cmn.genderBtn}>
                        <input id='work' name='sub_type' value='work' onClick={e => this.setState({ form: fire('click', f, e) })} type='radio' style={{ display: 'none' }} />
                        <label htmlFor='work'>HOME</label>
                    </span>
                </div>
                {f.sub_type.required.error && <p className={cmn.error}>Address type is required</p>}
            </div>
            <div className={cmn.xgroup}>
                <input
                    type='text'
                    name='addrLine1'
                    value={f.addrLine1.value}
                    onChange={e => this.setState({ form: fire('change', f, e) })}
                    onClick={e => this.setState({ form: fire('click', f, e) })}
                    onBlur={e => this.setState({ form: fire('blur', f, e) })}
                />
                <span className={cmn.bar}></span>
                <label>Flat No. Buiding Name, Society</label>
                {
                    (f.$submitted || (f.addrLine1.touched && !f.addrLine1.focused)) &&
                    <span className={cmn.msgs}>
                        {f.addrLine1.required.error && <p className={cmn.error}>Address is required</p>}
                        {f.addrLine1.pattern && !f.addrLine1.required.error && <p className={cmn.error}>Enter valid Address 1</p>}
                    </span>
                }
            </div>
            <div className={cmn.xgroup}>
                <input
                    type='text'
                    name='addrLine2'
                    value={f.addrLine2.value}
                    onChange={e => this.setState({ form: fire('change', f, e) })}
                    onClick={e => this.setState({ form: fire('click', f, e) })}
                    onBlur={e => this.setState({ form: fire('blur', f, e) })}
                />
                <span className={cmn.bar}></span>
                <label>Road Name, Locality</label>
                {
                    (f.$submitted || (f.addrLine2.touched && !f.addrLine2.focused)) &&
                    <span className={cmn.msgs}>
                        {f.addrLine2.required.error && <p className={cmn.error}>Address is required</p>}
                        {f.addrLine2.pattern && !f.addrLine2.required.error && <p className={cmn.error}>Enter valid Address 2</p>}
                    </span>
                }
            </div>
            <div className={cmn.xgroup}>
                <input
                    type='text'
                    name='landmark'
                    value={f.landmark.value}
                    maxLength={60}
                    onChange={e => this.setState({ form: fire('change', f, e) })}
                    onClick={e => this.setState({ form: fire('click', f, e) })}
                    onBlur={e => this.setState({ form: fire('blur', f, e) })}
                />
                <span className={cmn.bar}></span>
                <label>Nearby Landmark</label>
                {
                    (f.$submitted || (f.landmark.touched && !f.landmark.focused)) &&
                    <span className={cmn.msgs}>
                        {f.landmark.required.error && <p className={cmn.error}>Landmark is required</p>}
                        {f.landmark.pattern && !f.landmark.required.error && <p className={cmn.error}>Enter valid landmark</p>}
                    </span>
                }
            </div>
            <div style={{ float: 'left', width: 'calc(50% - 2.5px)' }}>
                <div className={cmn.xgroup}>
                    <input
                        type='text'
                        name='pincode'
                        maxLength={6}
                        value={f.pincode.value}
                        onChange={e => this.setState({ form: fire('change', f, e) })}
                        onClick={e => this.setState({ form: fire('click', f, e) })}
                        onBlur={e => this.setState({ form: fire('blur', f, e) })}
                    />
                    <span className={cmn.bar}></span>
                    <label>Postal Code</label>
                    {
                        (f.$submitted || (f.pincode.touched && !f.pincode.focused)) &&
                        <span className={cmn.msgs}>
                            {f.pincode.required.error && <p className={cmn.error}>Pincode is required</p>}
                            {f.pincode.pattern && !f.pincode.required.error && <p className={cmn.error}>Enter valid pincode</p>}
                        </span>
                    }
                </div>
            </div>
            <div style={{ float: 'right', width: 'calc(50% - 2.5px)' }}>
                <div className={cmn.xgroup}>
                    <input
                        type='text'
                        name='city'
                        value={f.city.value}
                        onChange={e => this.setState({ form: fire('change', f, e) })}
                        onClick={e => this.setState({ form: fire('click', f, e) })}
                        onBlur={e => this.setState({ form: fire('blur', f, e) })}
                    />
                    <span className={cmn.bar}></span>
                    <label>City</label>
                    {
                        (f.$submitted || (f.city.touched && !f.city.focused)) &&
                        <span className={cmn.msgs}>
                            {f.city.required.error && <p className={cmn.error}>City is required</p>}
                            {f.city.pattern && !f.city.required.error && <p className={cmn.error}>Enter valid city</p>}
                        </span>
                    }
                </div>
            </div>
            <div style={{ float: 'left', width: 'calc(50% - 2.5px)' }}>
                <div className={cmn.xgroup}>
                    <input
                        type='text'
                        name='state'
                        value={f.state.value}
                        onChange={e => this.setState({ form: fire('change', f, e) })}
                        onClick={e => this.setState({ form: fire('click', f, e) })}
                        onBlur={e => this.setState({ form: fire('blur', f, e) })}
                    />
                    <span className={cmn.bar}></span>
                    <label>State</label>
                    {
                        (f.$submitted || (f.state.touched && !f.state.focused)) &&
                        <span className={cmn.msgs}>
                            {f.state.required.error && <p className={cmn.error}>state is required</p>}
                            {f.state.pattern && !f.state.required.error && <p className={cmn.error}>Enter valid state</p>}
                        </span>
                    }
                </div>
            </div>
            <div style={{ float: 'right', width: 'calc(50% - 2.5px)' }}>
                <div className={cmn.xgroup}>
                    <input
                        type='text'
                        name='country'
                        value={f.country.value}
                        readOnly
                        onChange={e => this.setState({ form: fire('change', f, e) })}
                        onClick={e => this.setState({ form: fire('click', f, e) })}
                        onBlur={e => this.setState({ form: fire('blur', f, e) })}
                    />
                    <span className={cmn.bar}></span>
                    <label>Country</label>
                </div>
            </div>
            <div className={cmn.xgroup}>
                <input
                    type='text'
                    name='mobile'
                    maxLength={10}
                    value={f.mobile.value}
                    onChange={e => this.setState({ form: fire('change', f, e) })}
                    onClick={e => this.setState({ form: fire('click', f, e) })}
                    onBlur={e => this.setState({ form: fire('blur', f, e) })}
                />
                <span className={cmn.bar}></span>
                <label>Contact No.</label>
                {
                    (f.$submitted || (f.mobile.touched && !f.mobile.focused)) &&
                    <span className={cmn.msgs}>
                        {f.mobile.required.error && <p className={cmn.error}>Contact no. is required</p>}
                        {f.mobile.pattern && !f.mobile.required.error && <p className={cmn.error}>Enter valid contact no.</p>}
                    </span>
                }
            </div>
            <div className={cmn.xgroup}>
                <input
                    type='text'
                    name='alternate_mobile'
                    maxLength={10}
                    value={f.alternate_mobile.value}
                    onChange={e => this.setState({ form: fire('change', f, e) })}
                    onClick={e => this.setState({ form: fire('click', f, e) })}
                    onBlur={e => this.setState({ form: fire('blur', f, e) })}
                />
                <span className={cmn.bar}></span>
                <label>Alternate Contact No.</label>
                {
                    (f.$submitted || (f.alternate_mobile.touched && !f.alternate_mobile.focused)) &&
                    <span className={cmn.msgs}>
                        {f.alternate_mobile.required.error && <p className={cmn.error}>Contact no. is required</p>}
                        {f.alternate_mobile.pattern && !f.alternate_mobile.required.error && <p className={cmn.error}>Enter valid contact no.</p>}
                    </span>
                }
            </div>
            <div className={[bs.colMd6, bs.colLg6, cmn.noPd].join(' ')} >
                <input className={st.cancelButton} type='button' value='CANCEL' onClick={e => { window.scrollTo(0, 0); this.props.viewAddress(false) }} />
                <input className={st.submitButton} type='submit' value='SUBMIT' />
            </div>
        </form>
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch
    };
}

function mapStateToProps(state, ownProps) {
    return {
        router: state.router,
        address_type: state.statics && state.statics.addresssubtype,
        countries: state.locations && state.locations.countries,
        updateaddressdetails: state.address && state.address.updateaddressdetails,
        addaddressdetails: state.address && state.address.addaddressdetails,
        pincodedetails: state.locations && state.locations.location
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Addresses)