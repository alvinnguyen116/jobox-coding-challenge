import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useInView} from 'react-intersection-observer';
import {debounce} from "lodash";

/**
 * @param children
 * @param handleLastRow {function} - handler to call on last row
 * @param className {string?}
 * @desc An infinite scrolling wrapper component.
 */
function InfiniteScroll({children, handleLastRow, className = ''}) {

    // CONSTANTS -------------------------------------------------------------------------------------------------------

    const [lastRowRef, lastRowInView] = useInView();
    const onLastRow = debounce(handleLastRow, 250);

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Whenever the last row is in view,
     * call the debounced last row handler.
     */
    useEffect(() => {
        if (lastRowInView) {
            onLastRow();
        }
    }, [lastRowInView]);

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    return (
        <div className={className}>
            {children}
            <div ref={lastRowRef}/>
        </div>
    );
}

InfiniteScroll.propTypes = {
    handleLastRow: PropTypes.func,
    className: PropTypes.string
};

export default InfiniteScroll;