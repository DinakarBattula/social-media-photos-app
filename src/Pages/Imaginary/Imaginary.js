import React, { useEffect, useState } from 'react';

import './Imaginary.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImagesApi, searchImages, setCommnet, setLikes, sortMostComments, sortMostLikes } from '../../redux/actions/Imaginary.actions';
import ImageModal from '../../Components/ImageModal/ImageModal';

const Imaginary = () => {

    const { picsData } = useSelector(state => {
        return {
            picsData: state.ImaginaryReducer.picsData
        }
    });

    const dispatch = useDispatch();

    /** This usestate is used to open and close the modal when we click on image.
     * we have to place the url in the below state to open the modal and place empty string value 
     * to close the modal. 
     */
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

    /* In useEffect, we are dispatching an action to call the api and get the images data. */
    useEffect(() => {
        dispatch(fetchImagesApi());
    }, [dispatch]);


    /** This function searches the image cards based on the value in search input. 
     * The searching is done on categories. 
     * @param event is the change event when we type in search input box.
     */
    const searchPics = (event) => {
        const searchValue = event.target.value;
        dispatch(searchImages({ searchValue }))
    }


    /** This function is used to post the comment for a particular image. 
     * It is triggered when we click on Post button.
     * Here Empty comments were restricted and were not added in the comments section.
     * @param event is the click event when we click on like or unlike link/button
     * @param picId is the index of the current shown list of image cards
     */
    const postComment = (event, picId) => {
        const currentCommnet = event.target.parentElement.querySelector('input').value;
        event.target.parentElement.querySelector('input').value = '';

        if (currentCommnet !== '') {
            dispatch(setCommnet({ commnet: currentCommnet, picId }));
        }
    }

    /**
     * This function changes the count of likes when we click on like or unlike link/text
     * @param event is the click event when we click on like or unlike link/text
     * @param picId is the index of the current shown list of image cards
     */
    const changeLikes = (event, picId) => {
        let likes = event.target.parentElement.querySelector('.likes').textContent;
        const currentAction = event.target.textContent;

        if (currentAction.toLowerCase() === 'like') {
            likes++;
            event.target.textContent = 'Unlike';
        } else {
            likes--;
            event.target.textContent = 'Like';
        }
        dispatch(setLikes({ likes, picId }))
    }

    return (
        <>
            {/* Header starts*/}
            <header>
                Imaginary
            </header>
            {/* Header ends */}

            {/* Filter Section */}
            <div className="filter-section row">
                <div className="col-4 sorting-links">
                    <div className="link" onClick={() => dispatch(sortMostLikes())}>Most liked</div>
                    <div className="link" onClick={() => dispatch(sortMostComments())}>Most commented</div>
                </div>
                <div className="col-4 search-input-container">
                    <input type="text" placeholder="Search images..." onChange={searchPics} />
                </div>
            </div>
            {/* Filter ends */}

            {/* Image card starts*/}
            <div className="images-container row">
                {picsData.pics.map((picInfo, picInfoIndex) =>
                    <div className="col col-4" key={picInfo.id}>
                        <div className="pic-container">
                            <img src={picInfo.url} alt={picInfo.category} onClick={() => setSelectedImageUrl(picInfo.url)} />
                            <div className="pic-info-section row">
                                <div className="likes-section">
                                    <span className="likes">{picInfo.likes}</span>
                                    <a className="link" onClick={(e) => changeLikes(e, picInfoIndex)}>Like</a>
                                </div>
                                <div className="category">{picInfo.category}</div>
                            </div>
                            <div className="comments-section">
                                <input type="text" className="comments-box" placeholder="Type your comment here..." />
                                <div className="post-comment" onClick={(e) => postComment(e, picInfoIndex)}>POST</div>
                                {
                                    picInfo.comments.map((commnet, index) =>
                                        <div className="comment" key={index}>{commnet}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Image card ends */}

            {/* Image Modal */}
            <ImageModal imageUrl={selectedImageUrl} onHide={() => setSelectedImageUrl('')} />
        </>
    )
}

export default Imaginary;