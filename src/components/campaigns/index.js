import React, { Component } from 'react';
import CreateCampaignComponent from './create-campaign';
import Stepper from 'react-stepper-horizontal';
import AdsetsComponent from './adsets';
import './style.scss';
import { Link, withRouter } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

class RStepperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        { title: 'Campaign' },
        { title: 'Adset' },
        { title: 'Ad' },
      ],
      currentStep: 0,
    }
  }

  onClickNext = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  }

  handleNavigate = (v) => {
    this.setState({
      currentStep: v
    })
  }

  render() {
    const { steps, currentStep } = this.state;
    return (
      
      <>
      <div style={{backgroundColor:"#f5f5fb",height:'100%'}}>
        <Row className="p-5">
      <Link><i className="fa fa-long-arrow-left fa-3x col-2" style={{color:"#333333"}} aria-hidden="true"></i></Link>
      <h2 className="header col-5 mr-5">Create Campaign</h2>
      
       
       
        <Link className="col-2"><button className="save-btn">SAVE DRAFT</button></Link>
        <Link className="col-2"><button className="continue-btn"><span>CONTINUE</span></button></Link>
        </Row>
        <Row>
        <p style={{marginTop:'-65px',marginLeft:'137px',color:'#0080ff',fontSize:'13px'}}>Facebook/Instagram Campaign</p>
        <i class="fa fa-chevron-right fa-1x" style={{marginTop:'-58px',marginLeft:'15px',color:'#333333',fontSize:'13px'}} aria-hidden="true"></i>
        <Link><p style={{marginTop:'-65px',marginLeft:'15px',color:'#afafaf',fontSize:'13px'}}>Campaign Details</p></Link>
        </Row>
        {/* <p className="sub-title">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when a scrambled it to make specimen book.
        </p> */}
        
        <div className='campaigns-stepper mx-auto'>
          
          <div className='stepper-block' style={{ width: '100%' }}>
            <Stepper activeColor='#0080ff' style={{width: 'auto', border:'#0080ff' , color:'#0080ff'}} steps={steps} activeStep={currentStep} />
          </div>
        </div>
        </div>
        { this.renderStep(currentStep) }
      </>
    );
  }

  renderStep(currentStep) {
    switch (currentStep) {
      case 1: return (<AdsetsComponent handleClick={this.onClickNext} />);
      case 2: return (<div>Ads page</div>);
      default: return (<CreateCampaignComponent handleClick={this.onClickNext} />);
    }
  }
}

export default RStepperComponent;
