import * as React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

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
  steps: any,
  location: any,
  commonReducer:any
}

type State = {
  name: any,
  gender: any,
  age: any,
}
class Review extends React.Component<Props, State> {

  constructor(props){
    super(props)
    console.log('chatBot', this.props.commonReducer.chatBot);
    this.state = {
      name: {
        value: ''
      },
      gender: {
        value: ''
      },
      age: {
        value: ''
      },
    };
  }
  componentWillMount() {
    const { steps } = this.props;
    console.log('called', this.props, this.state);
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
    commonReducer: state.common,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)