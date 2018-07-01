import * as React from 'react'
import { connect } from 'react-redux'
import { getLocation, updateCommon } from '../../actions/CommonAction';

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

class CitySelector extends React.Component<Props, State> {

  constructor(props){
    super(props)
    this.state = {userName: '', date : new Date()}
  }
  componentDidMount() {
    console.log('did mount called', this.state.date);
    this.props.dispatch(updateCommon({geoLocation: undefined}));
    this.mapFunction()
  }
  componentWillUnmount() {
    console.log('unmount called');
  }
  mapFunction = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else { 
        console.log('Geolocation is not supported by this browser.');
    }
  }
  showPosition = (position) => {
    this.props.dispatch(getLocation(position.coords));    
  }
  trigger = () => {
    this.props.triggerNextStep({trigger:'manualLocation'})
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('this.orps', this.state.date);
    if(nextProps.commonReducer.geoLocation && JSON.stringify(this.props.commonReducer.geoLocation) !== JSON.stringify(nextProps.commonReducer.geoLocation)) {
      console.log('will recieve if', this.state.date, nextProps.commonReducer.geoLocation[0].formatted_address);
      this.props.triggerNextStep({trigger:'7', value: nextProps.commonReducer.geoLocation[0].formatted_address})      
    }
  }

  render() {
    return (
      <div style={{ width: '100%' }}>Getting your location, please wait</div>
      // <div id="citySelector" style={{ width: '100%' }}>
      //   <div style={{lineHeight: '40px', textAlign: 'center', background: '#3f906d', color: 'white', marginBottom: '15px', borderRadius: '5px'}} onClick={this.mapFunction}>
      //     PICK MY CURRENT LOCATION
      //   </div>
      //   <div style={{ border: '1px solid #0f906d', padding: '10px', borderRadius: '5px'}} onClick={this.trigger}>
      //     <div style={{ color: '#0f906d', textAlign: 'center', marginBottom: '5px'}}>ENTER YOUR LOCATION MANUALLY</div>
      //     <div style={{ fontSize: '13px', letterSpacing: '0.5px', color: '#a6a7ab'}} >Example: Evershine Cosmic, Andheri West, 400102</div>
      //   </div>
      // </div>
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