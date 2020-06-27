import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <button onClick={this.props.click} className={this.props.class} disabled={this.props.state}>
                {!this.props.icnPosition && <i className={`${this.props.icon}`} />}
                {this.props.icon && this.props.text ? <span>&nbsp; {this.props.text}</span> : <span>{this.props.text}</span>}
                {this.props.icnPosition === 'right' && <i className={`${this.props.icon}`} />}
            </button>
         );
    }
}
 
export default Button;