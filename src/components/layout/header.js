import React from "react";

const Header = () => {
  return (
    <>
      <div className="header--wrapper is-flex al-center bg-primary cl-white">
        <div className="header__img--wrapper ml-170">
          <img
            className="header__img"
            src="/images/header/hust-logo.jpeg"
            alt=""
          />
        </div>
        <div className="header__title--wrapper">
          <p className="header__title">HỆ THỐNG QUẢN TRỊ ĐẠI HỌC TRỰC TUYẾN</p>
          <p className="header__title">
            TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI - VIỆN CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN
            THÔNG
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
