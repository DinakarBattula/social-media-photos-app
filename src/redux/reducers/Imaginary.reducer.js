import { imaginaryConstants } from "../constants";

const initialState = {
    actualPicsData: {
        metadata: {},
        pics: []
    },
    picsData: {
        metadata: {},
        pics: []
    },
    loading: false,
    errorMessage: ''
}

export const ImaginaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case imaginaryConstants.FETCH_IMAGES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case imaginaryConstants.FETCH_IMAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                picsData: action.payload,
                actualPicsData: action.payload
            };
        case imaginaryConstants.FETCH_IMAGES_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case imaginaryConstants.SET_COMMENT:
            let picsDataforComments = { ...state.picsData };
            picsDataforComments.pics[action.payload.picId].comments.push(action.payload.commnet);
            let actualPicsData;
            if (state.actualPicsData.pics.length === state.picsData.pics.length) {
                actualPicsData = JSON.parse(JSON.stringify(state.picsData));
            } else {
                actualPicsData = state.actualPicsData
            }
            return {
                ...state,
                actualPicsData
            };
        case imaginaryConstants.SET_LIKES:
            let picsDataForLikes = { ...state.picsData };
            picsDataForLikes.pics[action.payload.picId].likes = action.payload.likes;
            let currentActualPicsData;
            if (state.actualPicsData.pics.length === state.picsData.pics.length) {
                currentActualPicsData = JSON.parse(JSON.stringify(state.picsData));
            } else {
                currentActualPicsData = state.actualPicsData
            }
            return {
                ...state,
                actualPicsData: currentActualPicsData
            };
        case imaginaryConstants.SORT_MOST_LIKES:
            let picsDataForMoreLikes = { ...state.picsData };
            picsDataForMoreLikes.pics = state.actualPicsData.pics.sort((currPic, nextPic) => nextPic.likes - currPic.likes);
            return {
                ...state,
                picsData: picsDataForMoreLikes
            };
        case imaginaryConstants.SORT_MOST_COMMENTS:
            let picsDataForMoreComments = { ...state.picsData };
            picsDataForMoreComments.pics = state.actualPicsData.pics.sort((currPic, nextPic) => nextPic.comments.length - currPic.comments.length);
            return {
                ...state,
                picsData: picsDataForMoreComments
            };
        case imaginaryConstants.SEARCH_IMAGES:
            let picsDataForSearchImages = { ...state.actualPicsData };
            if (action.payload.searchValue !== '') {
                picsDataForSearchImages.pics = state.actualPicsData.pics.filter(currPic => currPic.category.toLowerCase().includes(action.payload.searchValue.toLowerCase()));
            } else {
                picsDataForSearchImages.pics = state.actualPicsData.pics;
            }
            return {
                ...state,
                picsData: picsDataForSearchImages
            };
        default:
            return state;
    }
}