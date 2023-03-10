import React from "react";
import "../styles/Return.css";

const Return = (props) => {
    return (
        <div className="return">
            <p className="recommend">{props.returnedMsg.recommend}</p>
            <p className="keyword">{props.returnedMsg.msg}</p>
        </div>
    );
};

export default Return;
