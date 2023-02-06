import React, { useState } from "react";

const Test = (props) => {
    return (
        <div className="test">
            <button onClick={() => props.setVal(props.val + 1)}>클릭</button>
        </div>
    );
};

export default Test;
