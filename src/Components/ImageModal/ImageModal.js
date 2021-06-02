import React from 'react';

import './ImageModal.css';

const ImageModal = (props) => {

    const onMouseClick = (event) => {
        if (event.target.className === 'image-modal') {
            props.onHide();
        }
    }

    return (
        <div className="image-modal" style={{
            display: props.imageUrl === '' ? 'none' : 'block'
        }} onClick={onMouseClick}>
            <div className="image-body">
                <img src={props.imageUrl} alt="" />
            </div>
        </div>
    )
}

export default ImageModal;