import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Icon, Switch } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { CSSTransition } from "react-transition-group";
import {showFavoriteDogs} from "../../../redux/actions/dogs";
import {setFirstSearch} from "../../../redux/actions/app";
import {connect} from "react-redux";
import {throttle} from "lodash";
import {setDarkTheme} from "../../../redux/actions/app";
import './menu.scss';

/**
 * @param dispatch - used to dispatch actions to redux store
 * @param darkTheme - whether the current theme is dark
 * @desc The menu component opens and close a menu for the entire app.
 *
 * Features:
 *  - backdrop filter if vertical scroll position greater than zero
 *  - open & close dialog animation
 *  - slider for switching theme
 *  - button for showing favorite dogs
 */
function Menu ({dispatch, darkTheme}) {

    // COMPONENT STATE -------------------------------------------------------------------------------------------------

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Registers an event listener on the window's
     * vertical scroll position.
     */
    useEffect(() => {
        const updateScroll = throttle(() => {
            setScrollY(window.scrollY);
        }, 100);
        window.addEventListener("scroll", updateScroll);

        return () => {
            window.removeEventListener("scroll", updateScroll);
        };
    }, []);

    // HANDLERS --------------------------------------------------------------------------------------------------------

    /**
     * @desc A click handler for clicking on the
     * favorite button.
     */
    const handleOnClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        dispatch(setFirstSearch(false));
        dispatch(showFavoriteDogs());
        setMenuOpen(false);
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    /**
     * @desc A dialog background.
     */
    const renderBackground = () => {
        if (menuOpen) {
            return (
                <div className={"dialog-background"} onClick={() => setMenuOpen(false)}/>
            );
        }
        return null;
    };

    return (
        <>
            <div className={`menu ${scrollY > 0 ? 'active' : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <Icon icon={IconNames.MENU}/>
            </div>
            {renderBackground()}
            <CSSTransition in={menuOpen} unmountOnExit mountOnEnter classNames="dialog" timeout={250}>
                <nav>
                    <ul>
                        <li onClick={handleOnClick}>
                            <Icon icon={IconNames.STAR}/>
                            <div>Favorites</div>
                        </li>
                        <li>
                            <Icon icon={IconNames.MOON}/>
                            <Switch checked={darkTheme} onChange={() => dispatch(setDarkTheme(!darkTheme))}/>
                        </li>
                    </ul>
                </nav>
            </CSSTransition>
        </>
    );
}

const mapStateToProps = (state) => ({
    darkTheme: state.app.darkTheme
});

Menu.propTypes = {
    dispatch: PropTypes.func,
    darkTheme: PropTypes.bool
};

export default connect(mapStateToProps)(Menu);
