import React, { useState, useRef } from "react";
import axios from "axios";
import Image from "./Image";
import "../styles/Dragndrop.css";
import upload from "../assets/images/upload.png";

function Dragndrop(props) {
    const [files, setFiles] = useState(null);
    const [preview, setPreview] = useState([]);
    const inputRef = useRef();

    function handleDragOver(e) {
        e.preventDefault();
        document.getElementById("dropzone").style.background = "var(--m0)";
    }

    function handleDragLeave(e) {
        e.preventDefault();
        document.getElementById("dropzone").style.background = "#fff";
    }

    function handleDrop(e) {
        e.preventDefault();
        document.getElementById("dropzone").style.background = "#fff";
        let fileArr = e.dataTransfer.files;
        setFiles(Array.from(fileArr));
        let fileURLs = [];
        let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

        for (let i = 0; i < filesLength; i++) {
            let file = fileArr[i];
            let reader = new FileReader();
            reader.onload = () => {
                fileURLs[i] = reader.result;
                setPreview([...fileURLs]);
            };
            reader.readAsDataURL(file);
        }
    }

    function handlePreview(e) {
        let fileArr = e.target.files;
        setFiles(Array.from(fileArr));
        let fileURLs = [];
        let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

        for (let i = 0; i < filesLength; i++) {
            let file = fileArr[i];
            let reader = new FileReader();
            reader.onload = () => {
                fileURLs[i] = reader.result;
                setPreview([...fileURLs]);
            };
            reader.readAsDataURL(file);
        }
    }

    function uploadFiles(e) {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("file" + String(i), files[i]);
        }
        formData.append("length", files.length);
        axios.post(props.server_url + "/test", formData).then((res) => {
            console.log(res);
        });
    }

    return (
        <div className="container">
            <div className="dragndrop">
                <form onSubmit={(e) => uploadFiles(e)}>
                    <div
                        id="dropzone"
                        className="dropzone"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current.click()}
                    >
                        <img src={upload} />
                        <p>Drag & Drop Images Here</p>
                        <input
                            id="files"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                handlePreview(e);
                            }}
                            hidden
                            ref={inputRef}
                        />
                        <button
                            className="btn"
                            onClick={() => inputRef.current.click()}
                        >
                            파일 선택
                        </button>
                        {files && (
                            <div className="preview">
                                <Image preview={preview} files={files} />
                            </div>
                        )}
                    </div>
                    <button className="btn" type="submit">
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Dragndrop;
