import React from "react";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <div className="navigation__wraper is-flex al-center ju-center">
        <Link to="" className="navigation__item navigation__main">Trang chủ</Link>
        <Link to="checkList" className="navigation__item navigation__teach">Ký tài liệu</Link>
        <Link to="list" className="navigation__item navigation__pointer">Danh sách sinh viên</Link>
        <Link to="esign" className="navigation__item navigation__item--active navigation__sign">Tải tài liệu</Link>
        {/* <Link to="" className="navigation__item navigation__verify">Verify document</Link> */}
      </div>
    </>
  );
};

export default Navigation;
