import React from "react";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <div className="navigation__wraper is-flex al-center ju-center">
        <Link to="" className="navigation__item navigation__main">Trang chủ</Link>
        <Link to="" className="navigation__item navigation__teach">Giảng dạy</Link>
        <Link to="" className="navigation__item navigation__pointer">Nhập điểm</Link>
        <Link to="" className="navigation__item navigation__item--active navigation__sign">Sign document</Link>
        <Link to="" className="navigation__item navigation__verify">Verify document</Link>
      </div>
    </>
  );
};

export default Navigation;
