import React, { useState } from "react";
import Lottie from "lottie-react";
import loadingLottie from "../assets/lottie/loading.json";
import "../styles/Loading.css";

const Loading = (props) => {
    return (
        <div className="loading">
            <Lottie className="lottie" animationData={loadingLottie} />
        </div>
    );
};

export default Loading;
