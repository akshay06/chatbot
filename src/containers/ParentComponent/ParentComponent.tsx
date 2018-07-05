import * as React from 'react'
import { connect } from 'react-redux'
import AutoFillLocation from '../AutoFillLocation/AutoFillLocation';
import ManualInput from '../ManualInput/ManualInput';
import ImageUplaoder from '../ImageUplaoder/ImageUplaoder';

type Props = {
  dispatch: any,
  commonReducer: any,
  component: any
}

type State = {
}

class ParentComponent extends React.Component<Props, State> {

  constructor(props){
    super(props)
  }
  componentDidMount() {
  }
  
  render() {
    const RenderComponent = this.props.component;
    return (
      <RenderComponent />
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