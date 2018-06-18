import * as React from 'react'
import { connect } from 'react-redux'
import * as ReactDOM from 'react-dom'
import history from '../../history'
import { envUrl } from '../../lib/constants'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as cmn from '../../styles/common.scss';
import { fetchUrlTypeEpic } from '../../actions/RoutePageTypeAction';
import CategoryComponent from '../CategoryComponent/CategoryComponent';
import ArticleComponent from '../ArticleComponent/ArticleComponent';


type Props = {
  dispatch: any,
  match: any
}

declare let window: any;
class RoutePageType extends React.Component<Props, any> {
  componentDidMount() {
    // this.props.dispatch(fetchUrlTypeEpic(this.props.match.params.routeType))
  }
  render() {
    return (
      <>
        <CategoryComponent />
        {/* <ArticleComponent /> */}
      </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutePageType)
