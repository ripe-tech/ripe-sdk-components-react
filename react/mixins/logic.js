import PropTypes from "prop-types";
import { Ripe } from "ripe-sdk";

export const LogicMixin = superclass =>
    class extends superclass {
        static get _propTypes() {
            return {
                /**
                 * An initialized RIPE instance form the RIPE SDK, if not defined,
                 * a new SDK instance will be initialized.
                 */
                ripe: PropTypes.object,
                /**
                 * The brand of the model.
                 */
                brand: PropTypes.string,
                /**
                 * The name of the model.
                 */
                model: PropTypes.string,
                /**
                 * The version of the build.
                 */
                version: PropTypes.number,
                /**
                 * The currency being used for the price of the model.
                 */
                currency: PropTypes.string,
                /**
                 * Indicates that the component should apply the config internally
                 * on component initialization.
                 */
                config: PropTypes.bool,
                /**
                 * The parts of the customized build as a dictionary mapping the
                 * name of the part to an object of material and color.
                 */
                parts: PropTypes.object,
                /**
                 * The initials value to be used in the RIPE instance.
                 */
                initials: PropTypes.string,
                /**
                 * The engraving value to be used in the RIPE instance.
                 */
                engraving: PropTypes.string,
                /**
                 * The set of (initials, engraving) per initials group
                 * to be used in the RIPE instance.
                 */
                initialsExtra: PropTypes.object,
                /**
                 * The normalized structure that uniquely represents
                 * the configuration "situation".
                 */
                structure: PropTypes.object,
                /**
                 * Callback called when the brand of the model is changed.
                 */
                onUpdateBrand: PropTypes.func,
                /**
                 * Callback called when the model is changed.
                 */
                onUpdateModel: PropTypes.func,
                /**
                 * Callback called when the version is changed.
                 */
                onUpdateVersion: PropTypes.func,
                /**
                 * Callback called when the parts of the model are changed. This
                 * can be due to restrictions and rules of the model when applying
                 * a certain customization.
                 */
                onUpdateParts: PropTypes.func,
                /**
                 * Callback called when the initials of the model are changed.
                 */
                onUpdateInitials: PropTypes.func,
                /**
                 * Callback called when the engraving of the model is changed.
                 */
                onUpdateEngraving: PropTypes.func,
                /**
                 * Callback called when the initials extra of the model are changed.
                 */
                onUpdateInitialsExtra: PropTypes.func,
                /**
                 * Callback called when the currency of the model is changed.
                 */
                onUpdateCurrency: PropTypes.func,
                /**
                 * Callback called when the structure is changed.
                 */
                onUpdateStructure: PropTypes.func,
                /**
                 * Callback when the image is loading.
                 */
                onLoading: PropTypes.func,
                /**
                 * Callback when the RIPE instance is configuring.
                 */
                onConfiguring: PropTypes.func,
                /**
                 * Callback when the configurator or image has finished loading,
                 * when it is possible to visualize it or when an error occurred.
                 */
                onLoaded: PropTypes.func,
                /**
                 * Callback when the RIPE instance ends its configuration.
                 */
                onConfigured: PropTypes.func
            };
        }

        static get _defaultProps() {
            return {
                ripe: null,
                brand: null,
                model: null,
                version: null,
                currency: null,
                config: null,
                parts: null,
                initials: null,
                engraving: null,
                initialsExtra: null,
                structure: null,
                onUpdateBrand: brand => {},
                onUpdateModel: model => {},
                onUpdateVersion: version => {},
                onUpdateParts: parts => {},
                onUpdateInitials: initials => {},
                onUpdateEngraving: engraving => {},
                onUpdateInitialsExtra: initialsExtra => {},
                onUpdateCurrency: currency => {},
                onUpdateStructure: structure => {},
                onLoading: () => {},
                onConfiguring: () => {},
                onLoaded: () => {},
                onConfigured: () => {}
            };
        }

        /**
         * Initializes RIPE instance if it does not exists and
         * configures it with the given brand, model, version
         * and parts. If a RIPE instance is provided, it will
         * be used without further configuration.
         */
        async setupRipe() {
            // in case the config is not explicitly defined "computes" the
            // best possible decision on if the instance should be configured
            const isNewInstance = Boolean(!this.state.ripeData && !global.ripe);
            const configData = this.props.config === null ? isNewInstance : this.props.config;

            const promisedSetState = state => new Promise(resolve => this.setState(state, resolve));
            await promisedSetState({ configData: configData });

            // in case there's no internal RIPE instance already
            // available then created a new one with default config
            if (!this.state.ripeData) {
                await promisedSetState({ ripeData: new Ripe() });
            }

            this.onPreConfig = this.state.ripeData.bind(
                "pre_config",
                async (brand, model, options) => {
                    await this._copyRipeData();
                }
            );

            this.onPostConfig = this.state.ripeData.bind(
                "post_config",
                async (loadedConfig, options) => {
                    await this._copyRipeData();
                }
            );

            this.onParts = this.state.ripeData.bind("parts", async parts => {
                if (this.equalParts(parts, this.partsData)) return;
                if (this.structureData) {
                    const structure = await this.state.ripeData.getStructure();
                    this.setState({ structureData: structure }, () =>
                        this.props.onUpdateStructure(structure)
                    );
                } else {
                    this.setState(
                        {
                            partsData: JSON.parse(JSON.stringify(this.state.ripeData.parts))
                        },
                        () => this.props.onUpdateParts(parts)
                    );
                }
            });

            this.onInitials = this.state.ripeData.bind("initials", async (initials, engraving) => {
                if (
                    initials === this.state.initialsData &&
                    engraving === this.state.engravingData
                ) {
                    return;
                }
                if (this.state.structureData) {
                    const structure = await this.state.ripeData.getStructure();
                    this.setState({ structureData: structure }, () =>
                        this.props.onUpdateStructure(structure)
                    );
                } else {
                    this.setState(
                        {
                            initialsData: this.state.ripeData.initials,
                            engravingData: this.state.ripeData.engraving
                        },
                        () => {
                            this.props.onUpdateInitials(this.state.ripeData.initials);
                            this.props.onUpdateEngraving(this.state.ripeData.engraving);
                        }
                    );
                }
            });

            this.onInitialsExtra = this.state.ripeData.bind(
                "initials_extra",
                async initialsExtra => {
                    if (this.equalInitialsExtra(initialsExtra, this.state.initialsExtraData)) {
                        return;
                    }
                    if (this.state.structureData) {
                        const structure = await this.state.ripeData.getStructure();
                        this.setState({ structureData: structure }, () =>
                            this.props.onUpdateStructure(structure)
                        );
                    } else {
                        this.setState(
                            {
                                initialsExtraData: JSON.parse(
                                    JSON.stringify(this.state.ripeData.initialsExtra)
                                )
                            },
                            () =>
                                this.props.onUpdateInitialsExtra(this.state.ripeData.initialsExtra)
                        );
                    }
                }
            );

            // in case the global RIPE instance is not set then
            // updates it with the current one
            if (!global.ripe) {
                global.ripe = this.state.ripeData;
            }

            if (this.state.configData) {
                // runs the initial configuration of the RIPE
                // instance properly setting its default
                await this.configRipe({
                    brand: this.props.brand,
                    model: this.props.model,
                    version: this.props.version,
                    currency: this.props.currency,
                    parts: this.props.parts,
                    initials: this.props.initials,
                    engraving: this.props.engraving,
                    initialsExtra: this.props.initialsExtra,
                    structure: this.props.structure
                });
            } else {
                await this.state.ripeData.isReady();
                await this._copyRipeData();
            }
        }

        /**
         * Configures the RIPE instance with the current brand,
         * model, version and parts defined in instance.
         */
        async configRipe({
            brand = undefined,
            model = undefined,
            version = undefined,
            parts = undefined,
            currency = undefined,
            initials = undefined,
            engraving = undefined,
            initialsExtra = undefined,
            structure = undefined
        } = {}) {
            this.setState({ configuring: true });

            // verifies if the parameters are 'undefined', since it is a valid
            // option for some parameters to be 'null', making a fallback to the
            // values saved in 'data'
            brand = brand === undefined ? this.state.brandData : brand;
            model = model === undefined ? this.state.modelData : model;
            version = version === undefined ? this.state.versionData : version;
            parts = parts === undefined ? this.state.partsData : parts;
            currency = currency === undefined ? this.state.currencyData : currency;
            initials = initials === undefined ? this.state.initialsData : initials;
            engraving = engraving === undefined ? this.state.engravingData : engraving;
            initialsExtra =
                initialsExtra === undefined ? this.state.initialsExtraData : initialsExtra;
            structure = structure === undefined ? this.state.structureData : structure;

            try {
                if (structure) {
                    // configures the SDK with the structure and currency values
                    // to allow only one call to make the whole setup, with currency
                    // included
                    await this.state.ripeData.config(structure.brand, structure.model, {
                        ...structure,
                        currency: currency ? currency.toUpperCase() : null
                    });

                    // sets the initials variables so that the personalization
                    // choices might be applied after the initials configuration
                    initials = structure.initials;
                    engraving = structure.engraving;
                    initialsExtra = structure.initials_extra;
                } else {
                    await this.state.ripeData.config(brand, model, {
                        version: version,
                        parts: parts,
                        currency: currency ? currency.toUpperCase() : null
                    });
                }

                // the initials must be set after the SDK configuration in
                // order to update all the children that show them, since
                // the configuration before does not calls the update with
                // the personalization
                if (initials) {
                    await this.state.ripeData.setInitials(initials, engraving);
                }
                if (initialsExtra) {
                    await this.state.ripeData.setInitialsExtra(initialsExtra);
                }
            } finally {
                this.setState({ configuring: false }, () => {
                    this.props.onConfigured();
                });
            }
        }

        shouldReset(value, previous) {
            // checks to see if the model, brand or version
            // changed but if the parts and personalization
            // options (initials, engraving, initialsExtra)
            // stayed the same
            return (
                (value.brand !== previous.brand ||
                    value.model !== previous.model ||
                    value.version !== previous.version) &&
                (this.equalParts(value.parts, previous.parts) ||
                    value.initials === previous.initials ||
                    value.engraving === previous.engraving ||
                    (value.initialsExtra &&
                        previous.initialsExtra &&
                        this.equalInitialsExtra(value.initialsExtra, previous.initialsExtra)) ||
                    (value.initials_extra &&
                        previous.initials_extra &&
                        this.equalInitialsExtra(value.initials_extra, previous.initials_extra)))
            );
        }

        equalParts(first, second) {
            if (!first && !second) return true;

            if (Boolean(first) !== Boolean(second)) {
                return false;
            }

            if (!this._subsetCompareParts(first, second)) {
                return false;
            }

            if (!this._subsetCompareParts(second, first)) {
                return false;
            }

            return true;
        }

        /**
         * Checks if two 'initialsExtra' are equal, by using a deep
         * comparison analysis. Equality is defined as, they produce
         * the same result after sanitization.
         *
         * @param {Object} first The first of the 'initialsExtra' being compared.
         * @param {Object} second The second of the 'initialsExtra' being compared.
         * @return {Boolean} Returns the result of the deep comparison.
         */
        equalInitialsExtra(first, second) {
            if (!first && !second) return true;

            if (Boolean(first) !== Boolean(second)) {
                return false;
            }

            if (!this._subsetCompareInitials(first, second)) {
                return false;
            }

            if (!this._subsetCompareInitials(second, first)) {
                return false;
            }

            return true;
        }

        equalStructure(first, second) {
            if (!first && !second) return true;
            if (!first || !second) return false;
            return (
                first.brand === second.brand &&
                first.model === second.model &&
                first.version === second.version &&
                this.equalParts(first.parts, second.parts) &&
                first.initials === second.initials &&
                first.engraving === second.engraving &&
                this.equalInitialsExtra(first.initials_extra, second.initials_extra)
            );
        }

        equalConfigOptions(first, second) {
            return (
                first.brand === second.brand &&
                first.model === second.model &&
                first.version === second.version &&
                first.currency === second.currency
            );
        }

        equalConfigOptionsStructure(first, second) {
            return (
                this.equalStructure(first.structure, second.structure) &&
                first.currency === second.currency
            );
        }

        async _componentDidUpdate(prevProps) {
            if (!this.state.ripeData || !this.state.configData || this.state.configuring) return;

            if (!this.equalParts(prevProps.parts, this.props.parts)) {
                this._updateParts(this.props.parts);
            }

            if (prevProps.initials !== this.props.initials) {
                this._updateInitials(this.props.initials);
            }

            if (prevProps.engraving !== this.props.engraving) {
                this._updateEngraving(this.props.engraving);
            }

            if (!this.equalInitialsExtra(prevProps.initialsExtra, this.props.initialsExtra)) {
                this._updateInitialsExtra(this.props.initialsExtra);
            }

            if (!this.equalConfigOptionsStructure(prevProps, this.props)) {
                this._updateConfigOptionsStructure(prevProps);
            }

            if (!this.equalConfigOptions(prevProps, this.props)) {
                this._updateConfigOptions(prevProps);
            }
        }

        async _copyRipeData() {
            if (this.props.structure) {
                const structure = await this.state.ripeData.getStructure();
                this.setState(
                    {
                        structureData: structure,
                        currencyData: this.state.ripeData.currency
                    },
                    () => {
                        this.props.onUpdateStructure(structure);
                        this.props.onUpdateCurrency(this.state.ripeData.currency);
                    }
                );
            } else {
                this.setState(
                    {
                        brandData: this.state.ripeData.brand,
                        modelData: this.state.ripeData.model,
                        versionData: this.state.ripeData.version,
                        partsData: JSON.parse(JSON.stringify(this.state.ripeData.parts)),
                        initialsData: this.state.ripeData.initials,
                        engravingData: this.state.ripeData.engraving,
                        initialsExtraData: JSON.parse(
                            JSON.stringify(this.state.ripeData.initialsExtra)
                        ),
                        currencyData: this.state.ripeData.currency
                    },
                    () => {
                        this.props.onUpdateBrand(this.state.brandData);
                        this.props.onUpdateModel(this.state.modelData);
                        this.props.onUpdateVersion(this.state.versionData);
                        this.props.onUpdateParts(this.state.partsData);
                        this.props.onUpdateInitials(this.state.initialsData);
                        this.props.onUpdateEngraving(this.state.engravingData);
                        this.props.onUpdateInitialsExtra(this.state.initialsExtraData);
                        this.props.onUpdateCurrency(this.state.currencyData);
                    }
                );
            }
        }

        async _updateConfigOptions(previous) {
            if (!this.state.ripeData || !this.state.configData) return;

            const config = {
                brand: this.props.brand,
                model: this.props.model,
                version: this.props.version,
                currency: this.props.currency,
                parts: this.props.parts,
                initials: this.props.initials,
                engraving: this.props.engraving,
                initialsExtra: this.props.initialsExtra
            };

            // resets the parts and personalization options if
            // the model was changed but they stayed the same,
            // which makes them invalid
            if (this.shouldReset(config, previous)) {
                config.parts = null;
                config.initials = "";
                config.engraving = null;
                config.initialsExtra = {};
            }

            // makes the configuration call with only the changed
            // values, defaulting to the 'data' values in the unchanged
            // ones, safeguarding against outdated props
            await this.configRipe({
                brand: config.brand !== previous.brand ? config.brand : undefined,
                model: config.model !== previous.model ? config.model : undefined,
                version: config.version !== previous.version ? config.version : undefined,
                currency: config.currency !== previous.currency ? config.currency : undefined,
                parts: config.parts,
                initials: config.initials !== previous.initials ? config.initials : undefined,
                engraving: config.engraving !== previous.engraving ? config.engraving : undefined,
                initialsExtra: !this.equalInitialsExtra(
                    config.initialsExtra,
                    previous.initialsExtra
                )
                    ? config.initialsExtra
                    : undefined
            });
        }

        async _updateConfigOptionsStructure(previous) {
            if (!this.state.ripeData || !this.state.configData || !this.props.structure) return;

            // verifies if there were no changes in the structure
            // and/or currency comparing to the previous structure
            // prop, making the configuration call with only the
            // changed values and defaulting to the 'data' values
            // for the others, which are updated
            const structure = this.props.structure;
            const previousStructure = previous.structure;
            const equalStructure =
                this.equalStructure(structure, this.state.structureData) ||
                this.equalStructure(structure, previousStructure);
            const equalCurrency = this.props.currency === previous.currency;
            if (equalCurrency && equalStructure) return;

            // resets the parts and personalization options if
            // the model was changed but they stayed the same,
            // which makes them invalid
            if (this.shouldReset(structure, previousStructure)) {
                structure.parts = null;
                structure.initials = "";
                structure.engraving = null;
                structure.initials_extra = {};
            }

            // resets the initials extra object if the initials and/or
            // engraving were modified but the initials extra stayed the
            // same, allowing an update that won't be overriden by the
            // outdated initials extra
            const equalInitialsEngraving =
                structure.initials === previousStructure.initials &&
                structure.engraving === previousStructure.engraving;
            const equalInitialsExtra = this.equalInitialsExtra(
                structure.initials_extra,
                previousStructure.initials_extra
            );
            if (equalInitialsExtra && !equalInitialsEngraving) structure.initials_extra = null;

            // configures the SDK with the currency, since it is not
            // present in the structure
            await this.configRipe({
                structure: !equalStructure ? structure : undefined,
                currency: !equalCurrency ? this.props.currency : undefined
            });
        }

        _subsetCompareParts(base, reference) {
            for (const name of Object.keys(base)) {
                // retrieves the part information for the current
                // name in iteration for both the base and the
                // reference set values (to be compared)
                const partB = base[name];
                const partR = reference[name];

                // if for a certain base part the corresponding
                // part does not exist in the reference then the
                // reference is considered to be invalid
                if (!partR) {
                    return false;
                }

                // in case either the initials or the engraving is
                // not matching then the subset is invalid
                if (partB.material !== partR.material || partB.color !== partR.color) {
                    return false;
                }
            }

            return true;
        }

        _subsetCompareInitials(base, reference) {
            for (const name of Object.keys(base)) {
                // retrieves the group information for the current
                // name in iteration for both the base and the
                // reference set values (to be compared)
                const groupB = base[name];
                const groupR = reference[name];

                // if for a certain base group the corresponding
                // group does not exist in the reference then the
                // reference is considered to be invalid
                if (!groupR) {
                    return false;
                }

                // in case either the initials or the engraving is
                // not matching then the subset is invalid
                if (groupB.initials !== groupR.initials || groupB.engraving !== groupR.engraving) {
                    return false;
                }
            }

            return true;
        }

        _updateParts(parts) {
            this.setState(
                {
                    partsData: parts
                },
                async () => {
                    await this.state.ripeData.setParts(parts);
                    await this.props.onUpdateParts(parts);
                }
            );
        }

        _updateInitials(initials) {
            this.setState(
                {
                    initialsData: initials
                },
                async () => {
                    await this.state.ripeData.setInitials(initials, this.state.engravingData);
                    await this.props.onUpdateInitials(initials);
                }
            );
        }

        _updateEngraving(engraving) {
            this.setState(
                {
                    engravingData: engraving
                },
                async () => {
                    await this.state.ripeData.setInitials(this.state.initialsData, engraving);
                    await this.props.onUpdateEngraving(engraving);
                }
            );
        }

        _updateInitialsExtra(initialsExtra) {
            this.setState(
                {
                    initialsExtraData: initialsExtra
                },
                async () => {
                    await this.state.ripeData.setInitialsExtra(this.state.initialsExtraData);
                    await this.props.onUpdateInitialsExtra(initialsExtra);
                }
            );
        }
    };
