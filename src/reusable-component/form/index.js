import './style.scss';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import * as _ from "underscore";
import { InputGroup, FormControl } from 'react-bootstrap';

// let register ={
//   username: '',
//   password: 'xyz',
// }
class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {toggle: true, data: {}};
  }
  handleChange = e => {
    let data = this.state.data;
    data[e.target.name]= e.target.value
    this.setState({ data });
  };
  toggleIcon = e => {
    this.setState({toggle: !this.state.toggle})
  }
  render() {
    const { formData } = this.props;
    return (
      <>
        {_.map(formData, (field, idx) => (
          <div key={idx} className={field.align}>
            {field.tag === 'dropdown' ? (
              <>
                <label className={`input-label row col-6`} htmlFor={field.name}>
                  {field.label}
                  <span className={field.errorClass}>{field.error}</span>
                </label>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className={field.class}>
                    {field.placeholder}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : field.tag === 'checkbox custom-control custom-checkbox' ? (
              <div className={field.class}>
              <input type={field.type} name={field.name} value={field.value} />{field.value}
              </div>
            ) : field.icon ? 
            <>
            <label className={`input-label row col-6`} htmlFor={field.name}>
                  {field.label}
                  <span className={field.errorClass}>{field.error}</span>
                </label>
            <InputGroup className="mb-3">
            <FormControl
              id={field.name}
              name={field.name || null}
              onChange={this.handleChange}
              type={this.state.toggle ? field.type : 'text'}
              defaultValue={field.value || null}
              placeholder={field.placeholder || null}
              style={field.style || null}
              className={`input ${field.class}`}
            />
            <InputGroup.Append>
              <InputGroup.Text onClick={this.toggleIcon}><i className={`${this.state.toggle ? field.icon : field.icon2}`} /></InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          </>
            :(
              <>
                <label className={`input-label row col-12`} htmlFor={field.name}>
                  {field.label}
                  <span className={field.errorClass}>{field.error}</span>
                </label>
                <input
                  id={field.name}
                  name={field.name || null}
                  onChange={this.handleChange}
                  type={field.type}
                  defaultValue={field.value || null}
                  placeholder={field.placeholder || null}
                  style={field.style || null}
                  className={`input ${field.class}`}
                  onClick={field.action ? () => field.action(this.state) : null}
                />
              </>
            )}
          </div>
        ))}
      </>
    );
  }
}

export default FormComponent;
