import React, { useState } from "react";

function Input() {
    const [data, setData] = useState({
        msg: "",
    });
    const [returnedmsg, setReturnedmsg] = useState({
        msg: "",
        state: "",
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
            });
    }

    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }
    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input
                    onChange={(e) => handle(e)}
                    id="msg"
                    value={data.msg}
                    type="text"
                    placeholder="input msg"
                ></input>
                <button>전송</button>
            </form>
            <p>{returnedmsg.msg}</p>
            <p>{returnedmsg.state}</p>
        </div>
    );
}

export default Input;
