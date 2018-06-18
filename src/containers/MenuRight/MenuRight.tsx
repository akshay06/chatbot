import * as React from 'react'
import { connect } from 'react-redux'
import { open_auth_modal } from '../../actions/AuthAction'
import * as cm from '../../styles/common.scss'
type Props = {
    dispatch: any,
}

class MenuRight extends React.Component<Props, any> {
    render() {
        return <>
            <a href="">About us</a>
            <a href="">Official Merchandise</a>
            <button className={cm.bluebtn} onClick={() => this.props.dispatch(open_auth_modal(true))}>Login</button>
        </>
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    }
}

const mapStateToProps = (state, ownProps: any) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuRight)

