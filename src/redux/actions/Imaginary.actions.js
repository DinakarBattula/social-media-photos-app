import { imaginaryConstants } from '../constants';

const fetchImagesRequest = () => {
    return {
        type: imaginaryConstants.FETCH_IMAGES_REQUEST
    }
}

const fetchImagesSuccess = (payload) => {
    return {
        type: imaginaryConstants.FETCH_IMAGES_SUCCESS,
        payload
    }
}

const fetchImagesFailure = (payload) => {
    return {
        type: imaginaryConstants.FETCH_IMAGES_FAILURE,
        payload
    }
}

export const setCommnet = (payload) => {
    return {
        type: imaginaryConstants.SET_COMMENT,
        payload
    }
}

export const setLikes = (payload) => {
    return {
        type: imaginaryConstants.SET_LIKES,
        payload
    }
}

export const sortMostLikes = () => {
    return {
        type: imaginaryConstants.SORT_MOST_LIKES
    }
}

export const sortMostComments = () => {
    return {
        type: imaginaryConstants.SORT_MOST_COMMENTS
    }
}

export const searchImages = (payload) => {
    return {
        type: imaginaryConstants.SEARCH_IMAGES,
        payload
    }
}

export const fetchImagesApi = () => {
    return dispatch => {
        dispatch(fetchImagesRequest());

        fetch("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json").then(
            res => {
                res.json().then(
                    response => {
                        dispatch(fetchImagesSuccess(response));
                    }
                )
            }
        );
    }
}