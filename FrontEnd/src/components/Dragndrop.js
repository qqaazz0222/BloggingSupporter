import React, { useState } from "react";

function Dragndrop() {
    const [files, setFiles] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files);
        console.log(files);
    };

    return (
        <div className="dragndrop">
            <div
                className="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h1>Drag and Drop Files</h1>
                <h2>Or</h2>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    hidden
                />
                <button>Select Files</button>
            </div>
        </div>
    );
}

export default Dragndrop;
