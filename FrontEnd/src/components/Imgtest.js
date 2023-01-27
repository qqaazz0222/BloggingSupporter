import React, { useState } from "react";
import axios from "axios";

function Imgtest() {
    const [img, setImg] = useState(null);
    const [returnedimg, setReturnedimg] = useState({
        msg: "아직 서버로 부터 받은 이미지가 없습니다.",
        state: "empty_img",
    });

    function submitimg(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", img);
        formData.append("filename", img.name);
        axios.post("http://localhost:3001/sendimg", formData).then((res) => {
            console.log(res);
            setReturnedimg(res.data);
        });
    }

    return (
        <div className="imgtest">
            <h1>이미지 테스트 컴포넌트</h1>
            <p>서버에 메세지 보내기</p>
            <form onSubmit={(e) => submitimg(e)}>
                <input
                    id="img"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setImg(event.target.files[0]);
                    }}
                />
                <button type="submit">전송</button>
            </form>
            <p>서버 응답 메세지</p>
            <div className="return">
                <p>{returnedimg.msg}</p>
                <p>{returnedimg.state}</p>
            </div>
        </div>
    );
}

export default Imgtest;
