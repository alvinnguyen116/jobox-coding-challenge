import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Photo from "../../non-connected/photo/photo";
import InfiniteScroll from "../../non-connected/infinite-scroll/infinite-scroll";
import {getRandomDogs, appendCurrentDogs} from "../../../redux/actions/dogs";
import {promisifyPhotos} from "../../../util/util";
import './photos.scss';

/**
 * @param dogState
 * @param dispatch
 * @desc Photos is a connected component for displaying
 * the current dogs from the dog state as photos.
 *
 * Features:
 *  - maintains a loaded photos state so that each page is loaded simultaneously
 *  - renders dog photos with infinite scrolling
 */
function Photos({dogState, dispatch}) {

    // CONSTANTS -------------------------------------------------------------------------------------------------------

    const {currentBreed, dogs, currentDogs, favoriteDogs, showingFavoriteDogs, pageSize} = dogState;
    const max = (showingFavoriteDogs ? favoriteDogs.length : dogs[currentBreed].size);

    // COMPONENT STATE -------------------------------------------------------------------------------------------------

    const [loadedPhotos, setLoadedPhotos] = useState([]);

    // SIDE EFFECTS ----------------------------------------------------------------------------------------------------

    /**
     * @desc Whenever current dogs changes,
     * wait for all of the not yet loaded
     * dog photos to load, then update the
     * loaded photos state with all of the
     * dogs simultaneously.
     */
    useEffect(() => {
        let isMounted = true;
        const notLoadedPhotos = currentDogs.filter(dog => !loadedPhotos.includes(dog));
        promisifyPhotos(notLoadedPhotos).then(() => {
            if (isMounted) {
                setLoadedPhotos([...loadedPhotos, ...notLoadedPhotos]);
            }
        });

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
        const {length} = currentDogs;
        if (length < max) {
            if (showingFavoriteDogs) {
                dispatch(appendCurrentDogs(favoriteDogs.slice(length, length + pageSize)));
            } else {
                dispatch(getRandomDogs());
            }
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
            dispatch
        };
        return (<Photo {...props}/>);
    });

    return (
        <InfiniteScroll className={"photos"} handleLastRow={handleLastRow}>
            {rows}
        </InfiniteScroll>
    );
}

const mapStateToProps = (state) => ({
    dogState: state.dogs
});

Photos.propTypes = {
    dogState: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Photos);

