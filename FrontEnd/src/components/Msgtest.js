import React, { useState } from "react";

function Msgtest() {
    const [data, setData] = useState({
        msg: "",
    });
    const [returnedmsg, setReturnedmsg] = useState({
        msg: "아직 서버로 부터 받은 메시지가 없습니다.",
        state: "empty_msg",
    });

    function submit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:5000/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                msg: data.msg,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setReturnedmsg(response);
                setData({ msg: "" });
            });
    }

    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }
    return (
        <div className="msgtest">
            <h1>메시지 테스트 컴포넌트</h1>
            <p>서버에 메세지 보내기</p>
            <form onSubmit={(e) => submit(e)}>
                <input
                    onChange={(e) => handle(e)}
                    id="msg"
                    value={data.msg}
                    type="text"
                    placeholder="서버로 전송할 메시지를 입력하세요..."
                ></input>
                <button>전송</button>
            </form>
            <p>서버 응답 메세지</p>
            <div className="return">
                <p>{returnedmsg.msg}</p>
                <p>{returnedmsg.state}</p>
            </div>
        </div>
    );
}

export default Msgtest;
