import React, { useState } from "react";

function ImagePreview({ image, deleteFunc }) {
    return (
        <div className="ImagePreview" draggable>
            <img src={image} alt="preview" />
            <div className="icon_container" onClick={deleteFunc}>
                <i className="fas fa-times"></i>
            </div>
        </div>
    );
}

export default ImagePreview;
