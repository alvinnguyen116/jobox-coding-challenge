import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Photo from "../../non-connected/photo/photo";
import InfiniteScroll from "../../non-connected/infinite-scroll/infinite-scroll";
import {getRandomDogs, appendCurrentDogs} from "../../../redux/actions/dogs";
import {setError} from "../../../redux/actions/app";
import {promisifyPhotos} from "../../../util/util";
import './photos.scss';

/**
 * @param dogState
 * @param dispatch
 * @param singleView - whether the current app state is in single view
 * @desc Photos is a connected component for displaying
 * the current dogs from the dog state as photos.
 *
 * Features:
 *  - maintains a loaded photos state so that each page is loaded simultaneously
 *  - renders dog photos with infinite scrolling
 */
function Photos({dogState, dispatch, singleView}) {

    // CONSTANTS -------------------------------------------------------------------------------------------------------

    const {currentBreed, dogs, currentDogs, favoriteDogs, showingFavoriteDogs, pageSize} = dogState;
    const max = (showingFavoriteDogs ? favoriteDogs.length : dogs[currentBreed].size);

    // COMPONENT STATE -------------------------------------------------------------------------------------------------

    const [loadedPhotos, setLoadedPhotos] = useState([]);

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Whenever the app state for showing favorite
     * dogs changes and if it is true, clear the loaded photos.
     */
    useEffect(() => {
        if (showingFavoriteDogs) {
            setLoadedPhotos([]); // reset
        }
    }, [showingFavoriteDogs]);

    /**
     * @desc Whenever current dogs changes,
     * wait for all of the not yet loaded
     * dog photos to load, then update the
     * loaded photos state with all of the
     * dogs simultaneously.
     */
    useEffect(() => {
        let isMounted = true;
        try {
            const notLoadedPhotos = currentDogs.filter(dog => !loadedPhotos.includes(dog));
            promisifyPhotos(notLoadedPhotos).then(() => {
                if (isMounted) {
                    setLoadedPhotos([...loadedPhotos, ...notLoadedPhotos]);
                }
            });
        } catch (err) {
            dispatch(setError(err));
        }

        return () => {
            isMounted = false;
        }
    }, [currentDogs]);

    // HANDLERS --------------------------------------------------------------------------------------------------------

    /**
     * @desc A handler to call when the last
     * row inside of an infinite scroll is
     * in view.
     */
    const handleLastRow = () => {
        try {
            const {length} = currentDogs;
            if (length < max) {
                if (showingFavoriteDogs) {
                    dispatch(appendCurrentDogs(favoriteDogs.slice(length, length + pageSize)));
                } else {
                    dispatch(getRandomDogs());
                }
            }
        } catch (err) {
            dispatch(setError(err));
        }
    };

    // COMPONENTS ------------------------------------------------------------------------------------------------------

    /**
     * @desc Prepares a list of dog photos to be rendered
     * inside of an infinite scrolling component.
     */
    const rows = currentDogs.map(url => {
        const props = {
            url,
            key: url,
            isFavorite: favoriteDogs.includes(url),
            isLoaded: loadedPhotos.includes(url),
            singleView,
            dispatch
        };
        return (<Photo {...props}/>);
    });

    const infiniteScrollProps = {
        className: `photos ${singleView ? " single-view" : ""}`,
        handleLastRow,
        dispatch,
        children: rows
    };

    return (<InfiniteScroll {...infiniteScrollProps}/>);
}

const mapStateToProps = (state) => ({
    dogState: state.dogs,
    singleView: state.app.singleView
});

Photos.propTypes = {
    dogState: PropTypes.object,
    dispatch: PropTypes.func,
    singleView: PropTypes.bool
};

export default connect(mapStateToProps)(Photos);

