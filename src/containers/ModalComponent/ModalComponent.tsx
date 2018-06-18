import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import * as common from '../../styles/common.scss'
import * as bsStyles from './../../styles/Bootstrap.scss'
import { reset_email_sent, reset_auth_details } from '../../actions/AuthAction'
import history from '../../history'
import { trackEvent } from '../../lib/pixels'

type Props = {
  componentdata: any,
  styleAttributes?: any,
  modaltype?: any,
  dispatch: any,
}

declare let window: any

class ModalComponent extends React.Component<Props, any>{
  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(e) {
    if (e.target.classList[0] === 'backdrop') {
      this.props.dispatch(this.props.modaltype)
      const close = ['OPENSIZEMODAL', 'OPENQTYMODAL', 'OPENMOBILEWISHLIST', 'OPENCOUPONMODAL', 'TOGGLE_SIZE_CHART_MODAL', 'TOGGLE_MOBILE_MODAL'].indexOf(this.props.modaltype.type) > -1
      if (close) {
        history.goBack()
      }
      this.props.dispatch(reset_email_sent(false))
      this.props.dispatch(reset_auth_details())
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = "auto"
      document.removeEventListener('click', this.toggleModal)
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = "hidden"
      document.addEventListener('click', this.toggleModal)
    }
  }

  render() {
    return <div className={[common.backdrop].join(' ')}>
      <div className={common.popup} style={this.props.styleAttributes}>
        <i className={common.popupClose} onClick={e => this.props.dispatch(this.props.modaltype)}>&times;</i>
        {this.props.componentdata}
      </div>
    </div>
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch: dispatch
  }
}

export default connect(null, mapDispatchToProps)(ModalComponent)

