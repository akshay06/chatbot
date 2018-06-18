import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as cmn from '../../styles/common.scss';
import * as st from './ArticleComponent.scss';


type Props = {
    dispatch: any,
}

declare let window: any;
class ArticleComponent extends React.Component<Props, any> {
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                <Header />
                <div className={cmn.containerHeight}>

                </div>
                <Footer />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent)

