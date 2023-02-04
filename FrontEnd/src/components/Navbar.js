import React from "react";
import "../styles/Navbar.css";

const Navbar = (props) => {
    return (
        <div className="navbar">
            <div className="logo">로고자리</div>
            <div className="link">링크자리</div>
            <div className="user">회원기능자리</div>
        </div>
    );
};

export default Navbar;
