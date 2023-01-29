import React, { useState } from "react";
import axios from "axios";
import Return from "./Return";
import Loading from "./Loading";

function Generator() {
    const [img, setImg] = useState(null);
    const [returnedMsg, setReturnedMsg] = useState({
        msg: "아직 서버로부터 받은 키워드가 없습니다.",
        state: "empty_keyword",
        recommend: [],
    });
    const [visible, setVisible] = useState({
        loading: false,
        return: false,
    });

    function uploadImg(e) {
        e.preventDefault();
        setVisible({
            loading: true,
            return: false,
        });
        const formData = new FormData();
        formData.append("image", img);
        formData.append("filename", img.name);
        axios.post("http://localhost:3001/sendimg", formData).then((res) => {
            console.log(res);
            setReturnedMsg(res.data);
            setVisible({
                loading: false,
                return: true,
            });
        });
    }

    return (
        <div className="generator">
            <h1>Blogging Supporter</h1>
            <p>이미지 업로드</p>
            <form onSubmit={(e) => uploadImg(e)}>
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
            {visible.return && <p>추천 문장</p>}
            {visible.return && <Return returnedMsg={returnedMsg} />}
            {visible.loading && <Loading />}
        </div>
    );
}

export default Generator;
