import React, { useState } from "react";

function Msgtest() {
    const [msg, setMsg] = useState({
        msg: "",
    });
    const [returnedmsg, setReturnedmsg] = useState({
        msg: "아직 서버로 부터 받은 메시지가 없습니다.",
        state: "empty_msg",
    });

    function submitmsg(e) {
        e.preventDefault();
        fetch("http://localhost:3001/sendmsg", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                msg: msg.msg,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                setReturnedmsg(response);
                setMsg({ msg: "" });
            })
            .catch((err) => {
                setReturnedmsg({
                    msg: "서버와 통신할 수 없습니다.",
                    state: "error",
                });
            });
    }

    function handlemsg(e) {
        const newdata = { ...msg };
        newdata[e.target.id] = e.target.value;
        setMsg(newdata);
    }
    return (
        <div className="msgtest">
            <h1>메시지 테스트 컴포넌트</h1>
            <p>서버에 메세지 보내기</p>
            <form onSubmit={(e) => submitmsg(e)}>
                <input
                    onChange={(e) => handlemsg(e)}
                    id="msg"
                    value={msg.msg}
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
