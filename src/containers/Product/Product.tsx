import * as React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import * as bs from '../../styles/Bootstrap.scss'
import * as cm from '../../styles/common.scss'
import * as st from './Product.scss'


type Props = {
    dispatch: any,
}

type State = {
    qty: any,
}

declare let window: any
class Product extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            qty: 1,
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Header />

                <div className={cm.containerHeight}>
                    <div className={st.product}>
                        <div className={bs.container}>
                            <img className={[bs.colXs12, bs.colSm6].join(' ')} src='https://images-eu.ssl-images-amazon.com/images/G/31/img18/Books/Regional/Jan/750x486_HPTile_BengaliBookstoreFiction.jpg' alt='' />
                            <div className={[bs.colXs12, bs.colSm6].join(' ')}>
                                <h1 className={st.name}>Non Fiction Conversations</h1>
                                <h2 className={st.desc}>Thought experiments (Gedankenexperimenten) are “facts” in the sense that they have a “real life” correlate in the form of electrochemical activity in the brain. But it is quite obvious that they do not relate to facts “out there”. They are not true statements.</h2>
                                <hr />
                                <div className={st.qty}>
                                    <span className={st.txt}>QUANTITY:</span>
                                    <span className={st.qtyWrap}>
                                        <input type='number' min='1' max='5' value={this.state.qty} onChange={(e) => this.setState({ qty: e.target.value })} />
                                    </span>
                                </div>
                                <hr />

                                <div className={st.buy}>
                                    <span className={st.price}>₹1499.00</span>
                                    <button>BUY NOW</button>
                                </div>
                                <div className={st.shipStmt}>FREE SHIPPING ACROSS INDIA</div>
                            </div>
                        </div>
                        <div className={st.scrollDown}>
                            Scroll down to know more <br />
                            <img height='20' src='https://images-eu.ssl-images-amazon.com/images/G/31/img18/Books/Regional/Jan/750x486_HPTile_BengaliBookstoreFiction.jpg' alt='' />
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product)

