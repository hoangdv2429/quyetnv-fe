import React from "react";
import Header from "./../layout/header";
import Footer from "./../layout/Footer";
import Navigation from "./navigation";

const Esign = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="bg__full is-flex ju-center al-center">
        <div className="esign--wrapper is-flex ju-center al-end">
          <div className="load-pdf--wrapper is-flex-col al-center ju-center">
            <div className="load-pdf__icon">
              <i class="far fa-file-pdf"></i>
            </div>
            <div className="load-pdf__title">
              Upload your PDF to start signing!
            </div>
            <div className="load-pdf__btn">
              <div class="upload-btn-wrapper">
                <button class="btn">Load PDF</button>
                <input type="file" name="myfile" />
              </div>
            </div>
          </div>
          <div className="sign__left--wrapper is-flex-col al-center ju-center">
            <div className="sign--wrapper">
              <div className="sign__left--title">
                <p>Chữ ký chính</p>
              </div>
              <div className="sign__left--box">
                <div className="sign__box--item is-flex al-center ju-center">
                  <div className="box__upload upload-btn-wrapper">
                    <input type="file" name="myfile" />
                    <button class="box__upload--btn mr8">
                      <i class="fas fa-file-upload"></i> <span>upload</span>
                    </button>
                  </div>
                  <div className="box__draw upload-btn-wrapper">
                    <input type="file" name="myfile" />
                    <button class="box__upload--btn">
                      <i class="fas fa-pencil-alt"></i>
                      <span>draw</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sign--wrapper mt-24">
              <div className="sign__left--title">
                <p>Chữ ký chính</p>
              </div>
              <div className="sign__left--box">
                <div className="sign__box--item is-flex al-center ju-center">
                  <div className="box__upload upload-btn-wrapper">
                    <input type="file" name="myfile" />
                    <button class="box__upload--btn mr8">
                      <i class="fas fa-file-upload"></i> <span>upload</span>
                    </button>
                  </div>
                  <div className="box__draw upload-btn-wrapper">
                    <input type="file" name="myfile" />
                    <button class="box__upload--btn">
                      <i class="fas fa-pencil-alt"></i>
                      <span>draw</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Esign;
