import React from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <>
      <Header />
      <div className="is-flex-col al-center ju-center">
        <div className="w30">
          <div className="auth__form">
            <div className="auth__header is-flex-col al-center ju-center">
              <div className="auth__header--icon is-flex al-center ju-center ">
                <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="LockOutlinedIcon"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                </svg>
              </div>
              <div className="auth__header--label">
                <p>Đăng kí</p>
              </div>
            </div>
            <div className="auth__body is-flex-col">
              <div class="input-effect">
                <input
                  class="effect effect__email"
                  type="text"
                  placeholder=""
                  autoFocus
                />
                <label>Email*</label>
                <span class="focus-border">
                  <i></i>
                </span>
              </div>
              <div class="input-effect">
                <input class="effect effect__pw" type="text" placeholder="" />
                <label>Mật khẩu*</label>
                <span class="focus-border">
                  <i></i>
                </span>
              </div>
              <div class="input-effect">
                <input
                  class="effect effect__pw--again"
                  type="text"
                  placeholder=""
                />
                <label>Nhập lại mật khẩu*</label>
                <span class="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>
          <div className="auth__box is-flex al-center ju-center">
            <p>Đăng kí</p>
          </div>
          <div className="auth__redirect is-flex al-center ju-right">
            <Link to="/login" className="auth__redirect--link">Bạn có tài khoản rồi? Đăng nhập</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
