import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Generator from "./components/Generator";
import Dragndrop from "./components/Dragndrop";
import Return from "./components/Return";
import Loading from "./components/Loading";

function App() {
    const server_url = "http://127.0.0.1:3001";
    // const server_url = "http://13.209.185.52:52518";
    const [isLoading, setLoading] = useState(false);
    const [returnedMsg, setReturnedMsg] = useState({
        msg: "아직 서버로부터 받은 추천 문장이 없습니다.",
        state: "empty_response",
        recommend: [],
    });
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <div className="func">
                    <Generator
                        server_url={server_url}
                        isLoading={isLoading}
                        setLoading={setLoading}
                        setReturnedMsg={setReturnedMsg}
                    />
                    <Dragndrop server_url={server_url} />
                </div>
                <div className="result">
                    <div className="container">
                        <div className="card">
                            <Return returnedMsg={returnedMsg} />
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
        </div>
    );
}

export default App;
