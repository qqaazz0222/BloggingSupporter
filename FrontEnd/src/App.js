import "./App.css";
import Navbar from "./components/Navbar";
import Generator from "./components/Generator";
import Dragndrop from "./components/Dragndrop";

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <div className="func">
                    <Generator />
                    <Dragndrop />
                </div>
                <div className="result">
                    <div className="container">
                        <div className="card">
                            <h1>결과 출력 창</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
