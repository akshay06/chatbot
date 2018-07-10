import * as React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import Header from '../Header/Header';
import ParentComponent from '../ParentComponent/ParentComponent';
import { submitForm } from '../../actions/CommonAction';

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
      steps: [
        {
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
        trigger: 'locationOption',
      },
      {
        id: 'locationOption',
        options: [
          {value: 'PICK MY CURRENT LOCATION', label: 'PICK MY CURRENT LOCATION', trigger: 'autoFillLocation'},
          {value: 'ENTER YOUR LOCATION MANUALLY', label: 'ENTER YOUR LOCATION MANUALLY', trigger: 'manualLocation'}]
      }, {
        id: 'autoFillLocation',
        component: <ParentComponent component="AutoFillLocation" /> ,
      }, {
        id: 'manualLocation',
        component: (<ParentComponent component="ManualInput"/>) ,
      }, {
        id: '7',
        message: 'Deliver at {previousValue}',
        trigger: '8',
      }, {
        id: 'cant-find-location',
        message: 'Unable to locate you, due to {previousValue}. Please enter manually',
        trigger: 'locationOption',
      }, {
        id: '8',
        options: [
          { value: 'confirm', label: 'CONFIRM', trigger: '9' },
          { value: 'edit', label: 'EDIT', trigger: 'locationOption' },
        ],
      }, {
        id: '9',
        message: 'Place a medicine order now and get 25% off in our first order.',
        trigger: '10',
      }, {
        id: '10',
        message: 'Order now to get medicines delivered by tomorrow 27th June.',
        trigger: '11'
      }, {
        id: '11',
        message: 'Upload a valid prescription to place a medicine order. Or you can also Book free doctor tele-consultation if you require a new prescription.',
        trigger: '12'
      }, {
        id: '12',
        asMessage: true,
        component: (<div><img width="100%" src={'https://s3-ap-southeast-1.amazonaws.com/pe-s3-order-on-chat-staging/valid-rx.png'} alt=""/></div>),
        trigger: '13'
      }, {
        id: '13',
        message: 'Do you have a Valid Prescription ?',
        trigger: '14'
      }, 
      {
        id: '14',
        options: [
          { value: 'prescription', label: 'Yes', trigger: 'uploadRx' },
          { value: 'docConsultation', label: 'No', trigger: '15' },
        ]
      }, {
        id: 'uploadRx',
        component: (<ParentComponent component="ImageUplaoder"/>)
      }, {
        id: '15',
        message: 'We also provide doctor consultation, have a look',
        trigger: '16'
      }, {
        id: '16',
        asMessage: true,
        component: (<div><img width="100%" src={'https://s3-ap-southeast-1.amazonaws.com/pe-s3-order-on-chat-staging/doctor-consultation.png'} alt=""/></div>),
        trigger: '17'
      }, {
        id: '17',
        message: 'Do you want to BOOK FREE DOCTOR CONSULTATION ?',
        trigger: 'docConsultation'
      }, {
        id: 'docConsultation',
        options: [
          { value: 'yes', label: 'Yes', trigger: 'bookDoctorCons' },
          { value: 'no', label: 'No', trigger: '18' },
        ],
      }, {
        id: '18',
        message: 'Thanks for interaction!! Have a great day!',
        end: true
      }, {
        id: 'bookDoctorCons',
        message: 'Wait a minute, I will do that for you',
        trigger: '19'
      }, {
        id: '19',
        message: 'Please enter your mobile no.',
        trigger: 'mobile-number',        
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
        trigger: '20',
      }, {
        id: '20',
        message: 'Please enter complete address',
        trigger: 'address',
      }, {
        id: 'address',
        user: true,
        trigger: '21',
      }, {
        id: '21',
        message: 'Placing your order.',
        trigger: '22',
      }, {
        id: '22',
        message: 'Thanks for interaction!! Have a great day!',
        end: true
      }],
      chatBotConfig: {
        // recognitionEnable: true,
        // style: {height: '100vh'},
        avatarStyle: {
          boxShadow: 'none'
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
          // borderRadius: '12px 12px 12px 0',
          boxShadow: '0 1px 12px 0 rgba(181, 192, 204, 0.5)',
          fontSize: '16px',
          marginTop: 0,
          maxWidth: '70%'
        },
        contentStyle: {
          height: 'calc(100vh - 139px)'
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
        botAvatar: 'https://image.ibb.co/mq0NPo/Screen_Shot_2018_06_22_at_1_13_28_AM.png',
        userAvatar: 'https://image.ibb.co/ieJOEo/Screen_Shot_2018_06_22_at_1_40_39_AM.png'
      },
    };
  }
  componentWillMount() {
    // this.setState({ userName });
  }
  handleEnd = (val) => {
    let orderType = '';
    if(val.renderedSteps.find(step => step.id == 'uploadRx')) {
      orderType =  'prescription';
    }
    if(val.renderedSteps.find(step => step.id == 'bookDoctorCons')) {
      orderType =  'doctor consultation';
    }
    let userDetails = {
      name: val.renderedSteps.find(step => step.id == 'userName').value,
      attachments: val.renderedSteps.find(step => step.id == 'uploadRx').value,
      mobile: val.renderedSteps.find(step => step.id == 'mobile-number').value,
      address: val.renderedSteps.find(step => step.id == 'address').value,
      orderType,
    };
    let formData = {
      DeliveryStreamName: "pe-kinesis-order-on-chat",
      Record: {
        Data: userDetails
      }
    }
    console.log('called in handle', formData);
    this.props.dispatch(submitForm(formData))
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