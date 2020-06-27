import './style.scss';

import React, { Component } from 'react';

import AdNetworkComponent from '../ad-network';
import ListAdAccountsComponent from '../list-ad-accounts';
import Stepper from 'react-stepper-horizontal';
import SurveyComponent from '../survey';

class Steppers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          title: 'Survey',
        },
        {
          title: 'Add Networks',
        },
        {
          title: 'Select Accounts',
        },
      ],
      currentStep: 0,
    };
  }

  onClickNext = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  }

  render() {
    const { steps, currentStep } = this.state;
    return (
      <div className='stepper'>
        <div style={{margin:'0 auto', width: '50%'}}>
          <Stepper steps={steps} activeStep={currentStep} />
        </div>
        { currentStep === 1 ? <AdNetworkComponent handleClick={this.onClickNext} /> : 
          currentStep === 2 ? <ListAdAccountsComponent /> : <SurveyComponent handleClick={this.onClickNext} />
        }
      </div>
    );
  }
}

export default Steppers;
