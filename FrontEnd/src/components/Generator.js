import React, { useState } from "react";
import axios from "axios";
import "../styles/Generator.css";

function Generator(props) {
    const [img, setImg] = useState(null);
    const [returnedMsg, setReturnedMsg] = useState({
        msg: "아직 서버로부터 받은 키워드가 없습니다.",
        state: "empty_keyword",
        recommend: [],
    });

    function uploadImg(e) {
        e.preventDefault();
        props.setLoading(true);
        const formData = new FormData();
        formData.append("image", img);
        formData.append("filename", img.name);
        axios.post(props.server_url + "/upload", formData).then((res) => {
            console.log(res);
            props.setReturnedMsg(res.data);
            props.setLoading(false);
        });
    }

    return (
        <div className="container">
            <div className="generator">
                <p>이미지 업로드</p>
                <form onSubmit={(e) => uploadImg(e)}>
                    <input
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImg(e.target.files[0]);
                        }}
                    />
                    <button className="btn" type="submit">
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Generator;
