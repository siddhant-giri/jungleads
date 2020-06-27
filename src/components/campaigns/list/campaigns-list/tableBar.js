import React, { Component } from 'react';
import RButton from '../../../../reusable-component/button';
import Switch from 'react-switch';
import RDropdown from '../../../../reusable-component/dropdown';

class TableBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            checked: false
         }
    }

    handleSwitchChange = checked => {
        this.setState({checked});
    }

    handleDropddown = () => {

    }
    render() { 
        const {campaignRedirect, duplicate, listClickEnable, onEditButtonClick } = this.props;
        return ( 
            <div className='row d-flex justify-content-around'>
                  <RButton 
                    class="button"
                    click={() => campaignRedirect()}
                    text="Create"
                  />
                  <RButton 
                    class={`button ${listClickEnable ? 'enable' : 'disable'}`}
                    click={() => duplicate.modal()}
                    icon='biz-icon biz-icon-copy-item'
                    icnWidth={15}
                    text="Duplicate"
                    state={!listClickEnable}
                  />
                  <RButton 
                    class={`button ${listClickEnable ? 'enable' : 'disable'}`}
                    click={() => onEditButtonClick.modal()}
                    icon='biz-icon biz-icon-pencil'
                    icnWidth={15}
                    text='Edit'
                    state={!listClickEnable}
                  />
                  <RButton 
                    class={`button ${listClickEnable ? 'enable' : 'disable'}`}
                    text='A/B Testing'
                    state={!listClickEnable}
                  />
                  <RButton 
                    class={`button ${listClickEnable ? 'enable' : 'disable'}`}
                    // click={() => this.props.history.push('/campaigns')}
                    icon='biz-icon biz-icon-duplicated'
                    icnWidth={15}
                    state={!listClickEnable}
                  />
                  <RButton 
                    class={`button ${listClickEnable ? 'enable' : 'disable'}`}
                    icon='biz-icon biz-icon-rotate'
                    icnWidth={15}
                    state={!listClickEnable}
                  />
                  <RButton 
                    class={`button ${listClickEnable ? 'enable' : 'disable'}`}
                    // click={() => this.props.history.push('/campaigns')}
                    icon='biz-icon biz-icon-trash'
                    icnWidth={15}
                    state={!listClickEnable}
                  />
                  <RButton 
                    class={`button ${listClickEnable ? 'enable' : 'disable'}`}
                    icon='biz-icon biz-icon-import-export-arrows'
                    icnWidth={15}
                    state={!listClickEnable}
                  />
                  <span className='view-setup'>
                    <label>View Setup</label>
                    <Switch
                      id={'view-setup'}
                      onChange={this.handleSwitchChange}
                      checked={this.state.checked}
                      offColor="#9ebed9"
                      onColor="#2699fb"
                      width={50}
                      height={18}
                      uncheckedIcon={<div className="switch-off">OFF</div>}
                      checkedIcon={<div className="switch-on">ON</div>}
                    />
                  </span>
                  <div className='dropdown-style'>
                  <RDropdown
                    dataArr={[
                      { name: "Column by Performance" },
                      { name: "Column by Engagement" }
                    ]}
                    styles=""
                    action={this.handleDropddown}
                  />     
                  </div>             
                  <RButton 
                    class={`button enable`}
                    text='KPI'
                  />
                  <RButton 
                    class={`button enable`}
                    text='BREAKDOWN'
                  />
                </div>
                
         );
    }
}
 
export default TableBar;