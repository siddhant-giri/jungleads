import "./style.scss";
import React, { Component } from "react";
import RButton from "../../../reusable-component/button";
import FunnelAnalysisComponent  from "../kpi-landing/funnel-analysis"
import SideBarComponent from "../../navigation/side-nav";

class KPILandingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div>
        <SideBarComponent />
        <div id="right-panel" className="kpi-landing right-panel">
          <div id="page"></div>
          <div className="container-fluid row kpi-block">
            <div className="col-12 content-block">
              <h2 className="header-analysis">KPI Analysis</h2>
              <hr className="divider"></hr>
              <div><FunnelAnalysisComponent></FunnelAnalysisComponent></div>
              <hr className="divider"></hr>
              <div className="row justify-content-md-center">
              <span style={{ fontSize: "18px", marginTop: "20px", display: "block" }}><b>Sorry, you did not invest enough to avail this feature</b></span>
              </div>
              <div className="row justify-content-md-center">
              <span style={{ fontSize: "18px", marginTop: "20px", display: "block" }}>Minimum Investment</span>
              </div>
              <div className="row justify-content-md-center money-val">
              <span >$ 2000</span>
              </div>
              <div className="row justify-content-md-center">
              <RButton 
                      class="button"
                      text="START INVESTMENT"
                    />
              </div>
              </div>
              </div>
      </div>
      </div>
    );
  }
}

export default KPILandingComponent