import { Ripe } from "ripe-sdk";

export const LogicMixin = superclass =>
    class extends superclass {
        async _configRipe() {
            this.setState({ loading: true });

            try {
                await this.state.ripeData.config(this.props.brand, this.props.model, {
                    version: this.props.version,
                    parts: this.props.parts,
                    currency: this.props.currency ? this.props.currency.toUpperCase() : null
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

            // in case the global RIPE instance is not set then
            // updates it with the current one
            if (global.ripe) return;
            global.ripe = this.state.ripeData;
        }

        _equalParts(first, second) {
            if (!first && !second) return true;
            if (Boolean(first) !== Boolean(second)) {
                return false;
            }

            if (!this._subsetCompare(first, second)) {
                return false;
            }

            if (!this._subsetCompare(second, first)) {
                return false;
            }

            return true;
        }

        _subsetCompare(base, reference) {
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
    };
