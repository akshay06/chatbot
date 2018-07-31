import * as React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import Header from '../Header/Header';
import ParentComponent from '../ParentComponent/ParentComponent';
import { submitForm } from '../../actions/CommonAction';
import { gtmPush } from '../../pixels';

// all available props
const theme = {
  background: '#f6f7f8',
  fontFamily: 'Roboto',
  // headerBgColor: '#EF6C00',
  // headerFontColor: '#fff',
  // headerFontSize: '15px',
  botFontColor: '#20222b',
  botBubbleColor: '#fff',
  userBubbleColor: '#0f906d',
  userFontColor: 'white',
};

type Props = {
  dispatch: any,
  location: any,
  commonReduder: any
}
type State = {
  steps: any,
  chatBotConfig: any
}

class Home extends React.Component < Props, State > {

  constructor(props) {
    super(props)

    this.state = {
      steps: [{
        id: '1',
        message: 'Hello, Welcome to PharmEasy! India\'s most trusted Medicine Home delivery company.',
        trigger: () => {gtmPush('1'); return '2'},
      }, {
        id: '2',
        message: 'Order medicines and get 20% off on all medicines and assured 100% genuine medicines',
        trigger: () => {gtmPush('2'); return '3'},
      }, {
        id: '3',
        message: 'Your name please',
        trigger: () => {gtmPush('3'); return 'userName'},
      }, {
        id: 'userName',
        user: true,
        validator: (value) => {
          var name = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
          if(value.match(name)) {
            return true;
          } else {
            return `Please enter a valid name`;
          }
        },
        trigger: () => {gtmPush('username'); return '4'},
      }, {
        id: '4',
        message: 'Hello there, are you looking for medicines at Flat 20% discount?',
        trigger: () => {gtmPush('4'); return '5'},
      }, {
        id: '5',
        options: [
          {value: 'medicine-yes', label: 'Yes', trigger: () => {gtmPush('5'); return '6'}},
          {value: 'medicine-no', label: 'No', trigger: () => {gtmPush('5'); return 'end-no-medicine'}}]
      }, {
        id: 'end-no-medicine',
        message: 'Thank you for your time. For any medicine requirements in future please call us on 9992999929',
        end: true
      }, {
        id: '6',
        message: 'Where do you want us to deliver?',
        trigger: () => {gtmPush('6'); return '7'},
      }, {
        id: '7',
        options: [
          {value: 'Pick my current location', label: 'Pick my current location', trigger: () => {gtmPush('7'); return 'autoFillLocation'}},
          {value: 'Enter your locality', label: 'Enter your locality (Eg. Kurla, Andheri west etc)',trigger: () => {gtmPush('7'); return 'manualLocation'}}
        ]
      }, {
        id: 'autoFillLocation',
        component: <ParentComponent component="AutoFillLocation" /> ,
      }, {
        id: 'manualLocation',
        component: (<ParentComponent component="ManualInput"/>) ,
      }, {
        id: '8',
        message: 'Unable to locate you, due to {previousValue}. Please enter manually',
        trigger: () => {gtmPush('8'); return 'manualLocation'}
      }, {
        id: 'user-location',
        message: 'Deliver near {previousValue} ?',
        trigger: () => {gtmPush('user-location'); return '9'}
      }, {
        id: '9',
        options: [
          { value: 'confirm', label: 'CONFIRM', trigger: () => {gtmPush('9'); return '10'}},
          { value: 'edit', label: 'EDIT', trigger: () => {gtmPush('9'); return '7'}},
        ],
      },
      {
        id: '10',
        message: 'Please enter your mobile',
        trigger: () => {gtmPush('10'); return 'mobile-number'}
      }, {
        id: 'mobile-number',
        user: true,
        validator: (value) => {
          var phoneno = /^\(?([5-9]{1})\)?([0-9]{9})$/;
          if(value.match(phoneno)) {
            return true;
          } else {
            return `Please enter a valid no`;
          }
        },
        trigger: () => {gtmPush('mobile-number'); return '11'}
      }, {
        id: '11',
        message: 'Taking your request.',
        trigger: () => {gtmPush('11'); return '12'}
      }, {
        id: '12',
        message: 'Thank you for your time, our executive will call you shortly to place an order for you.',
        end: true
      }],
      chatBotConfig: {
        // recognitionEnable: true,
        // botDelay: 1500,
        avatarStyle: {
          boxShadow: 'none',
          borderRadius: 0,
          width: '40px',
          height: '100%'
        },
        userDelay: 0,
        enableMobileAutoFocus: true,
        bubbleOptionStyle: {
          marginLeft: '50px',
          borderRadius: '6px',
          color: '#fff',
          background: '#3f906d',
        },
        bubbleStyle: {
          boxShadow: '0 1px 12px 0 rgba(181, 192, 204, 0.5)',
          fontSize: '16px',
          marginTop: 0,
          maxWidth: '70%'
        },
        contentStyle: {
          height: 'calc(100vh - 200px)',
          background: "url('https://s3-ap-southeast-1.amazonaws.com/pe-s3-order-on-chat-staging/background.png')",
          backgroundPosition: 'center'

        },
        submitButtonStyle: {
          background: '#3f906d',
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
        botAvatar: 'https://s3-ap-southeast-1.amazonaws.com/pe-s3-order-on-chat-staging/bot-icon.png',
        userAvatar: 'https://s3-ap-southeast-1.amazonaws.com/pe-s3-order-on-chat-staging/user-icon.png'
      },
    };
  }

  handleEnd = (val) => {
    let userDetails = {
      name: '',
      mobile: '',
      geoLocation: '',
    };
    if(val.values.indexOf('medicine-no') >= 0) {
      gtmPush('at the end - no medicine');
      return false;
    }
    userDetails.name = val.renderedSteps.find(step => step.id == 'userName').value;
    userDetails.mobile = val.renderedSteps.find(step => step.id == 'mobile-number').value;
    let autoFill = val.renderedSteps.find(step => step.id == 'autoFillLocation');
    let manualLocation = val.renderedSteps.find(step => step.id == 'manualLocation');
    if (manualLocation) {
      userDetails.geoLocation = manualLocation.value;
    } else if (autoFill) {
      userDetails.geoLocation = autoFill.value;
    }
    let formData = {
      DeliveryStreamName: "pe-kinesis-order-on-chat",
      Record: {
        Data: JSON.stringify(userDetails)
      }
    }
    console.info('Submit form : ', formData);
    gtmPush('at the end - before sending');
    this.props.dispatch(submitForm(formData));
  }
  render() {
    const {
      steps,
      chatBotConfig
    } = this.state;
    return (
    <>
      <ThemeProvider theme = {theme} >
        <ChatBot handleEnd={this.handleEnd} { ...{ steps } } { ...chatBotConfig} />
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