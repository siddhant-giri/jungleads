import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row } from 'react-bootstrap';
import { Input, Select } from 'antd';
import RDropdown from "../../../../../../reusable-component/dropdown";
import RInput from '../../../../../../reusable-component/input';
import { CAMPAIGNS_LIST } from "../../../../../../lib/constant";
import { filterByAction } from '../../../../../../actions/campaigns/campaign-list-action';

const { Option } = Select;

class CampaignListHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: "",
    };
  }

  handleDropdownChange = (option, type) => {
    const { filterByAction } = this.props;

    if (type === "filters") {
      this.setState({ selectedFilter: option });
      filterByAction(option.value);
    }
  };

  handleSearch = (e) => {
    console.log(e.currentTarget.value);
    this.props.searchBy(e.currentTarget.value);
  }

  searchOptions = (option) => {
    this.props.searchOptionChange(option);
  }

  render() {
    const { selectedFilter } = this.state;

    const selectAfter = (
      <Select defaultValue="Search by campaigns" className="select-after" onChange={this.searchOptions}>
        <Option value="campaigns">Search by campaigns</Option>
        <Option value="adsets">Search by adsets</Option>
        <Option value="ads">Search by ads</Option>
      </Select>
    );

    return (
      <div className="campaign-list-header">
        <Row className='search-dropdowns-body'>
          <div className='col-4'>
            <Input 
              prefix={<span className="material-icons search-icn">search</span>} 
              addonAfter={selectAfter}
              className='search-here'
              placeholder='Search keyword'
              onChange={(e) => this.handleSearch(e)}
            />
          </div>
          <div className='col-2' style={{margin: 'auto 0'}}>
            <RDropdown
              isSearchable={false}
              newDropdown={true}
              infoIcon={false}
              async={false}
              placeholder="Filter by"
              onChange={(option) => this.handleDropdownChange(option, "filters")}
              value={selectedFilter}
              isMulti={false}
              options={CAMPAIGNS_LIST.filters}
              styles="filter-by"
          />
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({state}) => ({});

const mapDispatchToProps = (dispatch) => {
  const actions = { filterByAction };
  return bindActionCreators(actions, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignListHeaderComponent);
