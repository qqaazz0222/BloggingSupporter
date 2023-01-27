import React, { useState } from "react";

function Imgtest() {
    const [data, setData] = useState({
        img: "",
    });
    const [returnedImg, setReturnedImg] = useState({
        img: "아직 서버로 부터 받은 이미지가 없습니다.",
        state: "empty_img",
    });

    function submit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:5000/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                img: data.img,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setReturnedImg(response);
                setData({ img: "" });
            });
    }

    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }
    return (
        <div className="imgtest">
            <h1>이미지 테스트 컴포넌트</h1>
            <p>서버에 메세지 보내기</p>
            <form onSubmit={(e) => submit(e)}>
                <input
                    onChange={(e) => handle(e)}
                    id="img"
                    value={data.Img}
                    type="text"
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
