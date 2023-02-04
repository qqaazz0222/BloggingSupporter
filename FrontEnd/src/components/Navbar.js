import React from "react";
import "../styles/Navbar.css";

const Navbar = (props) => {
    return (
        <div className="navbar">
            <div className="list">
                <div className="logo">Blogging Supporter</div>
                <div className="link">링크자리</div>
                <div className="user">
                    <button className="btn">로그인</button>
                    <button className="btn">회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
