import * as React from 'react'
import { connect } from 'react-redux'
import * as bs from './../../styles/Bootstrap.scss';
import * as cmn from '../../styles/common.scss';
import * as st from './Home.scss';
import Grid from './Grid/Grid';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Slider from '../../sharedComponents/Slider/Slider';
import { trackEvent } from '../../lib/pixels';
import { homeIndexes } from '../../utils';
import GridComponent from './Grid/GridComponent/GridComponent';


type Props = {
  dispatch: any,
  location: any,
  commonReducer:any
}

const homePageData = require('./home.json').value;
class Home extends React.Component<Props> {

  constructor(props){
    super(props)
  }
  // componentDidMount(){
    
  // }

  // componentWillReceiveProps(nextProps){
    
  // }

  // componentWillUnmount(){
  // }
  
  render() {
    const deskBanner = homePageData.find(item => item.grid === 'desk-banner').data;
    const mobBanner = homePageData.find(item => item.grid === 'mob-banner').data;
    const pageList = homePageData.filter(single => ['desk-banner', 'mob-banner'].indexOf(single.grid) === -1 );
    return (<>
      <Header />
      <div className={cmn.containerHeight}>
        { deskBanner.length > 0 && 
          <div className={bs.hiddenXs}>
            <Slider navigation={{}}>
              {deskBanner.map((elem, index) => 
                GridComponent({elem, index})
              )}              
            </Slider>
          </div>
        }
        { mobBanner.length > 0 && 
          <div className={bs.visibleXs}>
            <Slider navigation={{}}>
              {mobBanner.map((elem, index) => 
                GridComponent({elem, index})
              )}
            </Slider>
          </div>
        }
        { pageList.length > 0 && 
          <>
            {pageList.map((elem, index) => 
              Grid({elem, index})
            )}
          </>
        }
      </div>
      <Footer />
    </>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)