import * as React from 'react'
import { connect } from 'react-redux'
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
  componentWillMount() {
    let child1 = document.getElementById('locationField');
    if(child1) {
      child1.remove()
    }
  }
  componentDidMount() {
    this.initAutocomplete()
  }
  trigger = (value) => {
    document.getElementById('locationField').style.height = '40px';
    document.getElementById('locationField').style.pointerEvents = 'none';
    this.props.triggerNextStep({trigger: () => {gtmPush('manualLocation'); return 'user-location'}, value})
  }

  initAutocomplete = () => {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode'], componentRestrictions: {country: 'IND' }}
    );
    // autocomplete.setFields(
    //         ['address_components', '']);
    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress = () => {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    this.trigger(place.formatted_address);
  }

  render() {
    return (
      <>
        <div id="locationField">
          <input id="autocomplete" autoFocus placeholder="Start typing locality" type="text"></input>
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