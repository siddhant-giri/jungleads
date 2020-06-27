import React, { Component } from 'react';
import RButton from '../../../reusable-component/button';
import { map, pluck, reject } from "underscore";
import CheckboxTree from 'react-checkbox-tree';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    Dropdown,
    Button,
    ButtonGroup,
} from "react-bootstrap";

import { getSources, getCountriesGroup } from './service'

import Styles from './Styles.css'
class LookaLike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            expanded: [],
            source: [],
            countriesGroup: []
        }
        this.selector = [];
    }


    componentDidMount() {
        return Promise.all([getSources({
            userId: this.props.signIn.data.userId,
        }), getCountriesGroup({
            userId: this.props.signIn.data.userId,
        })])
            .then(response => {
                this.setState({
                    sources: response[0].data,
                    countriesGroup: response[1]
                })
            })
    }

    selectedSize = (e) => {
        this.selector = []
        this.setState({
            sizeCount: e.target.value
        });

        for (let index = 0; index < e.target.value; index++) {
            this.selector.push(
                <div>
                    <select className="range-selector">
                        {
                            map([null, 1, 2, 3, 4], value => {
                                return (<option value={value}>{value}</option>)
                            })
                        }
                    </select>
                    <select className="range-selector">{map([null, 1, 2, 3, 4], value => {
                        return (<option value={value}>{value}</option>)
                    })}</select>
                </div>
            )

        }
        return this.selector
    }

    render() {
        return (<div className="lookalike">
            <div className="row">
                <div className="col-9">
                    <h2>Create Look-alike Audience</h2>
                </div>
                <div className="col-3">
                    <RButton class='button create-aud-btn' text="CREATE AUDIENCE" click={() => { }} />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12">
                    <h4>Set parameters to achieve your similar audience set. </h4>
                </div>
            </div>
            <br />
            <br />
            <div className="row">
                <div className="col-4">
                    <h5>Select your look-alike source</h5> <br />
                    <div className="paramter-container">
                        <input type="text" name="search" className="search-source" placeholder="Search" />
                        {
                            map(this.state.sources, source => {
                                return (
                                    <div className="row source-details">
                                        <div className="col-9">
                                            <p className="source-type"> {source.subtype}</p>
                                            <span><i class="fa fa-users" aria-hidden="true" style={{ color: "#cccccc", paddingRight: "10px" }}>
                                            </i></span> <span className="user-data">{source.approximate_count}</span>
                                        </div>
                                        <div className="col-3">
                                            <div className="radio">
                                                <label><input type="radio" name="optradio" className="source-radio" /></label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-4">
                    <h5>Select audience location</h5>  <br />
                    <div>
                        <div className="paramter-container">
                            <input type="text" name="search" className="search-source" placeholder="Search" />
                            <CheckboxTree
                                nodes={this.state.countriesGroup}
                                checked={this.state.checked}
                                expanded={this.state.expanded}
                                onCheck={(checked, nodes) => {
                                    this.setState({ checked })
                                }}
                                onExpand={expanded => this.setState({ expanded })}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <h5>Select audience size</h5>  <br />
                    <div>
                        <div className="">
                            <select className="size-selector" onChange={this.selectedSize} placeholder="Size">
                                {
                                    map([null, 1, 2, 3, 4], value => {
                                        return (<option value={value}>{value}</option>)
                                    })
                                }
                            </select>
                            {/* <Dropdown as={ButtonGroup}>
                                <Button variant="" className="size-btn">
                                    Select size
                                </Button>
                                <Dropdown.Toggle
                                    split
                                    variant="success"
                                    id="dropdown-basic"
                                    className="size-btn-toggle"
                                />
                                <Dropdown.Menu >
                                    {
                                        map([1, 2, 3, 4], value => {
                                            return (<Dropdown.Item>{value}</Dropdown.Item>)
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown> */}
                            <br />
                            <br />
                            <div>
                                {
                                    (this.selector)
                                }
                            </div>
                            <br />
                            <p>Audience Size ranges from 0% - 10% of the
                            combined population of your selected locations.
                            A 1% lookalike consists of the people who are most
                            similar to your lookalike sources.

                            Increasing the percentage creates a bigger, broader
audience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}
const mapStateToProps = state => {
    return {
        signIn: state.signIn,
    };
};
const mapDispatchToProps = () => {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LookaLike));