import React, { Component } from "react";
import {
  Dropdown,
  Button,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import RLabel from "../labels";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import * as _ from "underscore";
import "./style.scss";

class RDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: "Select from the menu",
    };
  }

  select = (e, data) => {
    e.stopPropagation();
    this.setState({
      currentItem: data.name || data,
    });
    this.props.action(data);
  };
  render() {
    const {
      dataArr,
      label,
      infoIcon,
      styles,
      arr,
      error,
      toolTip,
      async,
      options,
      isMulti,
      value,
      onChange,
      onAsyncChange,
      promiseOptions,
      newDropdown,
      isSearchable,
      placeholder,
    } = this.props;
    let arrData = dataArr || arr;

    const renderNewDropdown = (
        <>
          {label && <RLabel
            label={label}
            infoIcon={infoIcon}
            toolTip={toolTip}
            error={error}
          />}
          {!async ? (
            <Select
              isSearchable={isSearchable}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              options={options}
              isMulti={isMulti}
              className='new-dropdown'
              classNamePrefix={`${styles} dropdown`}
            />
          ) : (
            <AsyncSelect
              onChange={onAsyncChange}
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
              className='new-dropdown'
              classNamePrefix='dropdown'
            />
          )}
        </>
      );
    if(newDropdown) return renderNewDropdown;
    return (
      <>
        {label ? <span>{label}</span> : null}
        {infoIcon ? (
          <OverlayTrigger
            placement={"right"}
            overlay={<Tooltip id={`tooltip-right`}>{toolTip}</Tooltip>}
          >
            <i className="info-icon biz-icon biz-icon-information-_1_"></i>
          </OverlayTrigger>
        ) : null}
        {error ? <span className="error">{error}</span> : null}
        {label || infoIcon ? <br /> : null}
        <Dropdown as={ButtonGroup} className={styles}>
          <Button variant="success" className="btn-1">
            {this.state.currentItem}
          </Button>
          <Dropdown.Toggle
            split
            variant="success"
            id="dropdown-basic"
            className="btn-toggle-1"
          />
          <Dropdown.Menu>
            {_.map(arrData, (data, idx) => (
              <Dropdown.Item
                key={idx}
                href="#abc"
                onClick={(e) => this.select(e, data)}
              >
                {data.name || data}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}

export default RDropdown;
