import React, { Component } from "react";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { LogicMixin, MoneyMixin } from "../../../mixins";

export class RipePrice extends mix(Component).with(LogicMixin, MoneyMixin) {
    static get propTypes() {
        return {
            /**
             * The brand of the model.
             */
            brand: PropTypes.string.isRequired,
            /**
             * The name of the model.
             */
            model: PropTypes.string.isRequired,
            /**
             * Indicates that the component should apply the config internally.
             */
            config: PropTypes.bool,
            /**
             * The version of the build.
             */
            version: PropTypes.number.isRequired,
            /**
             * The parts of the customized build as a dictionary mapping the
             * name of the part to an object of material and color.
             */
            parts: PropTypes.object,
            /**
             * The currency being used for the price of the model.
             */
            currency: PropTypes.string.isRequired,
            /**
             * An initialized RIPE instance form the RIPE SDK, if not defined,
             * a new SDK instance will be initialized.
             */
            ripe: PropTypes.object,
            /**
             * Callback called when the parts of the model are changed. This
             * can be due to restrictions and rules of the model when applying
             * a certain customization.
             */
            onUpdateParts: PropTypes.func,
            /**
             * Callback when the price of the model changes. It can be triggered
             * when the currency is changed or the model and its parts.
             */
            onUpdatePrice: PropTypes.func,
            /**
             * Callback when the configurator is loading.
             */
            onLoading: PropTypes.func,
            /**
             * Callback when the configurator has finished loading,
             * when it is possible to visualize it or when an error occurred.
             */
            onLoaded: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            brand: null,
            model: null,
            config: true,
            version: null,
            parts: null,
            ripe: null,
            onUpdateParts: parts => {},
            onUpdatePrice: price => {},
            onLoading: () => {},
            onLoaded: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * The price of the current configuration of the model
             * and is dependent on the current currency.
             */
            price: null,
            /**
             * The price of the current configuration of the model
             * in string format, including the currency symbol.
             */
            priceText: null,
            /**
             * Parts of the model.
             */
            partsData: this.props.parts,
            /**
             * Flag that controls if the initial loading process for
             * the price is still running.
             */
            loading: true,
            /**
             * Ripe SDK instance, which can be later initialized
             * if the given prop is not defined.
             */
            ripeData: this.ripe
        };
    }

    async componentDidMount() {
        this.props.onLoading();

        await this._setupRipe();

        // saves the model parts after the RIPE configuration so that
        // possible changes due to restrictions can be communicated
        // to the parent component
        this.setState({ partsData: Object.assign({}, this.state.ripeData.parts) }, () =>
            this.props.onUpdateParts(this.state.ripeData.parts)
        );

        this.state.ripeData.bind("parts", parts => {
            if (this._equalParts(parts, this.state.partsData)) return;
            this.setState({ partsData: parts }, () => this.props.onUpdateParts(parts));
        });

        this.priceBind = this.state.ripeData.bind("price", value => this._onPriceChange(value));
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.currency !== this.props.currency) {
            if (this.props.config) this._configRipe();
        }
        if (!this._equalParts(prevProps.parts, this.props.parts)) {
            this._updateParts(this.props.parts);
        }
        await this._updateConfiguration(this.props, prevProps);
    }

    async componentWillUnmount() {
        if (this.priceBind) await this.state.ripeData.unbind("price", this.priceBind);
        this.priceBind = null;
    }

    _priceText(value) {
        return this.formatMoney(value, this.props.currency);
    }

    _updateParts(parts) {
        this.setState(
            {
                partsData: parts
            },
            async () => {
                await this.props.onUpdateParts(parts);
                await this._setPartsRipe(parts);
            }
        );
    }

    async _updateConfiguration(props, prevProps) {
        if (
            prevProps.brand !== props.brand ||
            prevProps.model !== props.model ||
            prevProps.version !== props.version
        ) {
            if (props.config) await this._configRipe();
        }
    }

    _onPriceChange(value) {
        const price = value.total.price_final;
        this.setState({ price: price, priceText: this._priceText(price) }, () =>
            this.props.onUpdatePrice(this._priceText())
        );
    }

    _onLoad() {
        this.setState({ loading: false }, () => this.props.onLoaded());
    }

    render() {
        return <div className="ripe-price">{this.state.priceText}</div>;
    }
}

export default RipePrice;
