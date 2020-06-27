import './style.scss';
import 'font-awesome/css/font-awesome.min.css';
import { Col, Row } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import FormComponent from '../../../reusable-component/form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signUpAction } from '../../../actions/auth/sign-up/sign-up-action';
import { clearError } from '../../../actions/error-action';
import * as _ from "underscore";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        name: null,
        // username: null,
        companyName: null,
        mobileNumber: null,
        email: null,
        password: null
      }
    };
  }

  checkFields(values, field){
    return values.data && values.data[field] ? null: 'Field is required';
  }



  
  signUpUser = values => {
    let errorObj = this.state.errors;
    errorObj.name = this.checkFields(values, 'name');
    // errorObj.username = this.checkFields(values, 'username');
    errorObj.companyName = this.checkFields(values, 'companyName');
    errorObj.mobileNumber = this.checkFields(values, 'mobileNumber');
    errorObj.email = this.checkFields(values, 'email');
    errorObj.password = this.checkFields(values, 'password');
    this.setState({
      errors: errorObj
    });
    let result = _.every(_.values(errorObj), function(v) {return !v;});
    if(result){
      this.props.signUpAction(values.data);
      
    }
    return <Redirect to='/sign-up-1' />;
  };

  handleClick = () => {
    this.props.clearError();
  }
  
  render() {
    const {errors} = this.state;

    if(this.props.userSignUp.data && this.props.userSignUp.data.success){
      return <Redirect to='/otp' />;
    }
    return (
      <div className="container-fluid">
         <div className="logo-register col-12 text-center"><img className='header-logo' src="/assets/bitmap-imgs/register_logo.png" alt='' /></div>

        <Row className="sign-up text-center">
          
          <Col className="col-12 left">
         
            {/* <div className='sub-title'>Grow your business with BizzElevate</div>
            <div className='content'>
              BizzElevate.io gives businesses the tools to leverage their data
              and build a centralized view of each customer, powering effective
              marketing decisions from a single platform.
            </div> */}
            
            
            <img src="/assets/3bitmap-imgs/register_vector.png" className='thumbnail img-fluid' alt='' />
            
            {/* <Row className="logo-images">
                <Col><img alt='' style={{float: 'right', paddingBottom: '10%'}} src='/assets/bitmap-imgs/facebook.png'/></Col>
                <Col><img alt='' style={{float: 'left' , paddingBottom: '10%'}} src='/assets/bitmap-imgs/google.png'/></Col>
            </Row>
               <Row>
                <Col><a href="/terms-of-service" className="terms-and-privacy">Terms of Service</a></Col>
                <Col><Link to='/privacy-policy' className="terms-and-privacy">Privacy policy</Link></Col>
            </Row> */}
            
          </Col>
          <Col className="col-12 right">
           
           <Row> 
             <Col className="col-5 left"><Link><i className="fa fa-long-arrow-left arrow-icon fa-3x" aria-hidden="true"></i></Link></Col>
             <Col className="col-7 right"><h1 className='text-left text-dark font-weight-bold'>Let's Onboard</h1></Col>
           </Row>
           
            
            
            <div className="form">
              <div className="form-border row"> 
                <FormComponent
                  formData={[
                    {
                      tag: 'input',
                      type: 'text',
                      label: 'Enter Full Name',
                      error: errors.name,
                      errorClass: 'warning',
                      name: 'name',
                      value: null,
                      placeholder: 'Ex. steve smith',
                      class: 'input',
                      align: 'col-6 input-grp',
                    },
                    // {
                    //   tag: 'input',
                    //   type: 'text',
                    //   label: 'Username',
                    //   error: errors.username,
                    //   errorClass: 'warning',
                    //   name: 'username',
                    //   value: null,
                    //   placeholder: 'Username',
                    //   class: 'input',
                    //   align: 'col-6 input-grp',
                    // },
                    {
                      tag: 'input',
                      type: 'text',
                      label: 'Company Name',
                      error: errors.companyName,
                      errorClass: 'warning',
                      name: 'companyName',
                      value: null,
                      placeholder: 'Enter company name',
                      class: 'input',
                      align: 'col-6 input-grp',
                    },
                    {
                      tag: 'input',
                      type: 'password',
                      label: 'New Password',
                      error: errors.password,
                      errorClass: 'warning',
                      name: 'password',
                      value: null,
                      placeholder: 'Enter password',
                      class: 'input col-10 inp-icn',
                      align: 'col-6 input-grp',
                      icon: 'biz-icon biz-icon-eye-icon',
                      icon2: 'biz-icon biz-icon-eye-close-icon'
                    },
                    {
                      tag: 'input',
                      type: 'password',
                      label: 'Confirm Password',
                      error: errors.password,
                      errorClass: 'warning',
                      name: 'password',
                      value: null,
                      placeholder: 'Enter password',
                      class: 'input col-10 inp-icn',
                      align: 'col-6 input-grp',
                      icon: 'biz-icon biz-icon-eye-icon',
                      icon2: 'biz-icon biz-icon-eye-close-icon'
                    },
                   
                    // {
                    //   tag: 'input',
                    //   type: 'text',
                    //   label: 'Country Code',
                    //   name: 'countryCode',
                    //   value: null,
                    //   placeholder: 'Country code',
                    //   class: 'input',
                    //   align: 'col-4 input-grp',
                    // },
                    // {
                    //   tag: 'input',
                    //   type: 'text',
                    //   label: 'Mobile Number',
                    //   error: errors.mobileNumber,
                    //   errorClass: 'warning',
                    //   name: 'mobileNumber',
                    //   value: null,
                    //   placeholder: 'Mobile Number',
                    //   class: 'input',
                    //   align: 'col-8 input-grp',
                    // },
                    // {
                    //   tag: 'input',
                    //   type: 'email',
                    //   label: 'Email',
                    //   error: errors.email,
                    //   errorClass: 'warning',
                    //   name: 'email',
                    //   value: null,
                    //   placeholder: 'Email',
                    //   class: 'input',
                    //   align: 'col-12 input-grp',
                    // },
                    
                    // {
                    //   tag: 'input',
                    //   type: 'button',
                    //   value: 'Register',
                    //   class: 'register',
                    //   action: this.signUpUser,
                    //   align: 'col-6',
                    // },
                  
                  ]}
                />


                {(this.props.error && this.props.error.data) ? 
                <span className='col-12 warning' style={{paddingTop: '10px'}}>{this.props.error.data}</span>:null}
                <Col className='footer col-6'><span className="mr-2 text-dark">Already have an account?</span> <Link to='/sign-in' onClick={this.handleClick} style={{ color: '#41b3c4', textDecoration:'underline'}}>Click here to login</Link></Col>
              <Col className="col-3"></Col>
                <Link to='/sign-up-continue' className="register col-3 continue text-center"><label className="mt-3">Continue</label></Link>

              {/* <FormComponent 
              
              formData = {[
                {
                  tag: 'input',
                  type: 'button',
                  value: 'Continue',
                  class: 'register',
                  action: this.signUpUser,
                  align: 'col-6',
                }
              ]}
              
              /> */}
              
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
  let data = {userSignUp: state.signUp, error: state.error};
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { signUpAction, clearError };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpComponent));
