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
                        <h1>123123</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
