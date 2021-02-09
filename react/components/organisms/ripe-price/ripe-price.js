import React, { Component } from "react";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { LogicMixin, MoneyMixin } from "../../../mixins";

export class RipePrice extends mix(Component).with(LogicMixin, MoneyMixin) {
    static get propTypes() {
        return {
            ...this._propTypes,
            /**
             * Callback when the price of the model changes. It can be triggered
             * when the currency is changed or the model and its parts.
             */
            onUpdatePrice: PropTypes.func,
            /**
             * Callback called when a error happens while fetching the price.
             */
            onPriceError: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            ...this._defaultProps,
            onUpdatePrice: price => {},
            onPriceError: error => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * RIPE instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: props.ripe,
            /**
             * Brand to be used for the internal sync operation.
             */
            brandData: props.brand,
            /**
             * Model to be used for the internal sync operation.
             */
            modelData: props.model,
            /**
             * 3DB version to be used for the internal sync operation.
             */
            versionData: props.version,
            /**
             * Currency to be used for the internal sync operation.
             */
            currencyData: props.currency,
            /**
             * Reflects whether this component should apply
             * configuration changes to the associated RIPE SDK.
             */
            configData: props.config,
            /**
             * Parts of the model to be used for the internal sync
             * operation.
             */
            partsData: props.parts,
            /**
             * Initials to be used for the internal sync operation.
             */
            initialsData: props.initials,
            /**
             * Engraving to be used for the internal sync operation.
             */
            engravingData: props.engraving,
            /**
             * Initials extra to be used for the internal sync operation.
             */
            initialsExtraData: props.initialsExtra,
            /**
             * Structure to be used for the internal sync operation.
             */
            structureData: props.structure,
            /**
             * Flag that controls if the initial loading process for
             * the configurator is still running.
             */
            loading: true,
            /**
             * Flag that controls if the configuring process is
             * still running.
             */
            configuring: false,
            /**
             * The price of the current configuration of the model
             * and is dependent on the current currency.
             */
            price: null,
            /**
             * The error raised when fetching the price.
             */
            error: null
        };
    }

    async componentDidMount() {
        this.props.onLoading();

        await this.setupRipe();

        this.onPrice = this.state.ripeData.bind("price", price => {
            this.setState({ error: null, price: price }, () => this.props.onUpdatePrice(price));
        });
        this.onPriceError = this.state.ripeData.bind("price_error", error => {
            this.setState({ error: error, price: null }, () => this.props.onPriceError(error));
        });

        this.props.onLoaded();
    }

    async componentDidUpdate(prevProps) {
        this._componentDidUpdate(prevProps);
    }

    async componentWillUnmount() {
        if (this.onPriceError) this.state.ripeData.unbind("price_error", this.onPriceError);
        if (this.onPrice) this.state.ripeData.unbind("price", this.onPrice);
    }

    priceText() {
        return this.state.error
            ? "Error"
            : this.formatMoney(
                  this.state.price ? this.state.price.total.price_final : null,
                  this.state.currencyData
              );
    }

    render() {
        return <div className="ripe-price">{this.priceText()}</div>;
    }
}

export default RipePrice;
