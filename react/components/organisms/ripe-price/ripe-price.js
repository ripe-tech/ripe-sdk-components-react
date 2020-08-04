import React, { Component } from "react";
import PropTypes from "prop-types";
import { Ripe } from "ripe-sdk";
import { mix } from "yonius";

import { MoneyMixin } from "../../../mixins";

export class RipePrice extends mix(Component).with(MoneyMixin) {
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
            version: null,
            parts: null,
            ripe: null,
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

        this.priceBind = this.state.ripeData.bind("price", value => this._onPriceChange(value));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currency !== this.props.currency) {
            this._configRipe();
        }
        this._updateConfiguration(this.props, prevProps);
    }

    async componentWillUnmount() {
        if (this.priceBind) await this.state.ripeData.unbind("price", this.priceBind);
        this.priceBind = null;
    }

    async _configRipe() {
        this.setState({ loading: true });

        try {
            await this.state.ripeData.config(this.props.brand, this.props.model, {
                version: this.props.version,
                parts: this.props.parts,
                currency: this.props.currency.toUpperCase()
            });
        } catch (error) {
            this.setState({ loading: false }, () => {
                this.props.onLoaded();
            });
        }
    }

    /**
     * Initializes RIPE instance if it does not exists and
     * configures it with the given brand, model, version
     * and parts. If a RIPE instance is provided, it will
     * be used without further configuration.
     */
    async _setupRipe() {
        if (!this.state.ripeData) {
            this.setState({ ripeData: new Ripe() }, async () => await this._configRipe());
        } else {
            await this._configRipe();
        }

        if (global.ripe) return;
        global.ripe = this.state.ripeData;
    }

    _priceText(value) {
        return this.formatMoney(value, this.props.currency);
    }

    _updateConfiguration(props, prevProps) {
        if (
            prevProps.brand !== props.brand ||
            prevProps.model !== props.model ||
            prevProps.version !== props.version
        ) {
            this.setState(
                {
                    partsData: null
                },
                async () => await this._configRipe()
            );
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
