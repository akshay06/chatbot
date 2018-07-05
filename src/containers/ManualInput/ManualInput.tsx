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
declare let google: any
declare let window: any;
type State = {
}
var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

class ManualInput extends React.Component<Props, State> {

  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log('did mount called');    
    this.initAutocomplete()
  }
  componentWillUnmount() {
    console.log('unmount called');
  }
  trigger = () => {
    console.log('called');
    this.props.triggerNextStep({trigger:'7'})
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('willrecieveprosp');    
  }
      

  initAutocomplete = () => {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress = () => {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.log('called', place);
    this.trigger();
  }

  geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  render() {
    return (
      <>
        <div id="locationField">
          <input id="autocomplete" placeholder="Enter your address"
            onFocus={this.geolocate} type="text"></input>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManualInput)