import './style.scss';

import { Col, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import FormComponent from '../../../reusable-component/form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signInAction } from '../../../actions/auth/sign-in/sign-in-action';
import { clearError } from '../../../actions/error-action';
import * as _ from "underscore";

class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        username: null,
        password: null
      }
    };
  }

  checkFields(values, field){
    return values.data && values.data[field] ? null: 'Field is required';
  }
  signInUser = values => {
    let errorObj = this.state.errors;
    errorObj.username = this.checkFields(values, 'username');
    errorObj.password = this.checkFields(values, 'password');
    this.setState({
      errors: errorObj
    });
    let result = _.every(_.values(errorObj), function(v) {return !v;});
    if(result){
      this.props.signInAction(values.data);
    }
    // console.log(values);
    
  }
  handleClick = () => {
    this.props.clearError();
  }
  render() {
    const {errors} = this.state;

    if(!!!this.props.error.data && this.props.userSignIn.data){
      if(this.props.userSignIn.data.fbAuth){
        console.log('in pushhh')
        this.props.history.push('/campaigns');
      }else { 
        console.log('rrrrrrrrrrrrrr')
        this.props.history.push('/registrations'); }
    }
    return (

      <div className="container-fluid">
        <Row className="sign-in text-center">
          <Col className="left">
          <img className='header-logo' alt="" src="/assets/bitmap-imgs/jungleads_logo.png"></img>
          
          <h1 className='sub-title text-left text-dark font-weight-bold ml-5 px-5'>Grow your business with BizzElevate</h1>
            <div className='content text-left ml-5 mb-5 px-5'>
              BizzElevate.io gives businesses the tools to leverage their data
              and build a centralized view of each customer, powering effective
              marketing decisions from a single platform.
            </div>
            <img src="/assets/bitmap-imgs/finance.png" alt=''/>
            <Row className='text-center'>
            </Row>
            <Row className="logo-images">
                <Col><img style={{float: 'right'}} src='/assets/bitmap-imgs/facebook.png' alt=''/></Col>
                <Col><img style={{float: 'left'}} src='/assets/bitmap-imgs/google.png' alt=''/></Col>
            </Row>
          </Col>
          <Col className="right">
          <div className='form-block'>
            <h1 className="font-weight-bold welcometext">Welcome Back</h1>
            <div className="form">
              <div className="form-border row">
              

                <FormComponent
                  formData={[
                    {
                      tag: 'input',
                      type: 'text',
                      label: 'Username',
                      // error: 'warning goes here',
                      error: errors.username,
                      errorClass: 'warning',
                      
                      name: 'username',
                      value: null,
                      placeholder: 'Username',
                      class: 'input',
                      align: 'col-12 input-grp',
                    },
                    {
                      tag: 'input',
                      type: 'password',
                      label: 'Password',
                      error: errors.password,
                      errorClass: 'warning',
                      name: 'password',
                      value: null,
                      placeholder: 'Enter password',
                      class: 'input col-10 inp-icn',
                      
                      align: 'col-12 input-grp',
                      icon: 'biz-icon biz-icon-eye-icon',
                      
                      icon2: 'biz-icon biz-icon-eye-close-icon'
                    },
                    
                  ]}
                />
                <FormComponent
                  formData={[
                    {
                      tag: 'checkbox',
                      type: 'checkbox',
                      
                      class: 'inp-checkbox',
                      align: 'col-2',
                    },
                  ]}
                />
                <span className="col-5 text-left logtext">Keep me logged in</span>
                {(this.props.error && this.props.error.data) ? 
                <span className='col-12 warning' style={{paddingTop: '10px'}}>{this.props.error.data}</span>:null}
                <span className='col-5 mt-2 text-right'><Link to='/reset-password'><span href='#abc' className='forget-password'>Forgot Password?</span></Link></span>
                <FormComponent
                  formData={[
                    {
                      tag: 'input',
                      type: 'button',
                      value: 'Login',
                      class: 'login',
                      action: this.signInUser,
                      align: 'col-12',
                    },
                  ]}
                  />
                
                
                <Col className="footer mt-4">
                  <span className="text-underline mr-2">Don't have account yet?</span>
                  <Link to='/sign-up'><span href="/sign-up" className="terms-and-privacy">Click here to register</span></Link>
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
  let data = {userSignIn: state.signIn, error: state.error};
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { signInAction };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInComponent));
