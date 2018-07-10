import * as React from 'react'
import { connect } from 'react-redux'
import { getLocation, updateCommon } from '../../actions/CommonAction';

type Props = {
  dispatch: any,
}

type State = { 
}
declare let window: any;

class DeleteComponent extends React.Component<Props, State> {

  constructor(props){
    super(props)
  }
  componentDidMount() {
    // let child1 = document.getElementById('locationField');
    // let child2 = document.getElementById('autoFillLocation');
    // console.log('childs', child1, child2);
    // if(child1) {
    //   child1.remove()
    // }
    // if(child2) {
    //   child2.remove();
    // }
  }
  render() {
    return (
      <></>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteComponent)