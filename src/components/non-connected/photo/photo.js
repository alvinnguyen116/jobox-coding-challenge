import React from "react";
import PropTypes from "prop-types";
import {addFavorite, removeFavorite} from "../../../redux/actions/dogs";
import {setSingleView} from "../../../redux/actions/app";
import {Icon} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import './photo.scss';

/**
 * @param url - the image to display
 * @param isLoaded - whether the image has finished loading
 * @param isFavorite - whether the image is currently a favorite image
 * @param singleView - whether the app state is in single view
 * @param dispatch
 * @desc A photo component
 */
function Photo({url, isLoaded, isFavorite, singleView, dispatch}) {

    // HANDLERS --------------------------------------------------------------------------------------------------------

    /**
     * @param e
     * @desc A click handler for a photo.
     * If the app is in single view, clicking
     * on a photo initiates favoriting, else
     * it sets single view to true.
     */
    const handleOnClick = async e => {
        if (singleView) {
            if (isFavorite) {
                dispatch(removeFavorite(url));
            } else {
                dispatch(addFavorite(url));
            }
        } else {
            e.persist();
            await dispatch(setSingleView(true));
            e.target.scrollIntoViewIfNeeded();
        }
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    const renderFavoriteButton = () => {
        if (singleView) {
            return (
                <div className={"buttons"}>
                    <Icon className={isFavorite ? "favorite" : ""} icon={IconNames.STAR}/>
                </div>
            );
        }
        return null;
    };

    /**
     * @desc Until the photo finished loading, render a default background.
     */
    if (isLoaded) {
        return  (
            <div className={`photo`} key={url} onClick={handleOnClick}>
                <div className={`card-container`} style={{backgroundImage: `url(${url})`}}/>
                {renderFavoriteButton()}
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