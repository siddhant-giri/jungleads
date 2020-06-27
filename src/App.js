import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import AdNetworkComponent from './components/ad-accounts/ad-network';
import AddNetworkComponent from './components/add-network1';
import EmailComponent from './components/authentication/email';
import OtpComponent from './components/authentication/otp';
import PrivacyPolicyComponent from './components/misc/privacy-policy';
import ResetPasswordComponent from './components/authentication/reset-pass';
import SignInComponent from './components/authentication/sign-in';
import SignUpComponent from './components/authentication/sign-up';
import SignUpComponent1 from './components/authentication/sign-up1';
import Stepper from './components/ad-accounts/stepper';
import TermsOfServiceComponent from './components/misc/terms-of-service';
import AdListComponent from './components/ad-accounts/list-ad-accounts';
import SurveyComponent from './components/ad-accounts/survey';
import CampaignComponent from './components/campaigns';
import AdsetsComponent from './components/campaigns/adsets';
import AdsComponent from './components/campaigns/ads';
import CampaignsListComponent from './components/campaigns/list/campaigns-list';
import AdsetsListComponent from './components/campaigns/list/adsets-list';
import BreakdownChartComponent from './components/breakdown-chart';
import KPIAnalysisComponent from './components/analytics/kpi-analysis';
import KPILandingComponent from './components/analytics/kpi-landing';
import AudienceFinderComponent  from './components/audience';
import LookaLike from './components/audience/lookalike';

/** Layouts **/
import LoginLayout from "./LoginLayout";
import DefaultLayout from "./DefaultLayout";
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/sign-up" />
          </Route>
          <LoginLayout path="/sign-up" component={SignUpComponent} />} />
          <LoginLayout path="/sign-up-continue" component={SignUpComponent1} />} />
          <LoginLayout path="/sign-in" component={SignInComponent} />} />
          <LoginLayout path={'/otp'} component={OtpComponent} />} />
          <LoginLayout path={'/reset-password'} component={ResetPasswordComponent} />} />
          <DefaultLayout path={'/privacy-policy'} component={PrivacyPolicyComponent} />} />
          <DefaultLayout path={'/terms-of-service'} component={TermsOfServiceComponent} />} />
          <DefaultLayout path={'/verify-email'} component={EmailComponent} />} />
          <DefaultLayout path={'/ad-network'} component={AdNetworkComponent} />} />
          <DefaultLayout path={'/add-network'} component={AddNetworkComponent} />} />
          <DefaultLayout path={'/ad-list'} component={AdListComponent} />} />
          <DefaultLayout path={'/survey'} component={SurveyComponent} />} /> */}
          <DefaultLayout path={'/registrations'} component={Stepper} />} />
          <DefaultLayout path={'/campaigns'} component={CampaignComponent} />} />
          <DefaultLayout path={'/adsets'} component={AdsetsComponent} />} />
          <DefaultLayout path={'/ads'} component={AdsComponent} />} />
          <DefaultLayout path={'/campaigns-list'} component={CampaignsListComponent} />} />
          <DefaultLayout path={'/adsets-list'} component={AdsetsListComponent} />} />
          <DefaultLayout path={'/kpi-analysis'} component={KPIAnalysisComponent} />} />
          <DefaultLayout path={'/breakdown-chart'} component={BreakdownChartComponent} />} />
          <DefaultLayout path={'/kpilanding'} component={KPILandingComponent} />} />
          <DefaultLayout path={'/audience-finder'} component={AudienceFinderComponent} />} />
          <DefaultLayout path={'/lookalike'} component={LookaLike} />} />
          <DefaultLayout path={'/*'} component={CampaignComponent} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;