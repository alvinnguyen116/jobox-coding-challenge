import React, {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Photos from "../photos/photos";
import Menu from "../menu/menu";
import ErrorBoundary from "../../non-connected/error-boundary/error-boundary";
import Search from '../../non-connected/search/search';
import {getDogs, setCurrentBreed, getRandomDogs} from '../../../redux/actions/dogs';
import fetchBreeds from '../../../redux/actions/breeds';
import {setFirstSearch, setError} from "../../../redux/actions/app";
import {breedToKey} from "../../../util/util";
import {Icon} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import "@blueprintjs/core/lib/css/blueprint.css";
import './App.scss';

/**
 * @param appState
 * @param dogState
 * @param breeds
 * @param dispatch - provided by connect, used to dispatch actions
 * @desc App is a top level connected component.
 *
 * Main Responsibilities:
 *  - fetching breeds data from Dogs API
 *  - updating theme
 *  - displaying a memoized photos component
 */
function App({appState, dogState, breeds, dispatch}) {

    // CONSTANTS -------------------------------------------------------------------------------------------------------

    const {firstSearch, darkTheme, singleView, hasError} = appState;
    const {dogs, currentBreed, showingFavoriteDogs, currentDogs} = dogState;

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Fetch all of the possible breeds
     * and subBreeds only once.
     */
    useEffect(() => {
        try {
            dispatch(fetchBreeds());
        } catch (err) {
            dispatch(setError(err));
        }
    }, []);

    /**
     * @desc Whenever the theme changes,
     * update the html class accordingly.
     */
    useEffect(() => {
        if (darkTheme) {
            document.querySelector("html").className = "dark";
            return;
        }
        document.querySelector("html").className = "light";
    }, [darkTheme]);

    /**
     * @desc Whenever the single view state changes,
     * update the card length CSS variable.
     */
    useEffect(() => {
        if (singleView) {
            document.querySelector("html").style.setProperty("--card-length", "90vw");
            return;
        }
        document.querySelector("html").style.setProperty("--card-length", "32vw");
    }, [singleView]);

    // HANDLERS --------------------------------------------------------------------------------------------------------

    /**
     * @param breed
     * @param subBreed
     * @desc A handler for dispatching actions to the
     * app and dog state according to the value selected
     * from the search component.
     */
    const handleValueChange = async ({breed,subBreed}) => {
        try {
            const key = breedToKey({breed,subBreed});
            if (!(key in dogs)) {
                await dispatch(getDogs(breed, subBreed));
            }
            await dispatch(setCurrentBreed(key));
            dispatch(getRandomDogs());
        } catch (err) {
            dispatch(setError(err));
        }
    };

    /**
     * @desc A focus handler for setting
     * first search to false.
     */
    const handleOnFocus = () => {
        try {
            dispatch(setFirstSearch(false));
        } catch (err) {
            dispatch(setError(err));
        }
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    /**
     * @desc Memoize the return value to control
     * when the photos component re-renders.
     */
    const dogPhotos = useMemo(() => {
        if (currentBreed && dogs[currentBreed] && dogs[currentBreed].size) {
            return (<Photos/>);
        }
        return null;
    }, [dogs, currentBreed]);

    /**
     * @desc A small component to show when
     * the user has selected "favorites" and
     * there are currently no favorite dogs
     * in the app state.
     */
    const noFavorites = (
      <div className={"no-favorites"}>
          <div>Click on the "</div>
          <Icon icon={IconNames.STAR_EMPTY}/>
          <div>" icon to favorite a photo.</div>
      </div>
    );

    const searchProps = {
        items: breeds,
        handleValueChange,
        handleOnFocus,
        firstSearch,
        dispatch
    };

    return (
        <ErrorBoundary dispatch={dispatch} hasError={hasError}>
            <main className={singleView ? "singleView" : ""}>
                <div className={`query-container ${firstSearch ? "first-search" : ""}`}>
                    <Search {...searchProps}/>
                </div>
                {(showingFavoriteDogs && !currentDogs.length) ? noFavorites : dogPhotos}
            </main>
            <Menu/>
        </ErrorBoundary>
    );
}

App.propTypes = {
    appState: PropTypes.object,
    dogState: PropTypes.object,
    breeds: PropTypes.array,
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
    dogState: state.dogs,
    breeds: state.breeds.breeds,
    appState: state.app
});

export default connect(mapStateToProps)(App);
