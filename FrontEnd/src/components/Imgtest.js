import React, { useState } from "react";

function Imgtest() {
    const [img, setImg] = useState(null);
    const [returnedImg, setReturnedImg] = useState({
        img: "아직 서버로 부터 받은 이미지가 없습니다.",
        state: "empty_img",
    });

    function submitimg(e) {
        e.preventDefault();
        fetch("http://localhost:3001/sendimg", {
            method: "POST",
        })
            .then((response) => response.json())
            .then((response) => {
                setReturnedImg(response);
                setImg(null);
            });
    }

    function handleimg(e) {
        setImg(e.target.files[0]);
    }
    return (
        <div className="imgtest">
            <h1>이미지 테스트 컴포넌트</h1>
            <p>서버에 메세지 보내기</p>
            <form onSubmit={(e) => submitimg(e)}>
                <input
                    onChange={(e) => handleimg(e)}
                    id="img"
                    value={img.img}
                    type="file"
                    accept="image/*"
                    placeholder="서버로 전송할 이미지를 입력하세요..."
                ></input>
                <button>전송</button>
            </form>
            <p>서버 응답 메세지</p>
            <div className="return">
                <p>{returnedImg.img}</p>
                <p>{returnedImg.state}</p>
            </div>
        </div>
    );
}

export default Imgtest;
