import React from "react";

const Image = (props) => {
    return (
        <div className="item">
            <div className="imgs">
                {props.preview.map((url) => {
                    return <img alt={url} key={url} src={url} />;
                })}
            </div>
            <div className="tags">
                {props.files.map((file) => {
                    return <span>{file.name}</span>;
                })}
            </div>
        </div>
    );
};

export default Image;
