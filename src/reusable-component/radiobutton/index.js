import React, { Component } from "react";
import * as _ from "underscore";
import {surveySchema} from '../../lib/schema';
import './style.scss';

class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (e) => {
      surveySchema[e.currentTarget.name] = e.currentTarget.value;
  }
  render() {
    const { formData } = this.props;

    return (
      <>
        {_.map(formData, (field, idx) => (
          <div className={`${field.align} ${field.class}`} key={idx}>
            <input
              type={field.type}
              name={field.name}
              defaultChecked={field.selected}
              id={field.id}
              value={field.value}
              onChange={field.handleChange || this.handleChange}
            />
            <label> {field.labelName} </label>
            {field.sublabel ? <><br/><span className='radio-sublabel'>{field.sublabel}</span></> : null}
          </div>
        ))}
      </>
    );
  }
}
export default RadioButton;
