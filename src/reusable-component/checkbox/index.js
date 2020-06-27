import React, { Component } from 'react';

class RCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            checked: false
        }
    }
    handleCheck(value, e){
        this.setState({
            checked: !this.state.checked
        });
        this.props.handleCheck({value, checked: e.target.checked})
    }
    render() { 
        const {id, label, subLabel, classname} = this.props;
        return ( 
            <div className={`checkbox custom-control custom-checkbox ${classname || null}`}>
              <input
                id={id || label}
                type="checkbox"
                className="custom-control-input"
                onChange={(e) => this.handleCheck(id || label, e)}
                defaultChecked={this.state.checked}
              />
              <label
                htmlFor={id || label}
                className="custom-control-label account-label"
              >
                {label}
                <br />
                <span>{subLabel}</span>
              </label>
            </div>
        );
    }
}
 
export default RCheckbox;