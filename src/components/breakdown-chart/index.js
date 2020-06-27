import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from 'react-select'
import DatePicker from "react-datepicker";

import { map, pluck, reject } from "underscore";

import { getBreakdowns } from './breakdown';
import { addBreakdowns } from '../../actions/breakdown-chart/breakdown-chart-action';

import Collapsible from 'react-collapsible';
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";

class BreakdownChartComponent extends Component {
	constructor(props) {
		super(props)
		// Temporarily have set start date as -7 days from now.
		this.state = {
			startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
			endDate: new Date(),
			displayCriteria: [{ "label": "Amount Spent", "value": "amountSpent" }, { "label": "CPM", "value": "cpm" }, { "label": "Content Views", "value": "costPerContentView" }, { "label": "Purchase", "value": "purchase" }, { "label": "Add To Cart", "value": "addToCart" }, { "label": "Purchase Roas", "value": "purchaseRoas" }],
			options: [{ "label": "CTR", "value": "ctr" }, { "label": "CPC", "value": "cpc" }],
		}
	}

	componentDidMount() {
		// TODO fetch adset_id from redux.
		getBreakdowns({
			userId: this.props.signIn.data.userId,
			adset_id: '23843841643150372',
			date_start: this.state.startDate,
			date_end: this.state.endDate
		}).then(response => {
			this.setState({
				breakdowns: response.data.breakdowns
			});
			return this.props.addBreakdowns(response.data.breakdowns)
		})
	}

	/**
	 * Function to dynamically generate column width based on number of columns
	 */
	calculateColumnWidth = () => {
		return (100 / this.state.displayCriteria.length) + "%";
	}

	/**
	 * Function to remove the column of click of cross icon in header
	 */
	removeField = (fieldValue) => {
		let fields = reject(this.state.displayCriteria, field => {
			return field.value === fieldValue.value;
		});

		if (!this.state.options.includes(fieldValue)) {
			this.state.options.push(fieldValue);
		}
		this.setState({
			displayCriteria: fields
		})
	}

	/** 
	 * Function to add column based on the value selected from dropdown
	 * 
	*/
	onChangeFields = (selectedValue) => {
		let displayFields = this.state.displayCriteria;
		let fieldValue = pluck(displayFields, 'value');

		if (!fieldValue.includes(selectedValue.value)) {
			displayFields.push(selectedValue);
			this.setState({
				displayCriteria: displayFields
			})
		} else {
			// TODO: Need to replace alert with Snackbar
			alert('field already present')
		}
	}

	handleStartDateChange = (startDate) => {
		if (startDate > this.state.endDate) {
			this.setState({
				show: true
			})
			alert('start greater then end');
		} else {
			return getBreakdowns({
				userId: this.props.signIn.data.userId,
				adset_id: '23843841643150372',
				date_start: startDate,
				date_end: this.state.endDate
			})
				.then(response => {
					this.setState({
						breakdowns: response.data.breakdowns,
						startDate: startDate
					});
				})
		}
	}

	handleEndDateChange = (endDate) => {
		if (endDate < this.state.startDate) {
			this.setState({
				show: true
			})
			alert('start greater then end');
		} else {
			return getBreakdowns({
				userId: this.props.signIn.data.userId,
				adset_id: '23843841643150372',
				date_start: this.state.startDate,
				date_end: endDate
			})
				.then(response => {
					return this.setState({
						breakdowns: response.data.breakdowns,
						endDate: endDate
					});
				})
		}
	}


	render() {
		return (
			<div className="breakdown-chart">
				<div className="row">
					<div className="col-12">
						<div className="row">
							<div className="col-4"></div>
							<div className="col-4"></div>
							<div className="col-4 dateRange" style={{ display: 'inherit' }}>
								<b>Date: </b>
								<DatePicker
									className="form-control dateInput"
									selected={this.state.startDate}
									onChange={this.handleStartDateChange}
									dateFormat="yyyy-MM-dd"
								/>
								<p> - </p>
								<DatePicker
									className="form-control dateInput"
									selected={this.state.endDate}
									onChange={this.handleEndDateChange}
									dateFormat="yyyy-MM-dd"
								/>
							</div>
						</div>
						<br />
						
							<div className='breakdownChartTable col-12'>
								<div className="row criteria-panel">
									<div className="head-top-padding  col-1">Criteria</div>
									<div className="col-9">
										<div className="row head-top-padding">
											{
												map(this.state.displayCriteria, value => {
													return (<div style={{ width: this.calculateColumnWidth() }}> {value.label} <i className="fa fa-times-circle close-icon" onClick={() => { this.removeField(value) }}></i> </div>)
												})
											}
										</div>
									</div>
									<div className="col-2">
										<Select
											// defaultValue={{ label: labelWithIcon, value: 'some-value' }}
											options={this.state.options}
											onChange={this.onChangeFields}
											placeholder='Add'
										/>
									</div>
								</div>
								{
									map(this.state.breakdowns, (category, categoryIndex) => {
										return (<div>
											<Collapsible trigger={categoryIndex}
											triggerTagName="left-criteria-panel" key={categoryIndex}>
												{
													map(category, (subCategory, subCategoryIndex) => {
														return (
															<div className="row categories">
																<div className="col-1 sub-category">{subCategoryIndex}</div>
																<div className="col-9">
																	<div className="row">
																		{
																			map(this.state.displayCriteria, key => {
																				return (
																					<div style={{ width: this.calculateColumnWidth() }}>
																						<span>
																							<span>{(subCategory[key.value].current > subCategory[key.value].old) ? (<i className="fa fa-arrow-circle-up" style={{ paddingRight: '10px', color: '#4fab4f' }}></i>) : (subCategory[key.value].current < subCategory[key.value].old) ? (<i className="fa fa-arrow-circle-down" style={{ paddingRight: '10px', color: '#d40e0e' }}></i>) : (<i className="fa fa-dot-circle" style={{ paddingRight: '10px', color: '#808080' }}></i>)}</span>
																							<span>{subCategory[key.value].current} </span>
																						</span>
																					</div>
																				)
																			})
																		}
																	</div>
																</div>
																<div className="col-2"></div>
															</div>
														)
													})
												}
											</Collapsible>
											<hr />
										</div>)
									})
								}
							</div>
						
					</div>
				</div>
			</div>
		)




	}
}
const mapStateToProps = state => {
	return {
		signIn: state.signIn,
		breakdowns: state.breakdowns.breakdowns
	};
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		addBreakdowns
	}, dispatch);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(BreakdownChartComponent));
