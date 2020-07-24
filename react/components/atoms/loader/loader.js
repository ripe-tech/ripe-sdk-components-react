import React, { Component } from "react";
import PropTypes from "prop-types";

import "loaders.css";

export class Loader extends Component {
    static get propTypes() {
        return {
            loader: PropTypes.string,
            count: PropTypes.number,
            loaderStyle: PropTypes.objectOf(PropTypes.string)
        };
    }

    static get defaultProps() {
        return {
            loader: "ball-pulse",
            count: 3,
            loaderStyle: {
                backgroundColor: "#5d5d5d"
            }
        };
    }

    _renderLoader() {
        const loaderElements = [];
        for (let index = 0; index < this.props.count; index++) {
            loaderElements.push(<div style={this.props.loaderStyle} key={index} />);
        }
        return loaderElements;
    }

    render() {
        return <div className={`loader ${this.props.loader}`}>{this._renderLoader()}</div>;
    }
}

export default Loader;
