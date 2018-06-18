import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CategoryListItem from '../CategoryListItem/CategoryListItem';
import * as cmn from '../../styles/common.scss';
import * as bs from '../../styles/Bootstrap.scss';
import * as st from './CategoryComponent.scss';
// import * as category from './category.json';

type Props = {
  dispatch: any,
}
const categoryData = require('./category.json')

declare let window: any;
class CategoryComponent extends React.Component<Props, any> {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log('xxx', categoryData);
  }
  render() {
    return (
      <>
        <Header />
        <div className={cmn.containerHeight}>
          <div className={st.bannerWrapper}>
            <img src={categoryData.bannerImg} className={st.bannerImg} alt=""/>
          </div>
          <div className={[bs.container].join(' ')}>
            <div className={st.pageTitle}>{categoryData.pageTitle}</div>
            <div className={st.subTitle}><i>"{categoryData.heading}"</i></div>
            <div className={[bs.row, cmn.noMg].join(' ')}>
              {categoryData.articleList.map((article, index) => 
                <>
                  <CategoryListItem article={article} />
                  {console.log('index % 4', (index+1) % 4)}
                  { (index+1) % 3 === 0 && index !== categoryData.articleList.length-1 ? 
                    <div className={[bs.colXs12, st.divisionLine].join(' ')}></div>
                  : null}
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent)

