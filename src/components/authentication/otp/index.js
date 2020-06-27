import {Col, Row} from 'react-bootstrap';
import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { otpAction } from '../../../actions/auth/sign-up/sign-up-action';
import './style.scss';

let otp = [];
let key = null;
class OtpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: null
    };
    this.input1 = React.createRef();
    this.input2 = React.createRef();
    this.input3 = React.createRef();
    this.input4 = React.createRef();
  }
  otpVerify = (values) => {
    this.props.otpAction(values);
  }
  handleChange(e) {
    otp[e.target.id] = e.target.value;
    switch (e.target.id) {
      case '0':
        if(key !== 8){
          this.input2.current.focus();
        }
        break;
      case '1':
        if(key !== 8){
          this.input3.current.focus();
        }
        break;
      case '2':
        if(key !== 8){
          this.input4.current.focus();
        }
        break;
      default:
        break;
    }
    console.log(otp);
    if (otp.length === 4) {
      let otpValue = otp.join('');
      this.setState({
        otp: otpValue
      })
    }
  }

  handleKeyDown(e) {
    key = e.keyCode;
  }

  handleClick(mobileNumber){
    let props = this.props;
    if(this.state.otp.length === 4){
      let data = {
        otp: this.state.otp,
        num: mobileNumber
      }
      this.props.otpAction(data)
      console.log('OTP value', data);
    }

    if(props.error.data){
      console.log('clear')
      otp = [];
      this.setState({
        otp: null
      });
    }
  }

  render() { 
    const inputLength = [
      { id: '0', ref: this.input1 },
      { id: '1', ref: this.input2 },
      { id: '2', ref: this.input3 },
      { id: '3', ref: this.input4 },
    ]; 
    if(this.props.newUserData.otp && this.props.newUserData.otp.mobile.verified){
      return <Redirect to='/' />;
    }
    return (
      <Row className="otp">
        <Col className="left text-center">
          <img alt="" className='header-logo' src="/assets/bitmap-imgs/logo1.png"></img>
            <div className='sub-title'>Grow your business with BizzElevate</div>
            <div className='content'>
              BizzElevate.io gives businesses the tools to leverage their data
              and build a centralized view of each customer, powering effective
              marketing decisions from a single platform.
            </div>
            <img alt="" src="/assets/bitmap-imgs/finance.png"></img>
            <Row className='text-center'>
            </Row>
            <Row className="logo-images">
                <Col><img alt="" style={{float: 'right'}} src='/assets/bitmap-imgs/facebook.png'></img></Col>
                <Col><img alt="" style={{float: 'left'}} src='/assets/bitmap-imgs/google.png'></img></Col>
            </Row>
          </Col>
        <Col className='right page-heading'>
          OTP
          <div className='otp-box'>
          <p>Enter OTP</p>
          <div className='row otp-section'>
                {inputLength.map((value, idx) => (
                  <div className='col-3' key={idx}>
                    <input
                      id={value.id}
                      type='text'
                      className='otp-number'
                      placeholder='-'
                      maxLength='1'
                      defaultValue=''
                      ref={value.ref}
                      onChange={e => {
                        this.handleChange(e);
                      }}
                      onKeyDown={e => this.handleKeyDown(e)}
                    />
                  </div>
                ))}
              </div>
              {(this.props.error.data) ? 
                <div className='error'>{this.props.error.data}</div>:null}
              <button className='otp-button' onClick={() => this.handleClick(this.props.newUserData.mobileNumber)}>CONTINUE</button>
              </div>
        </Col>
        </Row>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  let data = {newUserData: state.signUp, error: state.error};

  return data;
};


const mapDispatchToProps = dispatch => {
  const actions = { otpAction };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpComponent);
