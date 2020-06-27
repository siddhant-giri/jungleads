import './style.scss';

import { Col, Row } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import FormComponent from '../../../reusable-component/form';
import { bindActionCreators } from 'redux';
import { changePassAction } from '../../../actions/auth/reset-pass/reset-pass-action';
import {clearError} from '../../../actions/error-action';
import { connect } from 'react-redux';
import * as _ from "underscore";

class ResetPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        confirmPassword: null,
        otp: null,
        newPassword: null,         
      }
    };
  }

  checkFields(values, field){
    return values.data && values.data[field] ? null: 'Field is required';
  }

  changePassword = values => {
    let errObj = this.state.errors;
    let data = {};

    errObj.confirmPassword = this.checkFields(values, 'confirmPassword');
    errObj.otp = this.checkFields(values, 'otp');
    errObj.newPassword = this.checkFields(values, 'newPassword');
    errObj.mobileNumber = this.checkFields(values, 'mobileNumber');
    console.log(values);
    data.username = this.props.resetPass.emailVerify.email;
    data.otp = values.otp;
    data.password = values.confirmPassword; 
    this.setState({
      errors: errObj
    });
    let result = _.every(_.values(errObj), function(v) {return !v;});
    if(result){
      this.props.changePassAction(data);
    }
  };

  handleClick = () => {
    this.props.clearError();
  }
  render() {
    const {errors} = this.state;
    if(this.props.resetPass.passVerify && this.props.resetPass.passVerify.success){
      return <Redirect to='/'/>
    }
    return (
      <div className="container-fluid">
        <Row className="reset-password text-center">
          <Col className="left">
            <img alt='' className='header-logo' src="/assets/bitmap-imgs/jungleads_logo.png"></img>
            <h1 className='sub-title text-left text-dark font-weight-bold ml-4'>Grow your business with BizzElevate</h1>
            <div className='content text-left ml-4'>
              BizzElevate.io gives businesses the tools to leverage their data
              and build a centralized view of each customer, powering effective
              marketing decisions from a single platform.
            </div>
            <img alt='' className="img-fluid" src="/assets/3bitmap-imgs/reset_password.png"></img>
            <Row className="logo-images">
                <Col><img alt='' style={{float: 'right'}} src='/assets/bitmap-imgs/facebook.png'></img></Col>
                <Col><img alt='' style={{float: 'left'}} src='/assets/bitmap-imgs/google.png'></img></Col>
            </Row>
          </Col>
          <Col className="right">
            <div className="form-block">
              <h1 className="font-weight-bold reset-head">Reset password</h1>
              <div className="form"> 
                <div className="form-border row">
                  <FormComponent
                    formData={[
                      {
                        tag: 'input',
                        type: 'text',
                        label: 'Country Code',
                        name: 'countryCode',
                        placeholder: 'e.g 91',
                        class: 'input',
                        align: 'col-4 input-grp',
                        
                      },
                      {
                        tag: 'input',
                        type: 'text',
                        label: 'Mobile Number',
                        error: errors.mobileNumber,
                        errorClass: 'warning',
                        name: 'mobileNumber',
                        value: null,
                        placeholder: 'Mobile Number',
                        class: 'input',
                        align: 'col-8 input-grp',
                      },
                      {
                        tag: 'input',
                        type: 'text',
                        label: 'OTP',
                        error: errors.otp,
                        errorClass: 'warning',
                        name: 'otp',
                        value: null,
                        placeholder: 'Enter OTP',
                        class: 'input',
                        align: 'col-12 input-grp',
                      },
                      // {
                      //   tag: 'OtpInput',
                      //   numInputs:'4',
                      //   // type: 'text',
                      //   // label: 'OTP',
                      //   // error: errors.otp,
                      //   // errorClass: 'warning',
                      //   // name: 'otp',
                      //   // value: null,
                      //   // placeholder: '',
                      //   // class: 'input',
                      //   // align: 'col-3 input-grp',
                      // },
                      
                      {
                        tag: 'input',
                        type: 'text',
                        label: 'New Password',
                        error: errors.newPassword,
                        errorClass: 'warning',
                        name: 'newPassword',
                        value: null,
                        placeholder: 'New Password',
                        class: 'input col-10 inp-icn',
                        align: 'col-12 input-grp',
                        icon: 'biz-icon biz-icon-eye-icon',
                      icon2: 'biz-icon biz-icon-eye-close-icon'
                      },
                      {
                        tag: 'input',
                        type: 'password',
                        label: 'Confirm Password',
                        error: errors.confirmPassword,
                        errorClass: 'warning',
                        name: 'confirmPassword',
                        value: null,
                        placeholder: 'Confirm password',
                        class: 'input col-10 inp-icn',
                        align: 'col-12 input-grp',
                        icon: 'biz-icon biz-icon-eye-icon',
                      icon2: 'biz-icon biz-icon-eye-close-icon'
                      },
                      {
                        tag: 'input',
                        type: 'button',
                        value: 'Update',
                        class: 'btn-reset-pass',
                          action: this.changePassword,
                        align: 'col-12',
                      },
                    ]}
                  />
                  {(this.props.error.data) ? 
                  <span className='col-12 warning' style={{paddingTop: '10px'}}>{this.props.error.data}</span>
                  :null}
                  <Col className="footer">
                    Don't have account yet? <Link to='/' onClick={this.handleClick} style={{ fontSize : '14px' ,color: '#41b3c4', textDecoration:'underline'}}>Create New Account</Link>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  let data = {resetPass: state.resetPass, error: state.error};
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { changePassAction, clearError };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasswordComponent));
