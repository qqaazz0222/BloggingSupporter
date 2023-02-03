import React, { useState, useRef } from "react";

function Dragndrop() {
    const [files, setFiles] = useState(null);
    const inputRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files);
        console.log(Array.from(e.dataTransfer.files));
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
                    ref={inputRef}
                />
                <button onClick={() => inputRef.current.click()}>
                    Select Files
                </button>
            </div>
            {files && (
                <ul>
                    {Array.from(files).map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dragndrop;
