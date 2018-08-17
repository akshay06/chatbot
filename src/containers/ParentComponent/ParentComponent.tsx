import * as React from 'react'
import { connect } from 'react-redux'
import AutoFillLocation from '../AutoFillLocation/AutoFillLocation';
import ManualInput from '../ManualInput/ManualInput';
import ImageUplaoder from '../ImageUplaoder/ImageUplaoder';
import { unmountComponentAtNode } from 'react-dom';

type Props = {
  dispatch: any,
  commonReducer: any,
  component: any,
  steps: any,
  previousStep: any,
  step: any,
  triggerNextStep: any,
}

type State = {
  isDuplicateComponent: any
}

class ParentComponent extends React.Component<Props, State> {

  constructor(props){
    super(props)
    this.state = {
      isDuplicateComponent: false
    }
  }

  components = {
    AutoFillLocation: AutoFillLocation,
    ManualInput: ManualInput,
    ImageUplaoder: ImageUplaoder,
  };
  
  render() {
    const RenderComponent = this.components[this.props.component];
    return (
      <RenderComponent {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentComponent)