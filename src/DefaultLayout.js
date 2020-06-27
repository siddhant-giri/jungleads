import SideBarComponent from './components/navigation/side-nav';
import NavBarComponent from './components/navigation/nav-bar';

import React from 'react';  
import { Route } from 'react-router-dom';  
  
const DefaultLayout = ({children, ...rest}) => {  
    return (
        <div>
            <NavBarComponent auth={true} />
            <SideBarComponent />
            <div id="right-panel" className="right-panel">
                <div className="container-fluid">
                   {children}
                </div>
            </div>
        </div>
    )
}  
  
const DashboardLayoutRoute  = ({component: Component, ...rest}) => {
  return (  
    <Route {...rest} render={matchProps => (  
      <DefaultLayout>  
          <Component {...matchProps} />  
      </DefaultLayout>  
    )} />  
  )  
};  
  
export default DashboardLayoutRoute; 
