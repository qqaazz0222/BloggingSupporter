import React, { useState } from "react";
import axios from "axios";

const UploadAndDisplayImage = () => {
    const [img, setImg] = useState(null);
    const [returnedimg, setReturnedimg] = useState(null);

    function submitimg(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", img);
        axios.post("http://localhost:3001/sendimg", formData).then((res) => {
            console.log(res);
        });
    }

    return (
        <div>
            <form onSubmit={(e) => submitimg(e)}>
                <input
                    type="file"
                    accept="image/*"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setImg(event.target.files[0]);
                    }}
                />
                <button type="submit">전송</button>
            </form>
            <p>{returnedimg}</p>
        </div>
    );
};

export default UploadAndDisplayImage;
