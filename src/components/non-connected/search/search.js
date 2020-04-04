import React, {useState, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import {Icon} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {mod, prettifyBreed, breedToKey, keyToBreed} from "../../../util/util";
import './search.scss';

/**
 * @param items {[]} - the items to make searchable and selectable
 * @param handleValueChange {function} - a handler to call on the selected item
 * @param firstSearch {boolean} - whether the first search is completed
 * @desc A search bar component for selecting a type of breed.
 *
 * Features:
 *  - displays an option dialog on input focus
 *  - allow dialog search on Arrow keys (up & down)
 *  - allow option selection on click and Enter key
 */
function Search({items, handleValueChange, firstSearch}) {

    // CONSTANTS -------------------------------------------------------------------------------------------------------

    const INITIAL_PLACEHOLDER = "Search dog breed";
    const KEY_CODE = Object.freeze({
        UP: 38,
        DOWN: 40,
        ENTER: 13
    });

    // COMPONENT STATE -------------------------------------------------------------------------------------------------

    const [inputVal, setInputVal] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [placeholder, setPlaceholder] = useState(INITIAL_PLACEHOLDER);

    // ELEMENT REFS ----------------------------------------------------------------------------------------------------

    const searchContainerRef = useRef(null);
    const currOptionRef = useRef(null);

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Whenever the current option changes,
     * scroll it into view if needed.
     */
    useEffect(() => {
       const {current} = currOptionRef;
       if (current) current.scrollIntoViewIfNeeded(false);
    }, [selectedIndex]);

    /**
     * @desc Registers an event listener for detecting
     * clicks outside of the search container. Close the
     * option dialog on outside click.
     */
    useEffect(() => {
        const handleClick = e => {
            if (!searchContainerRef.current.contains(e.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    /**
     * @desc Whenever items changes, make sure to update the
     * filtered list of items.
     */
    useEffect(() => {setFilteredItems(items)}, [items]);

    /**
     * @desc Whenever the input value changes, update the
     * filtered list of items.
     */
    useEffect(() => {
        const cache = {};
        if (!(inputVal in cache)) {
            cache[inputVal] = items.filter(({breed, subBreed}) => // prefix match
                `${breed} ${subBreed}`.slice(0,inputVal.length).toLowerCase() === inputVal.toLowerCase()
            );
        }
        setFilteredItems(cache[inputVal]);
    }, [inputVal]);

    /**
     * @desc If the component state is currently NOT showing the
     * option dialog, then reset the placeholder.
     */
    useEffect(() => {
        if (!showOptions) setPlaceholder(INITIAL_PLACEHOLDER);
    }, [showOptions]);

    // HANDLERS --------------------------------------------------------------------------------------------------------

    /**
     * @param e
     * @desc A change handler for updating
     * the appropriate states on input change.
     */
    const handleOnChange = e => {
        try {
            setInputVal(e.target.value);
            setShowOptions(true);
            if (!e.target.value && filteredItems.length) setPlaceholder(prettifyBreed(filteredItems[0]));
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @param key - the string representation of a breed as a key
     * @desc A handler for selecting an option. Updates the input,
     * closes the option dialog, and calls the parent handler.
     */
    const optionSelect = key => {
        try {
            const breed = keyToBreed(key);
            setInputVal(prettifyBreed(breed));
            setShowOptions(false);
            handleValueChange(breed);
            setSelectedIndex(0); // reset
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @param e
     * @desc A keyup handler. Deals with updating
     * the input placeholder and selecting an option.
     */
    const handleOnKeyUp = e => {
        try {
            const {length} = filteredItems;
            let newIndex;
            switch(e.keyCode) {
                case KEY_CODE.DOWN:
                    newIndex = mod(selectedIndex + 1, length);
                    setSelectedIndex(newIndex);
                    setPlaceholder(prettifyBreed(filteredItems[newIndex]));
                    break;
                case KEY_CODE.UP:
                    newIndex = mod(selectedIndex - 1, length);
                    setSelectedIndex(newIndex);
                    setPlaceholder(prettifyBreed(filteredItems[newIndex]));
                    break;
                case KEY_CODE.ENTER:
                    optionSelect(breedToKey(filteredItems[selectedIndex]));
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * @desc A focus handler for opening
     * the option dialog.
     */
    const handleOnFocus = () => {
        setShowOptions(true);
        if (filteredItems.length) {
            setPlaceholder(prettifyBreed(filteredItems[0]));
        }
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    /**
     * @desc Renders an options dialog.
     */
    const renderOptions = () => {
        if (showOptions && filteredItems.length) {
            const options = filteredItems.map((breed,i) => {
                const val = breedToKey(breed);
                const label = prettifyBreed(breed);
                const props = {
                    className: "option",
                    key: val,
                    value: val
                };
                if (i === selectedIndex) { // special style and ref for current selected option
                    props.className += " selected";
                    props.ref = currOptionRef;
                }
                return (<option {...props}>{label}</option>);
            });
            return (
                <div className={"options-container"}>
                    <div className="options" onClick={e => optionSelect(e.target.value)}>
                        {options}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div
            className={"search-container"}
            style={{'width': (firstSearch ? '50%' : "80%")}}
            ref={searchContainerRef}>
            <Icon icon={IconNames.SEARCH}/>
            <input
                type="text"
                className={(showOptions ? "focus" : "") + (showOptions && filteredItems.length ? " dropdown" : "")}
                value={inputVal}
                spellCheck={false}
                onKeyUp={handleOnKeyUp}
                onChange={handleOnChange}
                placeholder={placeholder}
                onFocus={handleOnFocus}/>
            {renderOptions()}
        </div>
    );
}

Search.propTypes = {
    items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    handleValueChange: PropTypes.func,
    firstSearch: PropTypes.bool
};

export default Search;
