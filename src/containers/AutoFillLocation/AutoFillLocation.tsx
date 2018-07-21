import * as React from 'react'
import { connect } from 'react-redux'
import { getLocation, updateCommon } from '../../actions/CommonAction';
import { gtmPush } from '../../pixels';

type Props = {
  dispatch: any,
  steps: any,
  previousStep: any,
  step: any,
  triggerNextStep: any,
  location: any,
  commonReducer: any
}

type State = {
  userName: any,
  date: any
}
declare let window: any;

class AutoFillLocation extends React.Component<Props, State> {

  constructor(props){
    super(props)
    this.state = {userName: '', date : new Date()}
  }
  componentWillMount() {
    let child1 = document.getElementById('autoFillLocation');
    if(child1) {
      child1.remove()
    }
  }
  componentDidMount() {
    this.props.dispatch(updateCommon({geoLocation: undefined}));
    this.mapFunction()
  }
  mapFunction = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.error);
    } else { 
        console.log('Geolocation is not supported by this browser.');
        this.trigger('Geolocation is not supported by this browser.');
    }
  }
  showPosition = (position) => {
    this.props.dispatch(getLocation(position.coords));    
  }
  error = (error) => {
    this.trigger(error.message);
  }
  trigger = (value) => {
    this.props.triggerNextStep({trigger: () => {gtmPush('autoFillLocation'); return '8'}, value})
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.commonReducer.geoLocation && JSON.stringify(this.props.commonReducer.geoLocation) !== JSON.stringify(nextProps.commonReducer.geoLocation)) {
      this.props.triggerNextStep({trigger: () => {gtmPush('autoFillLocation'); return 'user-location'}, value: nextProps.commonReducer.geoLocation[0].formatted_address})      
    }
  }

  render() {
    return (
      <div id="autoFillLocation" style={{ width: '100%' }}>Getting your location, please wait...</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AutoFillLocation)