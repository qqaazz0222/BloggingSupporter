import React, { useState } from "react";
import axios from "axios";

function Generator() {
    const [img, setImg] = useState(null);
    const [returnedMsg, setReturnedMsg] = useState({
        msg: "아직 서버로부터 받은 키워드가 없습니다.",
        state: "empty_keyword",
        recommend: [],
    });

    function submitimg(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", img);
        formData.append("filename", img.name);
        axios.post("http://localhost:3001/sendimg", formData).then((res) => {
            console.log(res);
            setReturnedMsg(res.data);
        });
    }

    return (
        <div className="imgtest">
            <h1>문장 생성기</h1>
            <p>이미지 업로드</p>
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
            <p>추천 문장</p>
            <div className="return">
                <p className="recommend">{returnedMsg.recommend}</p>
                {/* <p className="recommend">{returnedMsg.recommend[0]}</p>
                <p className="recommend">{returnedMsg.recommend[1]}</p>
                <p className="recommend">{returnedMsg.recommend[2]}</p>
                <p className="recommend">{returnedMsg.recommend[3]}</p>
                <p className="recommend">{returnedMsg.recommend[4]}</p> */}
                <p className="keyword">{returnedMsg.msg}</p>
            </div>
        </div>
    );
}

export default Generator;
