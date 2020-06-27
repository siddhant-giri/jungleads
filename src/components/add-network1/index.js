// import './style.scss';

import { Col, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import RButton from '../../reusable-component/button';

class AddNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: true,
      fbBtn: false,
      googleBtn: false,
    };
  }
  responseFacebook(response) {
    console.log(response);
    if (response) {
      this.setState({
        fbBtn: true
      });
    }
  }
  render() {
    return (

      <div className="ad-network">
        <div className="header">
          <Row><img alt="biz-logo" className='header-logo text-center' src="/assets/bitmap-imgs/logo1.png"></img></Row>
        </div>
        {/* stepper code goes here */}
        <div className="content text-center mx-auto">
          <p className="heading-bold">Elevate your Business with us!</p>
          <div className="heading-content"><p>You have ambitious goals, we have the ambition to make them happen.<br />
            Stay up-to-speed with the latest advertising innovations.<br /> Access insights, KPI analysis and strategic advice for your ads.</p>
          </div>
        </div>
        <div className="login-body mx-auto text-center">
          <p className="title">Add your network</p>
          <p className="sub-title">
            Get started with Google Ads or Facebook Ads. You can add more
            accounts from either provider later.
          </p>
          <FacebookLogin
            appId="119347438787040"
            textButton="LINK FACEBOOK AD ACCOUNT"
            autoLoad={true}
            fields="name,email,picture"
            scope="email,public_profile,ads_management,ads_read,attribution_read"
            callback={this.responseFacebook}
            icon="fa-facebook"
            render={renderProps => (
              <RButton
                click={renderProps.onClick}
                class={this.state.fbBtn ? 'button fb-btn-disable' : "button fb-btn"}
                icon="/assets/3bitmap-imgs/facebook.png"
                text="FACEBOOK CONNECTED"
              />
            )}
          />
          {/* <FacebookLogin
            appId="119347438787040"
            textButton="LINK FACEBOOK AD ACCOUNT"
            autoLoad={true}
            fields="name,email,picture"
            scope="email,public_profile,ads_management,ads_read,attribution_read"
            callback={this.responseFacebook}
            icon="fa-facebook"
            render={renderProps => (
              <RButton
                click={renderProps.onClick}
                class={this.state.fbBtn ? 'button fb-btn-disable' : "button fb-btn"}
                icon="/assets/3bitmap-imgs/facebook.png"
                text="LINK FACEBOOK AD ACCOUNT"
              />
            )}
          /> */}
          <RButton
            text="CONTINUE"
            class={
              (this.state.submit ? 'button submit-disable' : 'button submit-btn')
            }
            state={this.state.submit}
          />
          <br />
          <a href="#abc" className="need-help">
            Need help?
          </a>
        </div>
        <Row className="logo-images">
          <Col><img alt="" style={{ float: 'right' }} src='/assets/bitmap-imgs/facebook.png'></img></Col>
          <Col><img alt="" style={{ float: 'left' }} src='/assets/bitmap-imgs/google.png'></img></Col>
        </Row>
      </div>
    );
  }
}

export default AddNetwork;
