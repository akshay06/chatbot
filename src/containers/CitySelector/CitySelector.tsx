import * as React from 'react'
import { connect } from 'react-redux'
import { getLocation } from '../../actions/CommonAction';

type Props = {
  dispatch: any,
  steps: any,
  previousStep: any,
  step: any,
  triggerNextStep: any,
  location: any,
}

type State = {
  userName: any,
}
declare let window: any;

class CitySelector extends React.Component<Props, State> {

  constructor(props){
    super(props)
  }
  mapFunction = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else { 
        console.log('Geolocation is not supported by this browser.');
    }
  }
  showPosition = (position) => {
    console.log('asas', position);
    this.props.dispatch(getLocation(position.coords));
    this.props.triggerNextStep({trigger:'autoLocation'})
  }
  trigger = () => {
    this.props.triggerNextStep({trigger:'manualLocation'})
  }
  
  componentWillMount() {
    
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
      <div onClick={this.mapFunction}>
        PICK MY CURRENT LOCATION
      </div>
      <div onClick={this.trigger}>
        <div>ENTER YOUR LOCATION MANUALLY</div>
        <div>Example: Evershine Cosmic, Andheri West, 400102</div>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

const mapStateToProps = (state, ownProps: any) => {
  return {
    commonReducer: state.common,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySelector)