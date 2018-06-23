import * as React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import Review from './CitySelecter';
// all available props
const theme = {
  background: '#f6f7f8',
  fontFamily: 'Roboto',
  // headerBgColor: '#EF6C00',
  // headerFontColor: '#fff',
  // headerFontSize: '15px',
  botBubbleColor: '#fff',
  botFontColor: '#20222b',
  userBubbleColor: '#0f906d',
  userFontColor: 'white',
};

type Props = {
  dispatch: any,
  location: any,
  commonReducer:any
}
type State = {
  userName: any,
  steps: any
}

const homePageData = require('./home.json');
class Home extends React.Component<Props, State> {

  constructor(props){
    super(props)
    this.state = {
      userName: '',
      steps: [{
        id: '1',
        message: 'Hello, My name is Health Ginie.',
        trigger: '2',
      }, {
        id: '2',
        message: 'Welcome to PharmEasy, India\'s Medicine Home delivery company. Order medicines and get upto 20% discount on every medicine order.',
        trigger: '3',
      }, {
        id: '3',
        message: 'I\'m easy to use. You\'ll see some options in a moment, just make a selection and we\'ll get started. If you ever get stuck, just ask me for help.',
        trigger: '4',
      }, {
        id: '4',
        message: 'Your name please',
        trigger: 'userName',
      }, {
        id: 'userName',
        user: true,
        trigger: '6',
      }, {
        id: '6',
        message: 'Hello {{previousValue}}, where do you want medicine delivery?',
        trigger: '7',
      }, {
        id: '7',
        component: <Review />,
        // trigger: '7',
      }
      ],

    };
  }
  componentWillMount() {
    const {steps, userName} = this.state;
    
    this.setState({ userName });
  }
  render() {
    const {steps} = this.state;
    const {commonReducer: {chatBot: chatBotConfig}} = this.props;
    console.log('this.state', this.state);
    return (<>
    <ThemeProvider theme={theme}>
      <ChatBot {...chatBotConfig} {...{steps}}  />
    </ThemeProvider>
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