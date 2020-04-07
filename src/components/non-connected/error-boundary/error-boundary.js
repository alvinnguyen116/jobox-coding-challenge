import React from 'react';
import PropTypes from 'prop-types';
import {setError} from "../../../redux/actions/app";
import { Icon, Intent} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import './error-boundary.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.props.dispatch(setError({error,errorInfo}));
    }

    render() {
        if (this.state.hasError || this.props.hasError) {
            return (
                <main className={"error-boundary"}>
                    <div className={"message"}>
                        <Icon icon={IconNames.ERROR} intent={Intent.DANGER}/>
                        <h1>Sorry, something went wrong.</h1>
                        <h2>Please try again later.</h2>
                    </div>
                </main>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    dispatch: PropTypes.func,
    hasError: PropTypes.bool
};
export default ErrorBoundary;