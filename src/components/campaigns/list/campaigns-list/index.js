import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as _ from "underscore";

import RTable from "../../../../reusable-component/table";
import { Tab, Tabs, Spinner } from "react-bootstrap";
import {Spin} from 'antd';
import { TABLE } from "../../../../lib/constant";

import {
  getCampaignsList,
  createCampaignCopies,
} from "../../../../actions/campaigns/create-campaign-action";
import { createAdsetCopies } from "../../../../actions/campaigns/adsets-action";
import { createAdCopies } from "../../../../actions/campaigns/ad-action";
import { adsetMapper, adsMapper } from "./methods";
import "./style.scss";
import TableBar from "./tableBar";
import ModalComponent from "./modal/modal";
import EditModalComponent from "./modal/editModal";
import CampaignsListHeaderComponent from './section/header';
import { toggleSpinner } from "../../../../actions/spinner/spinner-action";
import LoadingOverlay from "react-loading-overlay";

class CampaignsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignsList: [],
      adsetsList: [],
      adsList: [],
      filteredList: [],
      searchFilter: ['no query'],
      filtereActive: false,
      campaignSwitchesStates: {},
      adsetSwitchesStates: {},
      adsSwitchesStates: {},
      checked: false,
      modal: false,
      showEditModal: false,
      selectedTab: "campaigns",
      checkboxState: false,
      selectedList: null,
    };
  }

  componentDidMount() {
    this.getListData();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.filterQuery !== this.props.filterQuery){
      this.handleFilterBy(nextProps.filterQuery);
    }
  }

  getListData() {
    getCampaignsList({
      userId: this.props.signIn.data.userId,
      adAccountId: "act_189522688767499",
    }).then((res) => {
      let temp = [];
      let campaignTempState = {};
      _.each(res, (data, idx) => {
        let obj = {};
        campaignTempState[`${data.name}${idx}`] =
          data.effective_status === "ACTIVE" ? true : false;
        obj.col1 = {
          id: data.id,
          accountId: data.account_id,
          campaignName: data.name,
          delivery: data.effective_status,
          graph: "#abc",
          chart: "#abc",
          edit: "#abc",
          duplicate: "#abc",
        };
        obj.col2 = "Using adsets budget";
        if (data.insights && data.insights.data) {
          let insightObj = data.insights.data.find(
            (insight) => insight.account_id === data.account_id
          );
          // console.log('Insight obj ', insightObj);
          if (insightObj.objective === "PAGE_LIKES") {
            let actionResult = insightObj.actions.find(
              (action) => action.action_type === "like"
            );
            let actionLinkClickResult = insightObj.actions.find(
              (action) => action.action_type === "link_click"
            );
            let costPerActionResult = insightObj.cost_per_action_type.find(
              (costPerAction) => costPerAction.action_type === "like"
            );
            obj.col3 = actionResult.value;
            obj.col6 = costPerActionResult.value;
            obj.col9 = actionResult.value;
            obj.col10 = actionLinkClickResult.value;
          }

          obj.col4 = insightObj.reach;
          obj.col5 = insightObj.impressions;
          obj.col7 = insightObj.spend;
          obj.col8 = insightObj.date_stop;
        } else {
          obj.col3 = "---";
          obj.col4 = "---";
          obj.col5 = "---";
          obj.col6 = "---";
          obj.col7 = "---";
          obj.col8 = "---";
          obj.col9 = "---";
          obj.col10 = "---";
        }
        temp.push({
          col1: obj.col1,
          col2: obj.col2,
          col3: obj.col3,
          col4: obj.col4,
          col5: obj.col5,
          col6: obj.col6,
          col7: obj.col7,
          col8: obj.col8,
          col9: obj.col9,
          col10: obj.col10,
        });
        // ADSETS DATA ARRAY
        if (!_.isEmpty(data.adsets)) {
          let adsetResult = adsetMapper(data);
          this.setState({
            adsetsList: adsetResult.adsetTemp,
            adsetSwitchesStates: adsetResult.adsetTempState,
          });
        }
        if (!_.isEmpty(data.ads)) {
          let adsResult = adsMapper(data);
          this.setState({
            adsList: adsResult.adsTemp,
            adsSwitchesStates: adsResult.adsTempState,
          });
        }
      });
      this.setState({
        campaignsList: temp,
        campaignSwitchesStates: campaignTempState,
      });
    });
  }

  handleTabClick = (eventKey) => {
    const {filterQuery} = this.props;
    let filteredList = _.filter(this.state[`${eventKey}List`], (campaign) => {
      return campaign.col1.delivery === filterQuery;
    });
    this.setState({ selectedTab: eventKey, filteredList });
  };

  handleToggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleEditModal = () => {
    this.setState({ showEditModal: !this.state.showEditModal });
  };

  handleFilterBy = (filterQuery) => {
    let filteredList = _.filter(this.state[`${this.state.selectedTab}List`], (campaign) => {
      return campaign.col1.delivery === filterQuery;
    })
    this.setState({filteredList, filtereActive: true });
  }

  searchBy = (searchQuery) => {
    let searchFilter = [];
    if(searchQuery.length > 0){
      this.state[`${this.state.selectedTab}List`].forEach(campaign => {
        if(campaign.col1.campaignName.includes(searchQuery)){
          searchFilter.push(campaign);
        }
      });
      this.setState({searchFilter});
    }else{
      searchFilter.push('no query');
      this.setState({searchFilter})
    }
  }

  checkBox = (value) => {
    this.setState({
      checkboxState: value.checkbox.checked,
      selectedList: value.data,
    });
  };

  submitModal = (value) => {
    let obj = {
      userId: this.props.signIn.data.userId,
      numberOfCopies: value.numberOfCopies,
    };
    const { toggleSpinner } = this.props;
    switch (this.state.selectedTab) {
      case "campaigns":
        obj.campaignId = this.state.selectedList.col1.id;
        createCampaignCopies(obj).then((res) => {
          console.log(res);
          this.getListData();
        });
        break;
      case "adsets":
        obj.adsetId = value.campaignId
          ? value.campaignId
          : this.state.selectedList.col1.id;
        toggleSpinner(true);
        createAdsetCopies(obj).then((res) => {
          console.log(res);
          this.getListData();
          toggleSpinner(false);
        });
        break;
      case "ads":
        obj.adId = this.state.selectedList.col1.id;
        createAdCopies(obj).then((res) => {
          console.log(res);
          this.getListData();
        });
        break;
      default:
        break;
    }
  };

  render() {
    console.log(this.props.filterQuery);
    const {
      campaignsList,
      adsetsList,
      adsList,
      campaignSwitchesStates,
      adsetSwitchesStates,
      adsSwitchesStates,
      modal,
      selectedTab,
      checkboxState,
      selectedList,
      showEditModal,
      filteredList,
      filtereActive,
      searchFilter,
    } = this.state;
    const { toggleSpinner } = this.props;

    const filteredData = {
      campaigns: searchFilter[0] !== 'no query' ? searchFilter : filtereActive ? filteredList : campaignsList,
      adsets: searchFilter[0] !== 'no query' ? searchFilter : filtereActive ? filteredList : adsetsList,
      ads: searchFilter[0] !== 'no query' ? searchFilter : filtereActive ? filteredList : adsList,
    }

    if (_.isEmpty(campaignSwitchesStates)) {
      // initialize loader if data not loaded completely
      toggleSpinner(true);
    } else {
      toggleSpinner(false);
    }
    return (
      // <LoadingOverlay
      //   active={this.props.spinner}
      //   spinner={<Spinner animation="border" variant="primary" />}
      //   classNamePrefix="loader_"
      // >
      <Spin spinning={this.props.spinner} wrapperClassName='loader'>
        <div className="campaigns-list">
          <div className="container row">
            <div className="list-tabs">
              <CampaignsListHeaderComponent 
                searchBy={this.searchBy} 
                searchOptionChange={this.handleTabClick}
              />
              <Tabs
                activeKey={selectedTab}
                transition={false}
                id="noanim-tab-example"
                onSelect={this.handleTabClick}
              >
                <Tab className="sub-tab" eventKey="campaigns" title="Campaigns">
                  <TableBar
                    campaignRedirect={() =>
                      this.props.history.push("/campaigns")
                    }
                    duplicate={{
                      modal: this.handleToggleModal,
                    }}
                    onEditButtonClick={{
                      modal: this.toggleEditModal,
                    }}
                    listClickEnable={checkboxState}
                  />
                  <RTable
                    checkbox={{
                      render: true,
                      method: this.checkBox,
                      id: "campaigns",
                    }}
                    tableHead={TABLE.tableHead}
                    lists={filteredData.campaigns}
                    states={campaignSwitchesStates || null}
                  />
                </Tab>
                <Tab className="sub-tab" eventKey="adsets" title="Adsets">
                  <TableBar
                    campaignRedirect={() =>
                      this.props.history.push("/campaigns")
                    }
                    duplicate={{
                      modal: this.handleToggleModal,
                    }}
                    onEditButtonClick={{
                      modal: this.toggleEditModal,
                    }}
                    listClickEnable={checkboxState}
                  />
                  <RTable
                    checkbox={{
                      render: true,
                      method: this.checkBox,
                      id: "adsets",
                    }}
                    tableHead={TABLE.adsetTableHead}
                    lists={filteredData.adsets}
                    states={adsetSwitchesStates}
                  />
                </Tab>
                <Tab className="sub-tab" eventKey="ads" title="Ads">
                  <TableBar
                    campaignRedirect={() =>
                      this.props.history.push("/campaigns")
                    }
                    duplicate={{
                      modal: this.handleToggleModal,
                    }}
                    onEditButtonClick={{
                      modal: this.toggleEditModal,
                    }}
                    listClickEnable={checkboxState}
                  />
                  <RTable
                    checkbox={{
                      render: true,
                      method: this.checkBox,
                      id: "ads",
                    }}
                    tableHead={TABLE.adsTableHead}
                    lists={filteredData.ads}
                    states={adsSwitchesStates}
                    listClickEnable={checkboxState}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
          <ModalComponent
            show={modal}
            toggleModal={this.handleToggleModal}
            tab={selectedTab}
            submit={this.submitModal}
            user={{
              userId: this.props.signIn.data.userId,
              adAccountId: "act_189522688767499",
            }}
            selectedCampaignId={selectedList ? selectedList.col1.id : null}
          />
          <EditModalComponent
            show={showEditModal}
            toggleEditModal={this.toggleEditModal}
            userObj={{
              userId: this.props.signIn.data.userId,
              adAccountId: "act_189522688767499",
            }}
            selectedListData={selectedList}
          />
        </div>
      {/* </LoadingOverlay> */}
      </Spin>
    );
  }
}

const mapStateToProps = ({state, signIn, spinner, campaigns}) => ({
  signIn: signIn,
  spinner: spinner.data,
  filterQuery: campaigns.campaignsList && campaigns.campaignsList.filterQuery,
  state,
});

const mapDispatchToProps = (dispatch) => {
  const actions = { toggleSpinner };
  return bindActionCreators(actions, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CampaignsListComponent));
