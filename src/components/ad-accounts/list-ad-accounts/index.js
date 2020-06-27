import './style.scss';

import { Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import RButton from '../../../reusable-component/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAdAccounts, registerUserData } from '../../../actions/ad-network/ad-network-action';
import * as _ from "underscore";

class AdListAccount extends Component {
  constructor(props) {
    super(props);
    this.props.getAdAccounts(this.props.adAccountData.accessToken);
    this.state = {
      submit: true,
      fbBtn: false,
      googleBtn: false,
      checked: false,
      checkState: false,
      selectedAdAccounts: []
    };
  }

  singleCheck = (e) => {
    console.log(e.target.checked, e.target.id);
    const selectedAdAccounts = this.state.selectedAdAccounts;
    if(e.target.checked){
      selectedAdAccounts.push({id: e.target.id, value: e.target.checked})
      this.setState({
        selectedAdAccounts
      });
    } else {
      const newArr = this.state.selectedAdAccounts.filter((item) => item.id !== e.target.id);
      this.setState({
        selectedAdAccounts: newArr
      });
    }
  };

  multiChecked = () => {
    this.checkCheckBoxState();
    this.setState({
      checked: !this.state.checked
    })
  }

  checkCheckBoxState = () => {
    this.setState({
      checkState: !this.state.checkState
    });
  }

  submit = () => {
    const { adAccountList } = this.props;
    const {id, sub} = this.props.signIn.data;
    let obj = {
      userId: id,
      userName: sub,
      fbData: this.props.adAccountData
    };
    if(this.state.checkState){
      obj.adAccountList = this.props.adAccountList.data;
    }else {
      let result = [];
      _.each(this.state.selectedAdAccounts, (data) => {
          result.push(adAccountList.data[data.id]);
      });
      obj.adAccountList = result;
    }
    console.log(obj);
    registerUserData(obj);
  }

  render() {
    console.log(this.props);
    if (this.props.adAccountList && this.props.adAccountList.data) {
      this.props.adAccountList.data.map(data => {
        if(data.account_status === 1){
          data.account_status = 'Active'
        }
      })
      return (
        <div className="ad-list">
          <div className="list-of-accounts mx-auto">
            <div className="select-account-heading">
              Select accounts you want to manage{' '}
            </div>
            <div className="select-account">
              <Row className="account-details-heading">
                <div className="custom-control custom-checkbox">
                  <input id="name" onChange={this.multiChecked} type="checkbox" className="custom-control-input" />
                  <label htmlFor="name" className="custom-control-label">NAME</label>
                </div>
                <label className="col-3 offset-5 account-header">ID</label>
                <label className="col-3 account-header">STATUS</label>
              </Row>
            </div>

            {this.props.adAccountList.data.map((data, idx) => (
              <Row key={idx}>
                <div className="col-4 custom-control custom-checkbox"
                >
                  {this.state.checkState ? 
                    <input
                    id={idx}
                    type="checkbox"
                    className="custom-control-input"
                    onChange={this.multiCheck}
                    checked={this.state.checked}
                  />
                  :
                  <input
                    id={idx}
                    type="checkbox"
                    className="custom-control-input"
                    onChange={this.singleCheck}
                    defaultChecked={false}
                  />
                  }
                  
                  <label htmlFor={idx} className="custom-control-label account-label">
                    {data.name}
                  </label>
                </div>
                <label className="col-4 account-header">{data.account_id}</label>
                <label className="col-3 account-status">
                  <span className="status-color">{data.account_status}</span>
                </label>
              </Row>
            ))}
            <Row className="text-center" style={{ display: 'inherit' }}>
              <RButton click={this.submit} text="CONTINUE" class="button submit-btn" />
            </Row>
          </div>
          <Row className="logo-images">
            <Col>
              <img
                alt=""
                style={{ float: 'right' }}
                src="/assets/bitmap-imgs/facebook.png"
              ></img>
            </Col>
            <Col>
              <img
                alt=""
                style={{ float: 'left' }}
                src="/assets/bitmap-imgs/google.png"
              ></img>
            </Col>
          </Row>
        </div>
      );
    }
    return <div></div>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  let data = { signIn: state.signIn, adAccountData: null, adAccountList: null };
  if (state.adNetwork.adAccountData) {
    data.adAccountData = state.adNetwork.adAccountData;
  }

  if (state.adNetwork.adAccountList) {
    data.adAccountList = state.adNetwork.adAccountList;
  }
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { getAdAccounts };
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AdListAccount));
