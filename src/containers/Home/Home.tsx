import * as React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import CitySelector from '../CitySelector/CitySelector';
import Header from '../Header/Header';
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
}
type State = {
  userName: any,
  steps: any,
  chatBotConfig: any
}

const homePageData = require('./home.json');
class Home extends React.Component < Props, State > {

  constructor(props) {
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
        message: 'Hello {previousValue}, where do you want medicine delivery?',
        trigger: 'citySelector',
      }, {
        id: 'citySelector',
        // asMessage: true,
        component: < CitySelector /> ,
        // trigger: '7',
      }, {
        id: 'autoLocation',
        // asMessage: true,
        component: < CitySelector /> ,
        trigger: '7',
      }, {
        id: 'manualLocation',
        // asMessage: true,
        user: true,
        trigger: '7',
      }, {
        id: '7',
        message: 'Hi {previousValue}',
        // trigger: '7',
      }],
      chatBotConfig: {
        // recognitionEnable: true,
        style: {height: '100vh'},
        avatarStyle: {
          boxShadow: 'none'
        },
        userDelay: 0,
        enableMobileAutoFocus: true,
        bubbleStyle: {
          // borderRadius: '12px 12px 12px 0',
          boxShadow: '0 1px 12px 0 rgba(181, 192, 204, 0.5)',
          fontSize: '16px',
          marginTop: 0
        },
        submitButtonStyle: {
          background: '#abaebf',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          padding: '0 7px 0 11px',
          display: 'flex',
          fill: 'white',
          top: '8px',
          right: '8px',
        },
        headerComponent: Header(),
        botAvatar: 'https://image.ibb.co/mq0NPo/Screen_Shot_2018_06_22_at_1_13_28_AM.png',
        userAvatar: 'https://image.ibb.co/ieJOEo/Screen_Shot_2018_06_22_at_1_40_39_AM.png'
      },
    };
  }
  componentWillMount() {
    console.log('called in will mount', this.state);
    // this.setState({ userName });
  }
  render() {
    const {
      steps,
      chatBotConfig
    } = this.state;
    console.log('this.state', this.state);
    return ( 
    <>
      <ThemeProvider theme = {theme} >
        <ChatBot { ...{ steps } } { ...chatBotConfig} />
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