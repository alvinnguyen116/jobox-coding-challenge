import React from "react";
import PropTypes from "prop-types";
import {setShowToast} from "../../../redux/actions/app";
import {addFavorite, removeFavorite} from "../../../redux/actions/dogs";
import {Icon} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import './photo.scss';

/**
 * @param url - the image to display
 * @param isLoaded - whether the image has finished loading
 * @param isFavorite - whether the image is currently a favorite image
 * @param dispatch
 * @desc A photo component
 */
function Photo({url, isLoaded, isFavorite, dispatch}) {

    // CONSTANTS -------------------------------------------------------------------------------------------------------

    const BUTTON_OPTION = Object.freeze({
        FAVORITE: "FAVORITE",
        COPY: "COPY"
    });

    // HANDLERS --------------------------------------------------------------------------------------------------------
    /**
     * @param e
     * @desc A click handler for triggering
     * link copying and favoriting or unfavoriting
     * a photo.
     */
    const handleOnClick = e => {
        const {buttonOption} = e.currentTarget.dataset;
        switch (buttonOption) {
            case BUTTON_OPTION.COPY:
                navigator.clipboard.writeText(url);
                dispatch(setShowToast(true));
                break;
            case BUTTON_OPTION.FAVORITE:
                if (isFavorite) {
                    dispatch(removeFavorite(url));
                } else {
                    dispatch(addFavorite(url));
                }
                break;
            default:
                break;
        }
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    /**
     * @desc Until the photo finished loading, render a default background.
     */
    if (isLoaded) {
        return  (
            <div className={"photo"} key={url}>
                <div
                    className={"card-container"}
                    style={{backgroundImage: `url(${url})`}}
                    onClick={handleOnClick}
                    data-button-option={BUTTON_OPTION.COPY}/>
                <div className={"buttons"}>
                    <span data-button-option={BUTTON_OPTION.FAVORITE} onClick={handleOnClick}>
                       <Icon className={isFavorite ? "favorite" : ""} icon={IconNames.STAR}/>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={"photo inactive"}>
            <div className={"card-container"}/>
        </div>
    );
}

Photo.propTypes = {
    url: PropTypes.string,
    isLoaded: PropTypes.bool,
    isFavorite: PropTypes.bool,
    dispatch: PropTypes.func
};

export default Photo;