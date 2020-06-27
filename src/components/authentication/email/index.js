import './style.scss';

import { Col, Row } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import FormComponent from '../../../reusable-component/form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { emailAction } from '../../../actions/auth/reset-pass/reset-pass-action';

class EmailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  verifyEmail = values => {
    console.log(values);
    this.props.emailAction(values.data);
  };
  render() {
    console.log(this.props.resetPass);
    if(this.props.resetPass.emailVerify && this.props.resetPass.emailVerify.success){
      return <Redirect to='/reset-password'/>
    }
    return (
      <div className="container-fluid">
        <Row className="reset-password text-center">
          <Col className="left">
            <img alt="biz-elevate-logo" className='header-logo' src="/assets/bitmap-imgs/logo1.png"></img>
            <div className='sub-title'>Grow your business with BizzElevate</div>
            <div className='content'>
              BizzElevate.io gives businesses the tools to leverage their data
              and build a centralized view of each customer, powering effective
              marketing decisions from a single platform.
            </div>
            <img alt="social-dashboard" src="/assets/3bitmap-imgs/social-dashboard.png"></img>
            <Row className='text-center'>
                <Col>1</Col>
                <Col>1</Col>
                <Col>1</Col>
            </Row>
            <Row className="logo-images">
                <Col><img alt="facebook" style={{float: 'right'}} src='/assets/bitmap-imgs/facebook.png'></img></Col>
                <Col><img alt="google" style={{float: 'left'}} src='/assets/bitmap-imgs/google.png'></img></Col>
            </Row>
          </Col>
          <Col className="right">
            <div className="form-block">
              <span className="title">Reset password</span>
              <div className="form">
                <div className="form-border row">
                  <FormComponent
                    formData={[
                      {
                        tag: 'input',
                        type: 'email',
                        label: 'Enter Email',
                        // error: 'suggestion goes here',
                        errorClass: 'suggestion',
                        name: 'username',
                        value: null,
                        placeholder: 'Enter valid email address',
                        class: 'input',
                        align: 'col-12 input-grp',
                      },
                      {
                        tag: 'input',
                        type: 'button',
                        value: 'Send OTP',
                        class: 'btn-reset-pass',
                          action: this.verifyEmail,
                        align: 'col-12',
                      },
                    ]}
                  />
                  <Col className="footer">
                    <Link to='/' style={{ color: '#41b3c4'}}>Back to login</Link>
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
  let data = {};
  data.resetPass = state.resetPass;
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { emailAction };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmailComponent));
