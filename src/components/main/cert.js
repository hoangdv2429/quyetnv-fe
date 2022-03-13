import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatClassification, formatStudyMode, removeAccents } from '../helper/format';
import { getPublicCert, getIssuer, getVerifyData } from '../helper/api';

const Cert = (props) => {
  console.log(props);
  return (
    <div id={props.id}>
      <div class="certificat-wrapper certificat-wrapper--front h-100">
        <div class="global">
          <div class="left">
            <div class="republic">SOCIALIST REPUBLIC OF VIETNAM</div>
            <div class="president bold">
              <div>THE PRESIDENT OF</div> <div>HA NOI UNIVERSITY OF SCIENT AND TECHNOLOGY</div>
            </div>
            <div class="confer">has conferred</div>
            <div class="degree bold">THE TOEIC CERTIFICATE</div>
            <div class="list">
              <div class="line">
                <div class="labels">Upon:</div>
                <div class="name">
                  <span>Ms</span> {removeAccents(props.data.name)}
                </div>
              </div>
              <div class="line">
                <div class="labels">Date of birth:</div>
                <div class="details">{props.data.dob}</div>
              </div>
              <div class="line">
                <div class="labels">Identify Number:</div>
                <div class="details">{props.data.identifyNumber}</div>
              </div>
              <div class="line">
                <div class="labels">Test Date:</div>
                <div class="details">{props.data.testDate}</div>
              </div>
              <div class="line">
                <div class="labels">Valid Date:</div>
                <div class="details">{props.data.validDate}</div>
              </div>
              <div class="line">
                <div class="labels">Listening Score:</div>
                <div class="details">{props.data.listening}</div>
              </div>
              <div class="line">
                <div class="labels">Reading Score:</div>
                <div class="details">{props.data.reading}</div>
              </div>
              <div class="line">
                <div class="labels">Total Score:</div>
                <div class="details">{props.data.totalScore}</div>
              </div>
            </div>
            <div class="date-town">Ha Noi City, 19 March 2020</div>
            <div class="reg">Reg. No: DTH/1B0214/2020</div>
          </div>
          <div class="right">
            <div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="logo">
              <a href="" title="Université Hoa Sen"></a>
              {/* <img
                src="https://haitrieu.com/wp-content/uploads/2021/10/DH-Hoa-Sen-Main-Icon.png"
                alt="Université Hoa Sen"
              /> */}
            </div>
            <div class="president bold">
              <div>HIỆU TRƯỞNG</div> <div>TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI</div>
            </div>
            <div class="confer">cấp</div>
            <div class="degree bold">CHỨNG CHỈ TOEIC</div>
            <div class="list">
              <div class="line">
                <div class="labels">Cho:</div>
                <div class="name">
                  <span>Bà</span> {props.data.name}
                </div>
              </div>
              <div class="line">
                <div class="labels">Ngày sinh:</div>
                <div class="details">{props.data.dob}</div>
              </div>
              <div class="line">
                <div class="labels">Căn cước công dân:</div>
                <div class="details">{props.data.identifyNumber}</div>
              </div>
              <div class="line">
                <div class="labels">Ngày thi:</div>
                <div class="details">{props.data.testDate}</div>
              </div>
              <div class="line">
                <div class="labels">Ngày hết hạn:</div>
                <div class="details">{props.data.validDate}</div>
              </div>
              <div class="line">
                <div class="labels">Điểm nghe:</div>
                <div class="details">{props.data.listening}</div>
              </div>
              <div class="line">
                <div class="labels">Điểm đọc:</div>
                <div class="details">{props.data.reading}</div>
              </div>
              <div class="line">
                <div class="labels">Tổng điểm:</div>
                <div class="details">{props.data.totalScore}</div>
              </div>
            </div>
            <div class="date-town">
              TP. Hồ Chí Minh, ngày 19 tháng 03 năm 2020
              {/* <img
                src="https://certificate.bcdiploma.com/pub/images/sign-3.e7bffdf.svg"
                class="small-sign"
              /> */}
            </div>
            {/* <div class="stamp">
              <div class="top">HIỆU TRƯỞNG</div>
              <img
                src="https://certificate.bcdiploma.com/pub/images/stamp1.089da04.svg"
                alt="stamp Hoa Sen"
                class="stamp-img1"
              />
              <div class="president bold">GS.TS. Mai Hồng Quỳ</div>
            </div> */}
            <div class="reg">
              <div class="line1">
                Số hiệu: <span>DTH/1B012806</span>
              </div>
              <div class="line2">
                Số vào sổ cấp bằng: <span>DTH/1B0214/2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cert;
